import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Client } from '../client';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {


  clients: Client[] = [];
  isEditing: boolean = false;
  formGroupClient: FormGroup;
  paymentOptions: string[] = ['Cartão de Crédito/Débito', 'Boleto', 'Dinheiro', 'Pix'];
  submitted: boolean = false;
  constructor(private ClientService: ClientService,
    private formBuilder: FormBuilder

  ) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required]],
      adress: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      payment: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.ClientService.getClients().subscribe({
      next: data => this.clients = data
    });
  }

  save() {
    this.submitted = true;
    if (this.formGroupClient.valid) {
      if (this.isEditing) {
        this.ClientService.update(this.formGroupClient.value).subscribe(
          {
            next: () => {
              this.loadClients();
              this.formGroupClient.reset();
              this.isEditing = false;
              this.submitted = false;
            }

          }
        );
      }
      else {
        this.ClientService.save(this.formGroupClient.value).subscribe(
          {
            next: data => {
              this.clients.push(data)
              this.formGroupClient.reset();
              this.submitted = false;
            }
          }
        );
      }
    }
  }

  edit(client: Client) {
    this.formGroupClient.setValue(client);
    this.isEditing = true;
  }

  delete(client: Client) {
    this.ClientService.delete(client).subscribe(
      {
        next: () => this.loadClients()
      }
    );
  }
  limparDados() {
    this.formGroupClient.reset();
    this.submitted = false;
  }

  get name() : any {
    return this.formGroupClient.get("name");
  }
  get email() : any {
    return this.formGroupClient.get("email");
  }
  get phone(): any {
    return this.formGroupClient.get("phone_number")
  }
  get adress(): any {
    return this.formGroupClient.get("adress")
  }
  get cpf(): any {
    return this.formGroupClient.get("cpf")
  }
  get payment(): any {
    return this.formGroupClient.get("payment")
  }
}
