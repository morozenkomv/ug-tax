import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseObject } from '../models/api-models';
import { RevenueAuthorityService } from '../services/revenue-authority.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.page.html',
  styleUrls: ['./demo.page.scss'],
})
export class DemoPage {
  result: any;
  content: any;
  error: any;
  loading = false;

  constructor(private _revenueAuthorityService: RevenueAuthorityService) {}

  t101Command() {
    this._executeCommand(this._revenueAuthorityService.t101Command());
  }

  t102Command() {
    this._executeCommand(this._revenueAuthorityService.t102Command());
  }

  private _executeCommand(command: Observable<ResponseObject>) {
    this.loading = true;
    this.result = null;
    this.error = null;
    this.content = null;

    command.subscribe(
      (res) => {
        this.result = res;
        if (res.data.content) {
          this.content = window.atob(res.data.content);
        }
      },
      (err) => {
        this.error = err;
      },
      () => {
        this.loading = false;
      }
    );
  }
}
