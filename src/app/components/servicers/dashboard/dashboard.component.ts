import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ServicerService } from 'src/app/services/servicers/servicer.service';

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
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  private subscribe: Subscription = new Subscription()
  monthlyEarning!: number;
  currentYearEarning!: number;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  private breakpointObserver = inject(BreakpointObserver);
  basicData: any;
  basicOptions: any;
  data: any;
  options: any
  datas: any;
  optionss: any
  constructor(private _servicerServices: ServicerService) { }
  ngOnInit() {
    this.subscribe.add(
      this._servicerServices.dashboardReports().subscribe({
        next: (res) => {
          this.monthlyEarning = res.monthlyEarning[0]?.totalEarnings ?? 0
          this.currentYearEarning = res.currentYearEarning
          const documentStyles = getComputedStyle(document.documentElement);
          const textColors = documentStyles.getPropertyValue('--text-color');
          const textColorSecondarys = documentStyles.getPropertyValue('--text-color-secondary');
          const surfaceBorders = documentStyles.getPropertyValue('--surface-border');
          this.datas = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
              {
                label: 'Sales',
                backgroundColor: documentStyles.getPropertyValue('--pink-500'),
                borderColor: documentStyles.getPropertyValue('--pink-500'),
                data: [res.salesData[0], res.salesData[1], res.salesData[2], res.salesData[3], res.salesData[4], res.salesData[5], res.salesData[6], res.salesData[7], res.salesData[8], res.salesData[9], res.salesData[10], res.salesData[11]]
              }
            ]
          };
          this.options = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
              legend: {
                labels: {
                  color: textColors
                }
              }
            },
            scales: {
              x: {
                ticks: {
                  color: textColorSecondarys,
                  font: {
                    weight: 500
                  }
                },
                grid: {
                  color: surfaceBorders,
                  drawBorder: false
                }
              },
              y: {
                ticks: {
                  color: textColorSecondarys
                },
                grid: {
                  color: surfaceBorders,
                  drawBorder: false
                }
              }
            }
          };

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

