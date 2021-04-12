import { Component } from '@angular/core';
import { FileUploadService } from '../services/file-upload-service/file-upload.service';

@Component({
  selector: 'laz-progress-spinner-overlay',
  template:`<div class="overlay" [class.active]="isOverlayEnabled$ | async">
              <div class="loading-indicator">
                <mat-spinner style="margin:0 auto;"></mat-spinner>
              </div>
            </div>`,
  styles: [`
            .overlay {
              position: fixed;
              display: none;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: rgba(0, 0, 0, 0.5);
              z-index: 2;
              cursor: pointer;
            }

            .overlay.active {
              display: block;
            }

            .loading-indicator {
              position: fixed;
              height: 1em;
              margin: auto;
              top: 0;
              left: 0;
              bottom: 0;
              right: 0;
            }
         `],
})
export class ProgressSpinnerOverlayComponent {

  isOverlayEnabled$ = this.fileUploadService.isMessagingSending$;

  constructor(private fileUploadService: FileUploadService) {
  }

}
