import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appButtonToggLabelStyleWidthFull]',
  standalone: true,
})
export class ButtonToggleLabelStyleWidthFullDirective implements AfterViewInit {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  public ngAfterViewInit(): void {
    const group = this.el.nativeElement.querySelector(
      'mat-button-toggle-group'
    );

    if (group) {
      this.renderer.setStyle(group, 'width', '100%');

      const toggles = group.querySelectorAll('mat-button-toggle');
      toggles.forEach((toggle: HTMLElement) => {
        this.renderer.setStyle(toggle, 'width', '100%');
      });
    }
  }
}
