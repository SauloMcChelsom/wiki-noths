import { Directive, ElementRef, inject, OnInit } from '@angular/core';

@Directive({
  selector: '[appTextDefault]',
  standalone: true,
})
export class textDefaultDirective implements OnInit {
  private elementRef = inject(ElementRef);

  public ngOnInit() {
    this.elementRef.nativeElement.classList.add('text-default');
  }
}
//<div appTextDefault>Text</div>
