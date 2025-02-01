import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
})
export class PaginatorComponent {
  @Input() public totalItems = 0;
  @Input() public itemsPerPage = 10;
  @Input() public currentPage = 1;
  @Input() public pagesToShow = 2;
  @Output() public pageChange = new EventEmitter<number>();

  public get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  public get visiblePages(): number[] {
    const start = Math.max(
      1,
      this.currentPage - Math.floor(this.pagesToShow / 2)
    );
    const end = Math.min(this.totalPages, start + this.pagesToShow - 1);

    const adjustedStart = Math.max(1, end - this.pagesToShow + 1);
    const adjustedEnd = Math.min(
      this.totalPages,
      adjustedStart + this.pagesToShow - 1
    );

    return Array.from(
      { length: adjustedEnd - adjustedStart + 1 },
      (_, i) => adjustedStart + i
    );
  }

  public goToPage(page: number): void {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }

  public goToPrevious(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  public goToNext(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }
}
