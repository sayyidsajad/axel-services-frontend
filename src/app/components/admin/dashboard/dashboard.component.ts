import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin/admin.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  private subscribe: Subscription = new Subscription()
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  private breakpointObserver = inject(BreakpointObserver);
  basicData!: {};
  basicOptions!: {};
  data!: {};
  options!: {};
  currentYearEarning!: number;
  currentMonthEarning!: number;
  constructor(private _adminServices: AdminService) { }
  ngOnInit() {
    this.subscribe.add(
      this._adminServices.dashboardReports().subscribe({
        next: (res) => {
          this.currentMonthEarning = res.currentMonthEarnings[0].profitValue
          this.currentYearEarning = res.currentYearEarning[0].profitValue
          const documentStyle = getComputedStyle(document.documentElement);
          const textColor = documentStyle.getPropertyValue('--text-color');
          this.data = {
            labels: ['Pending', 'Cancelled', 'Service Completed'],
            datasets: [
              {
                data: [res.approvalStatus.pending, res.approvalStatus.cancelled, res.approvalStatus.serviceCompleted],
                backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
              }
            ]
          };
          this.options = {
            cutout: '50%',
            plugins: {
              legend: {
                labels: {
                  color: textColor
                }
              }
            }
          };
        }
      }))
  }
  cardsTwo = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: "Sales", cols: 1, rows: 1 },
        ];
      }
      return [
        { title: "Sales", cols: 1, rows: 1 },
      ];
    })
  );
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Recent Services', cols: 2, rows: ELEMENT_DATA.length },
        ];
      }
      return [
        { title: 'Recent Services', cols: 2, rows: ELEMENT_DATA.length },
      ];
    })
  );

}
