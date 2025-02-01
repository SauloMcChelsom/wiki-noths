import { Directive, ElementRef, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHideIfLoggedIn]',
})
export class HideIfLoggedInDirective {
  private el: ElementRef = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);
  private authService: any;

  public ngOnInit() {
    this.authService.isAuthenticated().subscribe((isLoggesIn: boolean) => {
      if (isLoggesIn) {
        this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
      } else {
        this.renderer.setStyle(this.el.nativeElement, 'display', 'initial');
      }
    });
  }
}
//<button appHideIfLoggedIn>add</button>
