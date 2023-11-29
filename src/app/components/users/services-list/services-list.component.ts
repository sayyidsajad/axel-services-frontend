import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { UsersService } from 'src/app/services/users/users.service';
import { serviceData } from '../homepage/types/user.types';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
export interface ChipColor {
  name: string;
  color: ThemePalette;
}
@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css'],
})
export class ServicesListComponent {
  searchValue: string = '';
  currentPage!: number;
  constructor(private userServices: UsersService, private router: Router, private _toastr: ToastrService) { }
  services!: Array<serviceData>;
  totalPage!: number
  private subscribe: Subscription = new Subscription()
  filteredServices: Array<serviceData> = [];
  ngOnInit(): void {
    this.servicesList();
  }

  servicesList() {
    this.subscribe.add(
      this.userServices.servicerList().subscribe({
        next:
          (res: any) => {
            this.services = res.servicesFind.serviceList;
            this.totalPage = res.servicesFind.totalPage
          }
      }))
  }

  onSearch() {
    const searchTerm = this.searchValue.toLowerCase();
    this.filteredServices = this.services.filter(service =>
      service.serviceName.toLowerCase().includes(searchTerm)
    );
  }
  serviceDetails(id: string) {
    this.router.navigate(['/servicerDetails', id])
  }

  pageArr() {
    const limit = 5; 
    const start = Math.max(1, this.currentPage - Math.floor(limit / 2));
    const end = Math.min(start + limit - 1, this.totalPage);
  
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }

  callPag(page: number) {
    this.currentPage = page
    this.subscribe.add(
      this.userServices.servicerList(page).subscribe((res: any) => {
        this.services = res.servicesFind.serviceList;
      })
    )
  }

  nextPage() {
    if (this.currentPage < this.totalPage) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
