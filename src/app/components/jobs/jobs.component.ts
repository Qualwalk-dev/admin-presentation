import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Job } from 'src/app/models/jobs';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  jobToSubmit: Job;
  submitted: boolean;
  createJobDialog: boolean;

  jobs: Job[] = []

  constructor(
    private jobService: JobService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.refreshJobs()
  }

  openNewJob(){
    this.jobToSubmit = new Job({})
    this.submitted = false;
    this.createJobDialog = true;
  }

  hideCreateJobDialog() {
    this.createJobDialog = false;
    this.submitted = false;
  }

  refreshJobs() {
    this.jobService.getAllJobs().subscribe({
      next: res => {
        this.jobs = res.data
      },
      error: () => {
        this.messageService.add({severity:'error', summary: 'Error', detail:'Unable to fetch jobs'})
      }
    })
  }

  saveJob() {
    
    this.jobService.createJob(this.jobToSubmit).subscribe({
      next: () => {
        this.messageService.add({severity:'success', summary: 'Success', detail:'Job created'})
        this.refreshJobs()
      },
      error:() =>{
        this.messageService.add({severity:'error', summary: 'Error', detail:'Unable to create Job'})
      },
      complete: () => {
        this.jobToSubmit = new Job({})
        this.submitted = true
        this.createJobDialog = false
      }
    })

  }

  deleteJob(event: Event, job:Job) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.jobService.deleteJob(job.id).subscribe({
            next:() => {
              this.messageService.add({severity:'success', summary:'Success', detail:'You have deleted job'});
              this.refreshJobs()
            }, 
            error:() => {
              this.messageService.add({severity:'error', summary:'Error', detail:'Unable to delete job'});
            }
          })
          
      }
  })
}
}
