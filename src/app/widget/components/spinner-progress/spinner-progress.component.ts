import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-spinner-progress',
  templateUrl: './spinner-progress.component.html',
  styleUrls: ['./spinner-progress.component.scss'],
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, TranslateModule],
})
export class SpinnerProgressComponent {
  @Input() public title = '';
  @Input() public subtitle = '';
  @Input() public currentStep = 2; // Número atual do passo
  @Input() public totalSteps = 5; // Total de passos

  // Percentual de progresso
  public get progressValue(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }
}
