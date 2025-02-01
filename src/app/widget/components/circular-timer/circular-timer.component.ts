import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-circular-timer',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatTooltipModule],
  providers: [],
  template: `
    <div
      class="flex items-center justify-center w-16 h-16 rounded-full"
      [@scaleAnimation]="true"
      [ngStyle]="{ backgroundColor: isExpired ? '#ffffff00' : '#ffffff00' }"
    >
      <div class="relative flex items-center justify-center">
        <mat-progress-spinner
          [value]="progress"
          [diameter]="34"
          [strokeWidth]="3"
          [color]="isExpired ? 'warn' : 'primary'"
          mode="determinate"
        ></mat-progress-spinner>
        <div class="absolute text-center">
          <span
            [matTooltip]="textTooltip"
            class="text-sm font-bold"
            [ngStyle]="{ color: isExpired ? '#FFF' : '#fff' }"
          >
            {{ timeLeft > 0 ? timeLeft : 'Expired' }}
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .flex {
        display: flex;
      }
      .items-center {
        align-items: center;
      }
      .justify-center {
        justify-content: center;
      }
      .w-16 {
        width: 34px;
      }
      .h-16 {
        height: 34px;
      }
      .rounded-full {
        border-radius: 50%;
      }
      .absolute {
        position: absolute;
      }
      .text-center {
        text-align: center;
      }
      .text-sm {
        font-size: 0.875rem;
      }
      .font-bold {
        font-weight: bold;
      }
    `,
  ],
  animations: [
    trigger('scaleAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0.9)' }),
        animate('200ms ease-in', style({ transform: 'scale(1)' })),
      ]),
    ]),
  ],
})
export class CircularTimerComponent implements OnInit, OnChanges {
  @Input() public expiresIn = '';
  protected textTooltip = '';
  public timeLeft = 0;
  public isExpired = false;
  public progress = 100;
  private intervalId: any;

  public ngOnInit(): void {
    this.initializeTimer();
  }

  public ngOnChanges(): void {
    this.initializeTimer();
    this.setMessageTooltip();
  }

  private setMessageTooltip(): void {
    this.textTooltip = this.expiresIn ? this.expiresIn : 'No value was passed';
  }

  public initializeTimer(): void {
    clearInterval(this.intervalId);

    const targetDate = new Date(this.expiresIn);
    const now = new Date();
    const differenceInSeconds = Math.floor(
      (targetDate.getTime() - now.getTime()) / 1000
    );

    if (differenceInSeconds > 0) {
      this.timeLeft = differenceInSeconds;
      this.startTimer();
    } else {
      this.triggerExpiration();
    }
  }

  public startTimer(): void {
    this.intervalId = setInterval(() => {
      if (this.timeLeft <= 1) {
        clearInterval(this.intervalId);
        this.triggerExpiration();
      } else {
        this.timeLeft--;
        this.progress = (this.timeLeft / (this.timeLeft + 1)) * 100;
      }
    }, 1000);
  }

  private triggerExpiration(): void {
    this.isExpired = true;
    this.timeLeft = 0;
    this.progress = 0;
  }
}
