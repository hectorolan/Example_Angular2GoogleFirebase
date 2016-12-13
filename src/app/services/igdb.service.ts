import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

export class Game {
  id: number;
  name: string;
  cover: {
    cloudinary_id: string,
    url: string
  };
}

@Injectable()
export class IgdbService {
  private igdbNameURL = `https://igdbcom-internet-game-database-v1.p.mashape.com/gam`
  + `es/?fields=name,cover&limit=10&offset=0&search=`;
  private igdbImageURL = 'http://images.igdb.com/igdb/image/upload/t_cover_big/';

  private igdbHeaders = {
    'X-Mashape-Key' : 'RGERb8l4Kkmsh4fvMJQHIZ9cEdz2p1Dvb1mjsn3KKk2Fx1sOrR',
    'Accept': 'application/json'
  };

  constructor(private http: Http) { }

  getGameNames(search: string): Observable<Game[]> {
    let headers = new Headers(this.igdbHeaders);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.igdbNameURL + search, options).map((res: Response) => {
      let games: Game[] = res.json();
      return games ? games : { };
    }).catch(this.handleError);
  }

  getGameURL(key: string): string {
    return this.igdbImageURL + key + '.png';
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
