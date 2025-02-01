import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appStrokeLineCircle]',
  standalone: true,
})
export class StrokeLineCircleDirective implements AfterViewInit {
  private elem = inject(ElementRef);

  public ngAfterViewInit() {
    const element = this.elem.nativeElement;
    const circle = element.querySelector('circle');
    circle.style.strokeLinecap = 'round';
  }
}
