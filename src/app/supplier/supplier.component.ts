import { SupplierService } from './../supplier.service';
import { Supplier } from './../supplier';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(private SupplierService: SupplierService,
    private formBuilder: FormBuilder

  ) {
    this.formGroupSupplier = formBuilder.group({
      id: [''],
      name: [''],
      phone_number: [''],
      cnpj: [''],
      categoria: [''],
      produto: ['']
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

  save() {
    if (this.isEditing) {
      this.SupplierService.update(this.formGroupSupplier.value).subscribe(
        {
          next: () => {
            this.loadSuppliers();
            this.formGroupSupplier.reset();
            this.isEditing = false;
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

          }
        }
      );
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
  }
}
