import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { vaccineBrandsService } from "src/app/services/vaccinebrands.service";
import { ToastService } from "src/app/shared/toast.service";

@Component({
  selector: "app-vaccinebrands",
  templateUrl: "./vaccinebrands.page.html",
  styleUrls: ["./vaccinebrands.page.scss"],
})
export class VaccineBrandsPage implements OnInit {
  data: any[] = [];
  constructor(

    public loadingController: LoadingController,
    private vaccinebrandsAPI: vaccineBrandsService,
    private toastService: ToastService
  ) {}
  ngOnInit() {
    this.getvaccinbrands();
  }
  async getvaccinbrands() {
    const loading = await this.loadingController.create({
      message: "Loading vaccine brands... ",
    });
    await loading.present();
    await this.vaccinebrandsAPI.getVaccineBrands().subscribe(
      (res) => {
        console.log(res);
        this.data = res;
        console.log(this.data);
        loading.dismiss();
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async deleteAssociation(item: any) {
    if (!item || !item.Id) {
      return;
    }

    const loading = await this.loadingController.create({
      message: "Deleting association...",
    });
    await loading.present();

    this.vaccinebrandsAPI.deleteVaccineBrand(Number(item.Id)).subscribe(
      () => {
        this.data = (this.data || []).filter((x) => x.Id !== item.Id);
        this.toastService.create("Association deleted successfully", "success");
        loading.dismiss();
      },
      (err) => {
        console.log(err);
        this.toastService.create("Failed to delete association", "danger");
        loading.dismiss();
      }
    );
  }
}
