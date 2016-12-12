import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

class GameName {
  id: number;
  name: string;
}

@Injectable()
export class IgdbService {
  private igdbURLName = `https://igdbcom-internet-game-database-v1.p.mashape.com/gam`
  + `es/?fields=name&limit=10&offset=0&order=release_dates.date%3Adesc&search=zelda`;
  private igdbHeaders = {
    'X-Mashape-Key' : 'RGERb8l4Kkmsh4fvMJQHIZ9cEdz2p1Dvb1mjsn3KKk2Fx1sOrR',
    'Accept': 'application/json'
  };

  constructor(private http: Http) { }

  getGameNames(): Observable<GameName[]> {
    let headers = new Headers(this.igdbHeaders);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.igdbURLName, options).map((res: Response) => {
      let games: GameName[] = res.json();
      return games ? games : { };
    }).catch(this.handleError);
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
