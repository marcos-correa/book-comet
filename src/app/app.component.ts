import { AccountService } from './core/services/account.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})



export class AppComponent {
  title = "Bookcomet";
  logged:boolean = true;
}
