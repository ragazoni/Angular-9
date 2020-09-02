import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar'
import { EMPTY, Observable } from 'rxjs';
import { Product } from './product.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class ProductService {
  baseUrl = " http://localhost:3001/products";

  constructor(private snackbar: MatSnackBar, private http: HttpClient) {}

  showMenssage(msg: string, iserror: boolean = false): void {
    this.snackbar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: iserror ? ['msg-error'] : ['msg-success'],
    });
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }
  
  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  readById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(url, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );

  }

  errorHandler(e: any): Observable<any> {
    this.showMenssage('Ocorreu um erro!', true);
    return EMPTY
  }


}
