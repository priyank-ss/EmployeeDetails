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
  selector: 'app-add-employee',
  templateUrl: './add-employee.page.html',
  styleUrls: ['./add-employee.page.scss'],
})
export class AddEmployeePage {
  lastImage: string = null;
  public empList = {
    id: '',
    employee_name: '',
    employee_salary: '',
    employee_age: '',
    profile_image: ''
  };
  public profileImg: any = '';
  constructor(private router: Router,
              public utilityService: UtilityService,
              private camera: Camera,
              private file: File,
              private filePath: FilePath,
              public actionSheetCtrl: ActionSheetController,
              public platform: Platform) { }

  // Add employee locally
  public addEmployee(empList) {
    const retrievedEmployeeObject = JSON.parse(localStorage.getItem('employeeDetails'));
    empList.id = retrievedEmployeeObject.length + 1;
    empList.profile_image = this.profileImg;
    retrievedEmployeeObject.push(empList);
    localStorage.setItem('employeeDetails', JSON.stringify(retrievedEmployeeObject));
    this.utilityService.showToastMessage(constants.EMPLOYEE_ADDED);
    this.router.navigate(['home']);
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
      this.profileImg = (window as any).Ionic.WebView.convertFileSrc(imagePath);
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
