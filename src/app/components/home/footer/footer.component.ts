import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Subscriber, Subscription } from 'rxjs';
import { Email } from 'src/app/model/mail';
import { SharedServices } from '../../../services/shared-services.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {

  anio = new Date();
  nombre = 'Steven Majek';
  translate: boolean;

  form: FormGroup;

  email: Email = new Email();

  // sub
  subscriber: Subscription;

  constructor(private servicio: SharedServices,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar ) {

    this.emailForm();


  }

  ngOnInit() {
    this.subscriber = this.servicio.translate.subscribe(translate => {
      this.translate = translate;
    });
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

  openFacebook() {
    window.open('https://www.facebook.com/steven.majek');
  }

  openInstagram() {
    window.open('https://www.instagram.com/stevenmajek/');

  }

  openWhatsapp() {
    // tslint:disable-next-line:quotemark
    window.open("https://api.whatsapp.com/send?phone=663509340&text=Hello%20Steven!%20Let's%20talk%20about%20business");
  }

  openGitHub() {
    window.open('https://github.com/1majek');
  }

  get nameError() {
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }

  get asuntoError() {
    return this.form.get('asunto').invalid && this.form.get('asunto').touched;
  }

  get emailError() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get mensajeError() {
    return this.form.get('mensaje').invalid && this.form.get('mensaje').touched;
  }


  emailForm() {
    this.form = this.formBuilder.group({
      nombre:   ['', Validators.required],
      asunto:   ['', Validators.required],
      email:    ['', Validators.required],
      mensaje:  ['', Validators.required]
    });
  }

  sendEmail() {
    this.email = this.form.value;
    this.servicio.sendEmail(this.email)
      .subscribe(resp => {
        this.snackBar.open(resp.respuesta, 'close', {horizontalPosition: 'end', verticalPosition: 'top', duration: 5000});
      }, err => {
        this.snackBar.open(err.error, 'close', {horizontalPosition: 'end', verticalPosition: 'top', duration: 5000});
      });
  }

}
