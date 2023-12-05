import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { environment } from 'src/environments/environment.development';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'axelServices';
  constructor(){}
  ngOnInit(): void {
    initFlowbite();
  }

}
