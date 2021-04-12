import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FileUploadService } from '../core/services/file-upload-service/file-upload.service';
import { LessonPlan } from './lesson-plan';

@Component({
  selector: 'laz-lesson-plan-upload',
  templateUrl: './lesson-plan-upload.component.html',
  styleUrls: ['./lesson-plan-upload.component.scss']
})
export class LessonPlanUploadComponent implements OnInit {
  lessonPlanUploadForm!: FormGroup;
  fileName = '';
  percentDone: any = 0;
  lessonPlanModel!: LessonPlan;
  durationInSeconds: number = 5;

  requiredFileType: string = 'xlsx';

  constructor(private formBuilder: FormBuilder, private fileUploadService: FileUploadService, private snackBar: MatSnackBar) {

    this.lessonPlanUploadForm = this.formBuilder.group({
      site: ['', Validators.required],
      xlsxFile: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.lessonPlanUploadForm.valid) {
      this.lessonPlanModel = this.lessonPlanUploadForm.value;
      console.log('lessonPlanModel: ', this.lessonPlanModel);
      const http = this.fileUploadService.uploadLessonPlan(this.lessonPlanModel).subscribe((event: HttpEvent<any>) => {

        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            if (event.total) {
              this.percentDone = Math.round(event.loaded / event.total * 100);
              console.log(`Uploaded! ${this.percentDone}%`);
            }
            break;
          case HttpEventType.Response:
            console.log('Lesson plan successfully uploaded!', event.body);
            this.percentDone = false;
            this.openSnackBar("success");
        }
        {
          (err: any) => {
            console.log(err);
            this.openSnackBar("fail");
          }
        }
      },
        err => {
          console.log(err);
          this.openSnackBar("fail");
        },
        () => {
          console.log('task complete');
        });

    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      this.lessonPlanUploadForm.patchValue({
        xlsxFile: file
      })

      this.lessonPlanUploadForm.get('xlsxFile')?.updateValueAndValidity();
    }
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
