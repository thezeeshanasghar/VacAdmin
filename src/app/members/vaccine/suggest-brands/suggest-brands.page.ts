import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { forkJoin, of } from 'rxjs';

import { BrandService } from 'src/app/services/brand.service';
import { VaccineService } from 'src/app/services/vaccine.service';
import { vaccineBrandsService } from 'src/app/services/vaccinebrands.service';
import { ToastService } from 'src/app/shared/toast.service';

interface BrandItem {
  Id: number;
  Name: string;
  Selected: boolean;
}

@Component({
  selector: 'app-suggest-brands',
  templateUrl: './suggest-brands.page.html',
  styleUrls: ['./suggest-brands.page.scss']
})
export class SuggestBrandsPage implements OnInit {
  vaccineId: number;
  vaccineName: string = '';
  brands: BrandItem[] = [];
  private associationByBrandId: { [brandId: number]: number } = {};

  constructor(
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private brandService: BrandService,
    private vaccineService: VaccineService,
    private vaccineBrandsService: vaccineBrandsService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.vaccineId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.vaccineId || isNaN(this.vaccineId)) {
      this.toastService.create('Invalid vaccine id', 'danger');
      return;
    }

    this.loadData();
  }

  async loadData() {
    const loading = await this.loadingController.create({
      message: 'Loading suggested brands...'
    });
    await loading.present();

    forkJoin({
      brandsRes: this.brandService.getBrands(),
      mappingsRes: this.vaccineBrandsService.getVaccineBrands(),
      vaccineRes: this.vaccineService.getVaccineById(this.vaccineId.toString())
    }).subscribe(
      ({ brandsRes, mappingsRes, vaccineRes }) => {
        const allBrands = brandsRes && brandsRes.ResponseData ? brandsRes.ResponseData : [];
        const mappings = Array.isArray(mappingsRes) ? mappingsRes : [];
        const currentMappings = mappings.filter((x) => Number(x.VaccineId) === this.vaccineId);

        this.associationByBrandId = {};
        currentMappings.forEach((x) => {
          this.associationByBrandId[Number(x.BrandId)] = Number(x.Id);
        });

        this.vaccineName = vaccineRes && vaccineRes.ResponseData ? vaccineRes.ResponseData.Name : '';

        this.brands = [...allBrands]
          .sort((a, b) => ((a && a.Name) || '').localeCompare((b && b.Name) || ''))
          .map((brand) => ({
            Id: Number(brand.Id),
            Name: brand.Name,
            Selected: !!this.associationByBrandId[Number(brand.Id)]
          }));

        loading.dismiss();
      },
      (err) => {
        console.log(err);
        this.toastService.create('Failed to load suggested brands', 'danger');
        loading.dismiss();
      }
    );
  }

  async submit() {
    const selectedBrandIds = new Set(
      this.brands.filter((x) => x.Selected).map((x) => Number(x.Id))
    );

    const existingBrandIds = new Set(
      Object.keys(this.associationByBrandId).map((x) => Number(x))
    );

    const toAdd = [...selectedBrandIds].filter((id) => !existingBrandIds.has(id));
    const toRemoveAssociationIds = [...existingBrandIds]
      .filter((id) => !selectedBrandIds.has(id))
      .map((brandId) => this.associationByBrandId[brandId]);

    if (toAdd.length === 0 && toRemoveAssociationIds.length === 0) {
      this.toastService.create('No changes to save', 'warning');
      return;
    }

    const requests = [
      ...toAdd.map((brandId) => this.vaccineBrandsService.addVaccineBrands({ VaccineId: this.vaccineId, BrandId: brandId })),
      ...toRemoveAssociationIds.map((associationId) => this.vaccineBrandsService.deleteVaccineBrand(Number(associationId)))
    ];

    const loading = await this.loadingController.create({
      message: 'Saving suggested brands...'
    });
    await loading.present();

    forkJoin(requests.length ? requests : [of(null)]).subscribe(
      () => {
        this.toastService.create('Suggested brands updated successfully', 'success');
        this.loadData();
        loading.dismiss();
      },
      (err) => {
        console.log(err);
        this.toastService.create('Failed to update suggested brands', 'danger');
        loading.dismiss();
      }
    );
  }
}
