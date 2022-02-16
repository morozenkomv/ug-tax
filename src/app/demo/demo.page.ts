import { Component, OnInit } from '@angular/core';
import { T101Request } from '../models/t101';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.page.html',
  styleUrls: ['./demo.page.scss'],
})
export class DemoPage {
  result: any;
  error: any;
  loading = false;

  constructor(private _httpClient: HttpClient) {}

  t101Command() {
    this.loading = true;
    this.result = null;
    this.error = null;
    const command = this._getCommand('T101');
    console.log(JSON.stringify(command));

    this._httpClient
      .post('https://api-tax.turbopos.net/api/TaxEndpoint/ug/command', {
        command: JSON.stringify(command),
      })
      .subscribe(
        (res) => {
          this.result = res;
          this.loading = false;
        },
        (err) => {
          console.log(err);
          this.loading = false;
        }
      );
  }

  private _getCommand(commandName: string): T101Request {
    const command = new T101Request();

    command.data = {
      signature: '',
      dataDescription: {
        codeType: 0,
        encryptCode: 0,
        zipCode: 0,
      },
    };

    command.globalInfo = {
      appId: 'AP01',
      version: '1.1.20191201',
      dataExchangeId: '9230489223014123',
      interfaceCode: commandName,
      tin: '1000173355',
      requestCode: 'TP',
      requestTime: '2022-01-27 17:15:07',
      responseCode: 'TA',
      userName: 'admin',
      deviceMAC: 'a0e3c4b8e190',
      deviceNo: '4444444444459',
      taxpayerID: '535911258347157325',
      longitude: '116.397128',
      latitude: '39.916527',
      responseDateFormat: 'dd/MM/yyyy',
      responseTimeFormat: 'dd/MM/yyyy HH:mm:ss',
      referenceNo: '21PL010020807',
    };

    command.returnStateInfo = {
      returnCode: '',
      returnMessage: '',
    };
    return command;
  }
}
