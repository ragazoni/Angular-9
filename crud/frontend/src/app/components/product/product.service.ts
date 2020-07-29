import { Injectable } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private snackbar: MatSnackBar
  ) { }

showMenssage(msg: string): void{
 this.snackbar.open(msg, 'X', {
   duration: 3000,
   horizontalPosition: "right",
   verticalPosition: "top",
   panelClass: ['my-snack-bar']
 })
}

}
