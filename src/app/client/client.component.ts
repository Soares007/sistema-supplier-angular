import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(private ClientService: ClientService,
    private formBuilder: FormBuilder

  ) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      phone_number: [''],
      adress: [''],
      cpf: ['']
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
    if (this.isEditing) {
      this.ClientService.update(this.formGroupClient.value).subscribe(
        {
          next: () => {
            this.loadClients();
            this.formGroupClient.reset();
            this.isEditing = false;
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

          }
        }
      );
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
  limparDados(){
    this.formGroupClient.reset();
  }

}
