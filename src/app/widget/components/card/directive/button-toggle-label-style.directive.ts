import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appColor]',
  standalone: true,
})
export class CardColorDirective implements AfterViewInit {
  @Input() public appColor = '';
  private el = inject(ElementRef);

  public ngAfterViewInit(): void {
    const card = this.el.nativeElement.querySelector('mat-card');
    if (card) {
      card.style.setProperty(
        'background-color',
        `var(${this.appColor})`,
        'important'
      );
    }
  }
}
