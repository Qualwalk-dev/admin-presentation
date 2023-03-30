import { Component, OnInit } from '@angular/core';
import { JobApplicant } from 'src/app/models/job-applicant';
import { JobService } from 'src/app/services/job.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-job-applications',
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.scss']
})
export class JobApplicationsComponent implements OnInit {

  jobApplicants:JobApplicant[]

  constructor(private jobService:JobService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.refreshJobApplicants();
  }

  refreshJobApplicants() {
    this.jobService.getAllApplicants().subscribe({
      next: (res) => {
        this.jobApplicants = res.data
      },
      error: () => {
        this.messageService.add({severity:'error', summary: 'Error', detail:'Unable to fetch job applicants'})
      }
    })
  }

  deleteApplicant(jobApplicant:JobApplicant) {
    this.jobService.deleteJobApplicant(jobApplicant.id).subscribe({
      next:() => {
        this.messageService.add({severity:'success', summary:'Success', detail:'You have deleted job applicant'});
        this.refreshJobApplicants()
      }, 
      error:() => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Unable to delete job applicant'});
      }
    })
  }

}
