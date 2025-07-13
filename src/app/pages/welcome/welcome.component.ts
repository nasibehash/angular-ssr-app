import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ApiService} from '../../core/services/api.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './welcome.component.html',
})
export class WelcomeComponent {
  name = '';
  greeting = '';

apiService =inject(ApiService);

  submit() {
    console.log('Hello World!');
    const request = this.apiService.getWelcome(this.name) as Observable<{ message: string }>;
    if (request) {
      request.subscribe((res) => {
        console.log('res', res);
        this.greeting = res.message;
      });
    }
  }
}
