import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { Course } from 'src/app/models/course';
import { SearchRequest } from 'src/app/models/search-request';
import { CourseService } from 'src/app/services/course.service';

export const categories: any = [
  {
    label: 'Programming',
    value: 'PROGRAMMING'
  },
  {
    label: 'Development',
    value: 'DEVELOPMENT'
  },
  {
    label: 'Testing',
    value: 'TESTING'
  },
  {
    label: 'Cloud computing',
    value: 'CLOUD_COMPUTING'
  },
  {
    label: 'Data science',
    value: 'DATA_SCIENCE'
  },
  {
    label: 'Cyber security',
    value: 'CYBER_SECURITY'
  },
  {
    label: 'DevOps',
    value: 'DEVOPS'
  },
  {
    label: 'Agile',
    value: 'AGILE'
  },
  {
    label: 'Software tools',
    value: 'SOFTWARE_TOOLS'
  }
]

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  courses: Course[]

  totalRecords: number;

  loading: boolean;

  clonedCourses: { [s: string]: Course; } = {};
  courses2: Course[];

  categoriesDropdown = categories;

  course: Course;
  submitted: boolean;
  courseDialog: boolean;

  // edit course
  courseToEdit: Course;
  editCourse: boolean


  

  constructor(private courseService: CourseService, private messageService: MessageService) { }

  ngOnInit(  ): void {
    let searchRequest: SearchRequest = {
      criteria: {
        sortBy:"ORIGINAL_PRICE",
        sortDirection: "ASC",
        searchString: ""
      },
      pageNumber: 1,
      pageSize: 9
    }
    this.loadTableData(searchRequest)
  }

  loadTableData(searchRequest:SearchRequest) {
    this.courses = []
    this.courses2 = []
    this.loading = true;
    this.courseService.searchCourse(searchRequest)
    .pipe(
      finalize(() => this.loading = false)
    )
    .subscribe(
      {
        next: (res) => {
          this.courses = res.records;
          this.courses2 = res.records;
          this.totalRecords = res.totalRecordCount
        }
      }
    )
  }


  refreshData(event: LazyLoadEvent) {
    let searchRequest: SearchRequest = {
      criteria: {
        sortBy:"ORIGINAL_PRICE",
        sortDirection: event.sortOrder === -1 ? "DESC" : "ASC",
        searchString:  ""
      },
      pageNumber: event.first === 0 ? 1 : ( (event.first ? event.first : 0) - (event.rows ? event.rows : 0) )+2,
      pageSize: event.rows ? event.rows -1 : 10
    }
    this.loadTableData(searchRequest);
  }

  
  editCourseDetails() {
    this.courseService.modifyCourse(this.courseToEdit)
    .subscribe({
      next: (res) => {
        this.messageService.add({severity:'success', summary: 'Success', detail:'Course is updated'});        
      },
      complete:() => {
        let searchRequest: SearchRequest = {
          criteria: {
            sortBy:"ORIGINAL_PRICE",
            sortDirection: "ASC",
            searchString:  ""
          },
          pageNumber: 1,
          pageSize: 10
        }
        this.loadTableData(searchRequest);
        this.editCourse = false;
        this.submitted = true
      }
    })

  }

  onRowEditInit(course:Course) {
    this.courseToEdit = course
    this.courseToEdit.nextBatchDate = new Date(course.nextBatchDate)
    this.editCourse = true
  }

  openNew() {
    this.course = new Course({});
    this.submitted = false;
    this.courseDialog = true;
  }

  hideDialog() {
    this.courseDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;
    this.courseService.addCourse(this.course).subscribe({
      next: () => {
        this.messageService.add({severity:'success', summary: 'Success', detail:'Course is added'})
      },
      error: () => {
        this.messageService.add({severity:'error', summary: 'Error', detail:'Could not add course'})
      },
      complete: () => {
        let searchRequest: SearchRequest = {
          criteria: {
            sortBy:"ORIGINAL_PRICE",
            sortDirection: "ASC",
            searchString: ""
          },
          pageNumber: 1,
          pageSize: 9
        }
        this.loadTableData(searchRequest)
        this.courseDialog = false
      }
    })
  }

  hideEditDialog() {
    this.editCourse = false
    this.submitted = false
  }


}
