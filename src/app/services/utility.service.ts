import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(public alertController: AlertController,
              public loadingController: LoadingController,
              public toastController: ToastController) { }

  async showToastMessage(toastMessage: string) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 2000
    });
    toast.present();
  }

  async showLoading(loadingMessage: string) {
    const loading = await this.loadingController.create({
      message: loadingMessage,
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async showAlertConfirm(alertMessage: string): Promise<any> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Confirm',
        message: alertMessage,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (cancel) => {
              resolve('false');
            }
          }, {
            text: 'OK',
            handler: (ok) => {
              resolve('true');
            }
          }
        ]
      });
      alert.present();
    });
  }
}
