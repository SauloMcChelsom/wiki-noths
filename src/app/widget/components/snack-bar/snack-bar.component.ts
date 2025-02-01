import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export enum ScoreboardColor {
  WARN = 'warn',
  SUCCESS = 'success',
  PRIMARY = 'primary',
  ALERT = 'alert',
}

export interface SnackBarModel {
  typeScoreboardColor: ScoreboardColor;
  mensagem: string;
  time?: CloseSnackBarInNow;
}

export enum CloseSnackBarInNow {
  in_5_seconds = 1000 * 5,
  in_10_seconds = 1000 * 10,
  in_1_minutes = 1000 * 60,
  in_5_minutes = 1000 * 60 * 5,
}

@Component({
  selector: 'app-snackbar-alert-static',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class SnackBarComponent {
  protected typeScoreboardColor!: ScoreboardColor;
  protected mensagem = '';

  @Input()
  public set openSnackBar(model: SnackBarModel) {
    if (!model) {
      return;
    }
    this.typeScoreboardColor = model.typeScoreboardColor;
    this.mensagem = model.mensagem;
    this.showSnackBar = true;

    if (!model.time) {
      setTimeout(() => {
        this.showSnackBar = false;
      }, CloseSnackBarInNow.in_5_seconds);
      return;
    }

    setTimeout(() => {
      this.showSnackBar = false;
    }, model.time);
  }

  @Input()
  public set closeSnackBar(func: () => void) {
    this.showSnackBar = false;
  }

  protected showSnackBar = false;
}
