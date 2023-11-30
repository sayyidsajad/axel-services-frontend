import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { UsersService } from 'src/app/services/users/users.service';
import { serviceData } from '../homepage/types/user.types';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared/shared.service';
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
  sharedData: any;
  searchValue: string = '';
  currentPage: number = 1;
  constructor(private _userServices: UsersService, private router: Router, private _sharedDataService: SharedService) { }
  services!: Array<serviceData>;
  categories!: Array<any>
  categorySelected!: string
  totalPage!: number
  private subscribe: Subscription = new Subscription()
  filteredServices: Array<serviceData> = [];
  ngOnInit(): void {
    this.categoriesList()
    this.sharedData = this._sharedDataService.getSharedData()
    if (this.sharedData) {
      this.services = this.sharedData.findSearched
    } else {
      this.servicesList();
    }
  }

  servicesList() {
    const query: any = {}
    if(this.categorySelected) query.category = this.categorySelected
    console.log(query, 'in serviceslist');
    
    this.subscribe.add(
      this._userServices.servicerList(this.currentPage, query).subscribe({
        next:
          (res: any) => {
            this.services = res.servicesFind.serviceList;
            this.totalPage = res.servicesFind.totalPage
          }
      }))
  }
  categoriesList(){
    this.subscribe.add(
      this._userServices.categoriesList().subscribe((res: any) => {
        this.categories = res.categories
      })
    )
  }
  onCategoryChange(event: any): void {
    this.categorySelected = event.value;
    const query: any = {}
    if(this.categorySelected) query.category = this.categorySelected
    this.subscribe.add(
      this._userServices.servicerList(this.currentPage, query).subscribe({
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
    const query: any = {}
    if(this.categorySelected) query.category = this.categorySelected
    this.subscribe.add(
      this._userServices.servicerList(page, query).subscribe((res: any) => {
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
    this._sharedDataService.clearData()
    this.subscribe.unsubscribe()
  }
}
