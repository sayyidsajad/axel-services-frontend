import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-servicer-approval',
  templateUrl: './servicer-approval.component.html',
  styleUrls: ['./servicer-approval.component.css']
})
export class ServicerApprovalComponent {
  count: number = 5
  isApproved: boolean = false
  message!: string;
  id!: string

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.sendAdminApproval()
  }

  sendAdminApproval() {
    localStorage.removeItem(environment.servicerSecret)
    if (this.count !== 0) {
      setInterval(() => {
        this.count--
      }, 1000)
    }
    setTimeout(() => {
      this._router.navigate(['servicer'])
    }, 5000)
  }
}
