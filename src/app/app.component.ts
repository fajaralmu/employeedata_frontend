import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employee-data';
  
  showAlert: boolean = false;
  alertBody: string = "alert";
  alertYesCallback: Function  = () => { };
  alertNoCallback: Function  = () => { };
  confirmAlert: boolean= false;

  showInfo(msg: string): Promise<any> {
    this.alertBody = msg;
    this.showAlert = true;
    return new Promise((res, rej) => {
      this.alertYesCallback = function (e: any) {
        res(true);
        this.stopAlert();
      }
    });
  }
  stopAlert():void {
    this.showAlert = false;
    this.confirmAlert = false;
    this.alertYesCallback = () => { };
    this.alertNoCallback = () => { };
  }
  showConfirm(msg: string): Promise<any> {
    this.alertBody = msg;
    this.showAlert = true;
    this.confirmAlert = true;
    return new Promise((res, rej) => {
      this.alertYesCallback = function (e: any) {
        res(true);
        this.stopAlert();
      }
      this.alertNoCallback = function (e: any) {
        res(false);
        this.stopAlert();
      }
    });
  }

}
