import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appStrokeColor]',
  standalone: true,
})
export class StrokeColorDirective implements AfterViewInit {
  @Input() public appStrokeColor!: string;
  private elem = inject(ElementRef);

  public ngAfterViewInit() {
    if (this.appStrokeColor) {
      const element = this.elem.nativeElement;
      const circle = element.querySelector('circle');
      circle.style.stroke = this.appStrokeColor;
      circle.style.strokeOpacity = 0.2;
    }
  }
}
