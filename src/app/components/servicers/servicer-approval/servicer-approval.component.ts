import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicerService } from 'src/app/services/servicers/servicer.service';

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
  constructor(private router: Router, private servicerServices: ServicerService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.sendAdminApproval()
  }
  sendAdminApproval() {
    localStorage.removeItem('servicerSecret')
    if (this.count !== 0) {
      setInterval(() => {
        this.count--
      }, 1000)
    }
    setTimeout(() => {
      this.router.navigate(['servicer'])
    }, 5000)
  }
}
