import { Component, OnInit } from '@angular/core';
import { GetEmployeeListsService } from '../services/get-employee-lists.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UtilityService } from '../services/utility.service';
import { constants } from '../constants';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public employeeArray: Observable<any>;
  constructor(private GetEmployeeService: GetEmployeeListsService,
              private router: Router,
              public utilityService: UtilityService) { }

  ngOnInit() {
    this.utilityService.showLoading(constants.LOADING_EMPLOYEE_MESSAGE);
    localStorage.getItem('employeeDetails') === null ? this.getEmployees() : localStorage.getItem('employeeDetails');
  }

  ionViewDidEnter() {
    const employeeData = JSON.parse(localStorage.getItem('employeeDetails'));
    if (employeeData != null) {
      this.employeeArray = employeeData.reverse();
    }
  }

  // Get employee details from API
  getEmployees() {
    this.GetEmployeeService.getEmployees().subscribe(res => {
      if (res.status === 'success') {
        const apiData = res.data;
        this.saveDataLocally(apiData);
        this.utilityService.showLoading(constants.LOADING_EMPLOYEE_MESSAGE);
      }
    }, err => {
      console.log(err);
    });
  }

  // Save data locally
  saveDataLocally(apiData) {
    localStorage.setItem('employeeDetails', JSON.stringify(apiData));
    this.employeeArray = apiData.reverse();
  }

  // addEmployee(slidingItem: any) {
  //   slidingItem.close();
  //   this.router.navigate(['add-employee']);
  // }

  // Update the employee
  updateEmployee(selectedItem, slidingItem) {
    console.log(selectedItem);
    slidingItem.close();
    const selectedItems = { ...selectedItem };
    this.router.navigate(['update-employee'], selectedItems);
  }

  // Delete the employee
  deleteEmployee(id: number, slidingItem: any) {
    this.utilityService.showAlertConfirm(constants.DELETE_MESSAGE).then((alertStatus) => {
      if (alertStatus === 'true') {
        const retrievedEmployeeObject = JSON.parse(localStorage.getItem('employeeDetails'));
        const removeIndex = retrievedEmployeeObject.map((item) => item.id).indexOf(id);
        retrievedEmployeeObject.splice(removeIndex, 1);
        localStorage.setItem('employeeDetails', JSON.stringify(retrievedEmployeeObject));
        this.employeeArray = JSON.parse(localStorage.getItem('employeeDetails')).reverse();
        this.utilityService.showToastMessage(constants.EMPLOYEE_DELETED);
      }
    });
    slidingItem.close();
  }
}
