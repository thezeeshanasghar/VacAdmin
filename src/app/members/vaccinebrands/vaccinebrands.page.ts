import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { vaccineBrandsService } from "src/app/services/vaccinebrands.service";

@Component({
  selector: "app-vaccinebrands",
  templateUrl: "./vaccinebrands.page.html",
  styleUrls: ["./vaccinebrands.page.scss"],
})
export class VaccineBrandsPage implements OnInit {
  data: any[] = [];
  constructor(

    public loadingController: LoadingController,
    private vaccinebrandsAPI: vaccineBrandsService
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
}
