import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResponseModel } from '../models/productResponseModul';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl:string= "https://localhost:44311/api/products/getall";

  constructor(private httpClient: HttpClient) { }

  getProducts():Observable<ProductResponseModel>{
    return  this.httpClient.get<ProductResponseModel>(this.apiUrl)
  }
}
