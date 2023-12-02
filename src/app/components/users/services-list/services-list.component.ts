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
  filterOptionService!: any
  currentPage: number = 1;
  constructor(private _userServices: UsersService, private router: Router, private _sharedDataService: SharedService) { }
  services!: Array<serviceData>;
  categories!: Array<any>
  categorySelected!: string
  companySelected!: string
  priceSelected!: number
  totalPage!: number
  pagtination:boolean=false

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
    if (this.categorySelected) query.category = this.categorySelected
    this.subscribe.add(
      this._userServices.servicerList(this.currentPage, query).subscribe({
        next:
          (res: any) => {
            this.filterOptionService = res.servicesFind.serviceList.map((service: { serviceName: any; }) => service.serviceName)            
            this.services = res.servicesFind.serviceList;
            this.totalPage = res.servicesFind.totalPage
          }
      }))
  }
  categoriesList() {
    this.subscribe.add(
      this._userServices.categoriesList().subscribe((res: any) => {
        this.categories = res.categories
      })
    )
  }
  onCategoryChange(event: any,category:string,price:number): void {
    this.categorySelected = event.value;
    const query: any = {}
    if (this.categorySelected) query.category = this.categorySelected
    if (this.companySelected) query.company = this.companySelected
    if (this.priceSelected) query.price = this.priceSelected
    this.subscribe.add(
      this._userServices.servicerList(this.currentPage, query).subscribe({
        next:
          (res: any) => {
            this.services = res.servicesFind.serviceList;
            this.totalPage = res.servicesFind.totalPage
          }
      }))
  }
  onCompanyChange(events: any): void {
    this.companySelected = events.value;
    const query: any = {}
    if(this.companySelected) query.company = this.companySelected
    const event:any={
      value :this.categorySelected
    }
    this.onCategoryChange(event,this.companySelected,this.priceSelected)
  }

  onPriceChange(events: any): void {
    this.priceSelected = events.value;
    const query: any = {}
    if(this.priceSelected) query.company = this.priceSelected
    const event:any={
      value :this.categorySelected
    }
    this.onCategoryChange(event,this.companySelected,this.priceSelected)
  }


  onSearch() {
    const searchTerm = this.searchValue.toLowerCase();
    this.filteredServices = this.services.filter(service =>
      service.serviceName.toLowerCase().includes(searchTerm)
    );
    this.pagtination =true
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
    if (this.categorySelected) query.category = this.categorySelected
    this.subscribe.add(
      this._userServices.servicerList(page, query).subscribe((res: any) => {
        this.services = res.servicesFind.serviceList;
      })
    )
  }

  nextPage() {
    if (this.currentPage < this.totalPage) {
      this.currentPage++;
      this.callPag(this.currentPage)
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.callPag(this.currentPage)
    }
  }

  ngOnDestroy(): void {
    this._sharedDataService.clearData()
    this.subscribe.unsubscribe()
  }
}
