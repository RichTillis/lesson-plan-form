import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ResponseLoggingInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`LogResponseInterceptor - ${req.url}`);
    const authHeader = '49a5kdkv409fd39'; // this.authService.getAuthHeader();

    const authReq = req.clone({headers: req.headers.set('Authorization', authHeader)});

    console.log('authReq: ',authReq);

    return next.handle(authReq).pipe(
      tap(event => {
        if(event.type === HttpEventType.Response){
          console.log(event.body);
        }
      })
    )
  }
}
