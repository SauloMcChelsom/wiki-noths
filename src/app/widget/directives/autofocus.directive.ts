import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective implements AfterViewInit {
  private el = inject(ElementRef);

  public ngAfterViewInit() {
    this.el.nativeElement.focus();
  }
}
//<button appAutofocus>add</button>
