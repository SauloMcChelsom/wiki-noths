import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@domain/auth/services/auth.service';
import { ButtonCancatComponent } from '@widget/components/button-cancat/button-cancat.component';
import { ButtonFormComponent } from '@widget/components/button-form/button-form.component';
import { CardComponent } from '@widget/components/card/card.component';
import { CardColorDirective } from '@widget/components/card/directive/button-toggle-label-style.directive';
import { InputTypes } from '@widget/components/input/enuns/dynamic-date-input.types';
import { InputComponent } from '@widget/components/input/input.component';
import { CloseSnackBarInNow, ScoreboardColor, SnackBarComponent, SnackBarModel } from '@widget/components/snack-bar/snack-bar.component';
import { delay, Subject, takeUntil } from 'rxjs';
import { ROUTING } from 'src/assets/endpoints/router-links';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
    ButtonFormComponent
  ]
})
export class LoginPage {
  protected openSnackBar!: SnackBarModel;
  protected closeSnackBar!: any;
  protected REGISTER = ROUTING.AUTH_REGISTER;
  protected ROOT = ROUTING.ROOT;
  public linkRedirectToMainScreen = `${ROUTING.ROOT}`;
  protected form!: FormGroup;
  protected buttonFormLoad: boolean = false;
  private unsubscribe$ = new Subject<void>();

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
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: this.emailUser.formControl,
      password: this.passwordUser.formControl,
    });
  }

  onSubmit() {
    this.emailUser.formControl.markAsTouched();
    this.passwordUser.formControl.markAsTouched();

    if (!this.form.valid) {
      this.errSnackBar('Formulario deve ser preenchido');
      return;
    }
    this.buttonFormLoad = true;
    this.auth.signInWithEmailAndPassword(this.emailUser.formControl.value!, this.passwordUser.formControl.value!)
      .pipe(takeUntil(this.unsubscribe$))
      .pipe(delay(2000)).subscribe({
        next: (res: any) => {
          this.buttonFormLoad = false;
          this.sucsessSnackBar('Logando com sucesso!');
          this.router.navigate([this.linkRedirectToMainScreen]);
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

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
