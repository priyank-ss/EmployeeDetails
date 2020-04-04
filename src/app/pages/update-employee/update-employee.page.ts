import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, Platform } from '@ionic/angular';
import { UtilityService } from '../../services/utility.service';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { constants } from '../../constants';
declare var cordova: any;
@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.page.html',
  styleUrls: ['./update-employee.page.scss'],
})
export class UpdateEmployeePage {
  lastImage: string = null;
  public editedEmpList = {};
  public updatedProfileImg: any = '';
  constructor(private router: Router, public utilityService: UtilityService,
              private camera: Camera,
              private file: File,
              private filePath: FilePath,
              public actionSheetCtrl: ActionSheetController,
              public platform: Platform) {
    this.editedEmpList = this.router.getCurrentNavigation().extras;
    this.updatedProfileImg = this.editedEmpList['profile_image'];
  }

  updateEmployeeDetails(editedEmpList, updatedProfileImg){
    const retrievedEmployeeObject = JSON.parse(localStorage.getItem('employeeDetails'));
    const filterEmployeeObject = retrievedEmployeeObject.find(element => element.id === editedEmpList.id);
    filterEmployeeObject.employee_name = editedEmpList.employee_name;
    filterEmployeeObject.employee_salary = editedEmpList.employee_salary;
    filterEmployeeObject.employee_age = editedEmpList.employee_age;
    filterEmployeeObject.profile_image = updatedProfileImg;
    localStorage.setItem('employeeDetails', JSON.stringify(retrievedEmployeeObject));
    this.router.navigate(['home']);
    this.utilityService.showToastMessage(constants.EMPLOYEE_UPDATED)
  }
  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    const options = {
      quality: 100,
      sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      this.updatedProfileImg = (window as any).Ionic.WebView.convertFileSrc(imagePath);
      this.utilityService.showToastMessage(constants.IMAGE_UPLOAD_MESSAGE);
    }, (err) => {
      this.utilityService.showToastMessage(constants.IMAGE_UPLOAD_ERROR);
    });
  }

  // Get the image from library or camera
  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: constants.SELECT_IMAGE_SOURCE,
      buttons: [
        {
          text: constants.LOAD_SOURCE_LIBRARY,
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: constants.LOAD_SOURCE_CAMERA,
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: constants.CANCEL_BUTTON,
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }
}
