import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError, of, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Platform } from '@ionic/angular';

import { HTTP } from '@ionic-native/http/ngx';

@Injectable()
export class NativeHttpInterceptor implements HttpInterceptor {
  constructor(private _nativeHttp: HTTP, private _platform: Platform) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('intercept');
    return this._getHttpResponse(req, next).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return of(null); // handle 401
        }

        if (error.status === 403) {
          return of(null); // handle 403
        }

        console.error(error);
        return throwError(error);
      })
    );
  }

  private _getHttpResponse(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      this._platform.is('cordova') &&
      !request.url.startsWith('http://localhost') &&
      !request.url.startsWith('../../assets')
    ) {
      return from(this._handleNativeRequest(request)).pipe(
        map((event: HttpResponse<any>) => {
          event = event.clone({ body: event.body });
          return event;
        })
      );
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          event = event.clone({ body: event.body });
        }
        return event;
      })
    );
  }

  private async _handleNativeRequest(
    request: HttpRequest<any>
  ): Promise<HttpResponse<any>> {
    const headerKeys = request.headers.keys();
    const headers = {};

    headerKeys.forEach((key) => {
      headers[key] = request.headers.get(key);
    });

    try {
      await this._platform.ready();

      let _data = request.body;
      if (!_data) {
        _data = {};
      }

      let _serializer: any = 'json';
      if (typeof _data == 'string') {
        _serializer = 'utf8';
      }
      const method = <any>request.method.toLowerCase();
      const nativeHttpResponse = await this._nativeHttp.sendRequest(
        request.urlWithParams,
        {
          method: method,
          data: _data,
          headers: headers,
          serializer: _serializer,
        }
      );

      let body;
      try {
        body = JSON.parse(nativeHttpResponse.data);
      } catch (error) {
        body = { response: nativeHttpResponse.data };
      }

      const response = new HttpResponse({
        body: body,
        status: nativeHttpResponse.status,
        headers: new HttpHeaders(nativeHttpResponse.headers),
        url: nativeHttpResponse.url,
      });

      return Promise.resolve(response);
    } catch (error) {
      console.log('— Request url');
      console.log(request.url);
      console.log('— Request body');
      console.log(request.body);

      if (!error.status) {
        return Promise.reject(error);
      }

      console.log('— Response error');
      console.log(JSON.stringify(error));

      const response = new HttpErrorResponse({
        error: JSON.parse(error.error),
        status: error.status,
        headers: error.headers,
        url: error.url,
      });

      return Promise.reject(response);
    }
  }
}
