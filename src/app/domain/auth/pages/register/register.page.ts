import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router, RouterModule } from '@angular/router';
import { iAuthentication } from '@domain/auth/interfaces/authentication.interface';
import { AuthService } from '@domain/auth/services/auth.service';
import { ButtonCancatComponent } from '@widget/components/button-cancat/button-cancat.component';
import { ButtonFormComponent } from '@widget/components/button-form/button-form.component';
import { ButtonToggleGroupComponent } from '@widget/components/button-toggle/button-toggle.component';
import { CardComponent } from '@widget/components/card/card.component';
import { CardColorDirective } from '@widget/components/card/directive/button-toggle-label-style.directive';
import { DynamicDateInputComponent } from '@widget/components/dynamic-date-input/component/dynamic-date-input.component';
import { DateInputConfig } from '@widget/components/dynamic-date-input/enuns/dynamic-date-input.types';
import { InputTypes } from '@widget/components/input/enuns/dynamic-date-input.types';
import { InputComponent } from '@widget/components/input/input.component';
import { CloseSnackBarInNow, ScoreboardColor, SnackBarComponent, SnackBarModel } from '@widget/components/snack-bar/snack-bar.component';
import { delay, Subject, takeUntil } from 'rxjs';
import { ROUTING } from 'src/assets/endpoints/router-links';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    CardComponent,
    CardColorDirective,
    InputComponent,
    RouterModule,
    SnackBarComponent,
    ButtonCancatComponent,
    ButtonFormComponent,
    ButtonToggleGroupComponent,
    DynamicDateInputComponent
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class RegisterPage {

  protected openSnackBar!: SnackBarModel;
  protected closeSnackBar!: any;
  protected SIGN_IN = ROUTING.AUTH_SIGN_IN;
  protected form!: FormGroup;
  protected buttonFormLoad: boolean = false;

  nameUser = {
    formControl: new FormControl<string | undefined>(undefined),
    title: 'Nome',
    placeholder: 'Digite seu nome',
    erroFill: "O nome deve ter pelo menos 3 caracteres.",
    erroRequired: "O nome é obrigatório.",
    type: 'text' as InputTypes,
    isRequired: true,
    minLength: 3
  };

  lastNameUser = {
    formControl: new FormControl<string | undefined>(""),
    title: 'Sobrenome',
    placeholder: 'Digite seu sobrenome',
    erroFill: "O Sobrenome deve ter pelo menos 3 caracteres.",
    erroRequired: "O sobrenome é obrigatório.",
    type: 'text' as InputTypes,
    isRequired: true,
    minLength: 3
  };

  emailUser = {
    formControl: new FormControl<string | undefined>("", Validators.email),
    title: 'E-mail',
    placeholder: 'Digite seu e-mail',
    erroFill: "Por favor, insira um e-mail válido.",
    erroRequired: "O e-mail é obrigatório.",
    type: 'email' as InputTypes,
    isRequired: true,
    minLength: 5
  };

  passwordUser = {
    formControl: new FormControl<string | undefined>(""),
    title: 'Senha',
    placeholder: 'Digite seu senha',
    erroFill: "Insira uma combinação de pelo menos seis números, letras, sinais de pontuação e símbolos (como ! e &).",
    erroRequired: "O senha é obrigatório.",
    type: 'password' as InputTypes,
    isRequired: true,
    minLength: 6
  };

  birthdayUser: DateInputConfig = {
    formControl: new FormControl(''),
    locale: "pt-br",
    mask: "dd/mm/yyyy",
    maxDate: new Date(),
    minDate: new Date('01/01/1910'),
    placeholder: "Informe sua data",
    requiredField: true,
    showHint: false,
    title: "Data de Nascimento"
  };

  genderUser = {
    formControl: new FormControl<string | undefined>("", Validators.required),
    multiple: false,
    options: [
      { label: 'Masculino', value: 'masculine' },
      { label: 'Feminino', value: 'feminine' }
    ]
  };


  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      email: this.emailUser.formControl,
      name: this.nameUser.formControl,
      LastName: this.lastNameUser.formControl,
      password: this.passwordUser.formControl,
      birthday: this.birthdayUser.formControl,
      gender: this.genderUser.formControl,
    });
  }

  onSubmit() {
    this.emailUser.formControl.markAsTouched();
    this.nameUser.formControl.markAsTouched();
    this.lastNameUser.formControl.markAsTouched();
    this.passwordUser.formControl.markAsTouched();
    this.birthdayUser.formControl.markAsTouched();
    this.genderUser.formControl.markAsTouched();


    if (!this.form.valid) {
      this.errSnackBar('Formulario deve ser preenchido');
      return;
    }

    const user: iAuthentication = {
      email: this.form.value.email,
      password: this.form.value.password,
      genre: this.form.value.gender,
      name: this.form.value.name,
      age: this.form.value.birthday,
    };

    this.buttonFormLoad = true;
    this.auth.createNewAccount(user).pipe(delay(2000)).subscribe({
      next: (res: any) => {
        this.buttonFormLoad = false;
        this.sucsessSnackBar('Cadastrado com sucesso!');
        console.log(res);
      },
      error: (err: any) => {
        this.errSnackBar(err);
        this.buttonFormLoad = false;
      },
      complete: () => {
        this.buttonFormLoad = false;
      },
    })
  }

  onSingleSelectionChange(value: any) {
    console.log('Selected color:', value);
  }

  errSnackBar(mensagem: string) {
    this.openSnackBar = {
      mensagem: mensagem,
      typeScoreboardColor: ScoreboardColor.WARN,
      time: CloseSnackBarInNow.in_10_seconds
    }
  }

  sucsessSnackBar(mensagem: string) {
    this.openSnackBar = {
      mensagem: mensagem,
      typeScoreboardColor: ScoreboardColor.SUCCESS
    }
  }

  back() {
    history.back()
  }

}
