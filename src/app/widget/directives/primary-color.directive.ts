import { Directive, ElementRef, inject, OnInit } from '@angular/core';

@Directive({
  selector: '[appPrimaryColor]',
  standalone: true,
})
export class PrimaryColorDirective implements OnInit {
  private elementRef = inject(ElementRef);

  public ngOnInit() {
    const primaryColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue('--app-primary');
    this.elementRef.nativeElement.style.color = primaryColor;
  }
}
//<div appPrimaryColor>Text</div>
