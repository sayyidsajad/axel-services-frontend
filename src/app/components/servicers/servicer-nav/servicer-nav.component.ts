import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicer-nav',
  templateUrl: './servicer-nav.component.html',
  styleUrls: ['./servicer-nav.component.css']
})
export class ServicerNavComponent {
  private breakpointObserver = inject(BreakpointObserver);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(private _router: Router) { }

  logOut() {
    localStorage.removeItem(environment.servicerSecret)
    this._router.navigate(['servicer'])
  }

}
