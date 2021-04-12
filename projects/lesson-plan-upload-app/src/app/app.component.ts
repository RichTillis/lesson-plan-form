import { Component } from '@angular/core';

@Component({
  selector: 'laz-root',
  template:`
            <router-outlet></router-outlet>
            <laz-progress-spinner-overlay></laz-progress-spinner-overlay>
            `,
  styles: []
})
export class AppComponent {
  title = 'Lesson Plan Upload App';
}
