import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productAddForm : FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private productService:ProductService,
    private toasterService:ToastrService){

    }

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm(){
    this.productAddForm = this.formBuilder.group({
      productName:["",Validators.required],
      unitPrice:["",Validators.required],
      unitsInStock:["",Validators.required],
      categoryId:["",Validators.required]
    })
  }
  add(){
    if(this.productAddForm.valid){
      let productModel = Object.assign({},this.productAddForm.value)
      console.log(productModel)
      this.productService.add(productModel).subscribe(response=>{
          this.toasterService.success(response.message,"Başarili")
      },responseError=>{
        if(responseError.error.ValidationErrors.length > 0){
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toasterService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası")
            console.log(i +':'+responseError.error.ValidationErrors[i].ErrorMessage)
          }
        }
      })
    }else{
      this.toasterService.error("Formunuz Eksik","Dikkat")
    }
  }
}
