import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ServicerService } from 'src/app/services/servicers/servicer.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})

export class ReviewsComponent {
  private subscribe: Subscription = new Subscription()

  displayedColumns: string[] = ['name','email','phone', 'review', 'date'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  reviews:any

  constructor(private _servicerServices: ServicerService) {
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit(): void {
    this.listReviews()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  listReviews(){
    this.subscribe.add(this._servicerServices.listReviews().subscribe({
      next: (res) => {
        this.dataSource.data = res.reviews                
      }
    }))
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
