import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Combo } from 'src/app/models/combo-entity';
import { Course } from 'src/app/models/course';
import { SearchRequest } from 'src/app/models/search-request';
import { ComboService } from 'src/app/services/combo.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-combos',
  templateUrl: './combos.component.html',
  styleUrls: ['./combos.component.scss']
})
export class CombosComponent implements OnInit {

  combos: Combo[] = []

  courseToAdd: Course;
  comboToSubmit:Combo;
  submitted: boolean;
  courseDialog: boolean;

  comboToEdit: Combo;

  filteredCourse: Course[] =[]
  comboDialog: boolean;
  comboEditDialog: boolean;

  addingCourseTo = ''

  modifyDate: Date;


  constructor(
    private comboService:ComboService,
    private messageService: MessageService,
    private courseService:CourseService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {

    this.refreshCombos();
  }

  refreshCombos() {
    this.comboService.getAllcombos().subscribe({
      next: res => {
        this.combos = res.data
      },
      error: () => {
        this.messageService.add({severity:'error', summary: 'Error', detail:'Unable to fetch combos'})
      }
    })
  }


  openNewCourse(comboCode:string) {
    this.courseToAdd = new Course({})
    this.submitted = false;
    this.courseDialog = true;
    this.addingCourseTo = comboCode;

  }

  filterCourse(event:any) {
    let query = event.query;

    let searchRequest: SearchRequest = {
      criteria: {
        sortBy:"ORIGINAL_PRICE",
        sortDirection: "ASC",
        searchString:  query
      },
      pageNumber: 1,
      pageSize: 50
    }

    this.courseService.searchCourse(searchRequest)
    .subscribe({
      next: (res) => {
        this.filteredCourse = res.records
      },
      error:() => {
        this.messageService.add({severity:'error', summary: 'Error', detail:'Unable to fetch courses'})
      }
    })

  }

  hideCourseDialog() {
    this.courseDialog = false;
    this.submitted = false;
    this.addingCourseTo = ''
  }

  hideComboDialog() {
    this.comboDialog = false;
    this.submitted = false;
  }

  saveCombo() {
    this.comboToSubmit.nextBatchDate = this.formatDate(this.comboToSubmit.nextBatchDate);
    this.comboService.createCombo(this.comboToSubmit).subscribe({
      next: () => {
        this.messageService.add({severity:'success', summary: 'Success', detail:'Combo created'})
        this.refreshCombos()
      },
      error:() =>{
        this.messageService.add({severity:'error', summary: 'Error', detail:'Unable to create combo'})
      },
      complete: () => {
        this.comboToSubmit = new Combo({})
        this.submitted = true
        this.comboDialog = false
      }
    })

  }

  saveCourse() {
    console.log('course => ', this.courseToAdd)
    this.comboService.addCourse(this.addingCourseTo, this.courseToAdd.course).subscribe({
      next:() => {
        this.messageService.add({severity:'success', summary: 'Success', detail:'Course added'})
        this.refreshCombos()
      },
      error:() =>{
        this.messageService.add({severity:'error', summary: 'Error', detail:'Unable to add course combo'})
      },
      complete: () => {
        this.courseToAdd = new Course({})
        this.submitted = true
        this.courseDialog = false
        this.addingCourseTo =''
      }
    })

  }

  openNewPackage(){
    this.comboToSubmit = new Combo({})
    this.submitted = false;
    this.comboDialog = true;
  }

  formatDate(date: any) {
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  deleteCourse(event: Event, comboCode: string, course: string) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.comboService.deleteCourse(comboCode, course).subscribe({
            next:() => {
              this.messageService.add({severity:'success', summary:'Success', detail:'You have deleted course from combo'});
              this.refreshCombos()
            }, 
            error:() => {
              this.messageService.add({severity:'error', summary:'Error', detail:'Unable to delete course from combo'});
            }
          })
          
      }
  });

  }

  onRowEditInit(combo: Combo) {
    this.comboEditDialog = true;
    this.comboToEdit = combo
    this.submitted = false
    this.modifyDate = new Date(combo.nextBatchDate);
  }

  onRowEditSave(combo: Combo) {
    this.comboService.modifyCombo(this.comboToEdit).subscribe({
      next: () => {
        
        this.messageService.add({severity:'success', summary: 'Success', detail:'Combo modified'})
        this.refreshCombos()
      },
      error:() =>{
        this.messageService.add({severity:'error', summary: 'Error', detail:'Unable to modify combo'})
      },
      complete: () => {
        this.comboToEdit = new Combo({})
      }
    })
    
  }

  hideComboEditDialog() {
    this.comboEditDialog = false;
    this.submitted = false;
  }

  editCombo() {
    this.comboToEdit.nextBatchDate = this.formatDate(this.modifyDate);
    this.comboService.modifyCombo(this.comboToEdit).subscribe({
      next: () => {
        this.messageService.add({severity:'success', summary: 'Success', detail:'Combo modified'})
        this.refreshCombos()
      },
      error:() =>{
        this.messageService.add({severity:'error', summary: 'Error', detail:'Unable to modify combo'})
      },
      complete: () => {
        this.comboToEdit = new Combo({})
        this.submitted = true
        this.comboEditDialog = false
        this.modifyDate = null
      }
    })
  }

}
