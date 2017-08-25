import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Encounter } from '../models/encounter';

@Injectable()
export class EncountersService {
  private URL_ENCOUNTERS = 'https://red-wdp-api.herokuapp.com/api/mars/encounters';

  constructor(private http: Http) { }

  getData() {
    return this.http.get(this.URL_ENCOUNTERS)
      .map(this.extractEncounters);
  }

  extractEncounters(res: Response) {
    const encounters = res.json();
    return encounters;
  }
}
