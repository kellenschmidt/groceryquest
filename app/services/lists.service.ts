import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class ListsService {

    // _apiUrl: string = "http://138.197.207.203/api"
    _apiUrl: string = "https://groceryquest.party/api";
    _googleUrl: string = "https://maps.googleapis.com/maps/api/geocode/json";
    response : any;


    constructor(private http: Http) {}

    createAuthorizationHeader(headers:Headers, token) {
        headers.append('Authorization', 'Basic ' +
        btoa(`${token}:`));
    }

	getListsAPI(token) : Promise<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
        this.createAuthorizationHeader(headers, token)
        this.response = this.http.get(this._apiUrl + '/lists', { headers: headers }).toPromise().then(x => x.json() as any);
        return this.response;
	}

    getListAPI(token, list_id) : Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        this.createAuthorizationHeader(headers, token)
        this.response = this.http.post(this._apiUrl + '/list', {list_id: list_id}, { headers: headers }).toPromise().then(x => x.json() as any);
        return this.response;
    }

    getStoresAPI() : Promise<any[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        this.response = this.http.get(this._apiUrl + '/stores', { headers: headers }).toPromise().then(x => x.json() as any);
        return this.response;
    }

    getStore(store_id) : Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        this.response = this.http.post(this._apiUrl + '/store', {store_id : store_id }, { headers: headers }).toPromise().then(x => x.json() as any);
        return this.response;
    }

    addList(token, store_id, title) : Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        this.createAuthorizationHeader(headers, token);
        this.response = this.http.post(this._apiUrl + '/addlist', { store_id: store_id, title: title }, { headers: headers }).toPromise().then(x => x.json() as any);
        return this.response;

    }


    saveList(token, list) : Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        this.createAuthorizationHeader(headers, token)
        let body = JSON.stringify(list);
        this.http.post(this._apiUrl + '/updatelist', body, { headers: headers }).toPromise().then(x => x.json() as any);
        return this.response;
    }

    deleteList(token, list_id) : Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        this.createAuthorizationHeader(headers, token)
        this.http.post(this._apiUrl + '/removelist', {list_id: list_id}, { headers: headers }).toPromise().then(x => x.json() as any);
        return this.response;
    }

    getAutocomplete(data, store_id): Promise<any[]>  {
        return this.http.get(this._apiUrl + '/autocomplete/' + data + '?store_id=' + store_id)
		.toPromise()
		.then(x => x.json() as any[]);
	}

    getMap(address) : Promise<any> {
        return this.http.get(this._googleUrl + "?address=" + address + "&key=AIzaSyBYE-4gk74pmow2BSIMueumCHb8A_kdZlw")
        .toPromise()
        .then(x => x.json() as any);
    }

}
