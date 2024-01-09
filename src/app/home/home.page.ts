import { Component } from '@angular/core';
import { HealthCheck } from 'src/models/HealthCheck';
import { MgdRestClientProvider } from 'src/providers/mgd-rest-client/mgd-rest-client';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public restClient: MgdRestClientProvider
  ) { }

  ionViewDidEnter() {
    this.healthCheck();
  }

  healthCheck() {
    /*this.restClient.healthCheck().subscribe((data: HealthCheck) => {
      console.info(data);
    }, errorData => {
      console.error(errorData);
    }, () => {

    });*/
  }
}
