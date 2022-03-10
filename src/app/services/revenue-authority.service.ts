import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { RequestObject, ResponseObject } from '../models/api-models';

@Injectable({
  providedIn: 'root',
})
export class RevenueAuthorityService {
  private _baseUrl;

  constructor(private _httpClient: HttpClient) {
    this._baseUrl = 'https://api-tax.turbopos.net/api/TaxEndpoint/ug/command';
  }

  t101Command() {
    const to101Command = this._getRequestObject('T101');
    console.log(to101Command);
    return this._sendCommand(to101Command);
  }

  t102Command() {
    const to101Command = this._getRequestObject('T102');
    console.log(to101Command);
    return this._sendCommand(to101Command);
  }

  private _sendCommand(request: RequestObject): Observable<ResponseObject> {
    const requestData = JSON.stringify(request);
    return this._httpClient.post<ResponseObject>(this._baseUrl, {
      command: requestData,
    });
  }

  private _getRequestObject(commandName: string): RequestObject {
    const command = new RequestObject();
    const _requestTime = this._getRequestTime();

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
      requestTime: _requestTime,
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

  private _getRequestTime() {
    return moment().add(1, 'hours').format('yyyy-MM-DD HH:mm:ss');
  }
}
