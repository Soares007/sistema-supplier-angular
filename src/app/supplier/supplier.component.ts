import { SupplierService } from './../supplier.service';
import { Supplier } from './../supplier';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {

  supplier: Supplier[] = [];
  isEditing: boolean = false;
  formGroupSupplier: FormGroup;
  submitted: boolean = false;
  categoryOptions: string[] = ['Eletrônicos', 'Roupas', 'Bebidas', 'Livros', 'Alimentos', 'Decoração', 'Esportes e Fitness', 'Beleza e Cuidados Pessoais', 'Brinquedos e Jogos', 'Móveis e Decoração de Interiores'];
  constructor(private SupplierService: SupplierService,
    private formBuilder: FormBuilder

  ) {
    this.formGroupSupplier = formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      cnpj: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      produto: ['', [Validators.required]],
      isAcceptedTerms: [false, [Validators.required, this.validateIsAcceptedTerms]],
      isVerifiedSupplier: [false]
    });
  }
  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.SupplierService.getSuppliers().subscribe({
      next: data => this.supplier = data
    });
  }

  validateIsAcceptedTerms(control: AbstractControl) {
    if (!control.value) {
      return { isAcceptedTermsRequired: true };
    }
    return null;
  }

  save() {
    this.submitted = true;
    if (this.formGroupSupplier.valid) {
      if (this.isEditing) {
        this.SupplierService.update(this.formGroupSupplier.value).subscribe(
          {
            next: () => {
              this.loadSuppliers();
              this.formGroupSupplier.reset();
              this.isEditing = false;
              this.submitted = false;
            }
          }
        );
      }
      else {
        this.SupplierService.save(this.formGroupSupplier.value).subscribe(
          {
            next: data => {
              this.supplier.push(data)
              this.formGroupSupplier.reset();
              this.submitted = false;
            }
          }
        );
      }
    }
  }

  edit(supplier: Supplier) {
    this.formGroupSupplier.setValue(supplier);
    this.isEditing = true;
  }

  delete(supplier: Supplier) {
    this.SupplierService.delete(supplier).subscribe(
      {
        next: () => this.loadSuppliers()
      }
    );
  }
  limparDados() {
    this.formGroupSupplier.reset();
    this.submitted = false;
  }

  get name(): any {
    return this.formGroupSupplier.get("name");
  }
  get phone(): any {
    return this.formGroupSupplier.get("phone_number");
  }
  get cnpj(): any {
    return this.formGroupSupplier.get("cnpj");
  }
  get category(): any {
    return this.formGroupSupplier.get("categoria");
  }
  get product(): any {
    return this.formGroupSupplier.get("produto");
  }
  get accTerms(): any {
    return this.formGroupSupplier.get("isAcceptedTerms")
  }
}
