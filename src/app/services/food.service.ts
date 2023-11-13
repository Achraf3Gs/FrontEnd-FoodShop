import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';

import { Tag } from '../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  token:any=localStorage.getItem('token')

  constructor(private http:HttpClient) {

  }


  getAll():Observable<Food[]>{
    return this.http.get<Food[]>(`${environment.urlBackend}`+'foods')
  }


  getAllFoodsBySearchTerm(searchTerm:string):Observable<Food[]>{
    return this.http.get<Food[]>(`${environment.urlBackend}`+'search/'+searchTerm)
   }

   getAllTags():Observable<Tag[]> {
    return this.http.get<Tag[]>(`${environment.urlBackend}`+'tags')
  }

  getAllFoodsByTag(tag: string):Observable<Food[]> {
    return this.http.get<Food[]>(`${environment.urlBackend}`+'tag/'+tag)
  }

  getFoodById(foodId:number):Observable <Food>{
    return this.http.get<Food>(`${environment.urlBackend}`+'food/'+foodId)
  }



}
