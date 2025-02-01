import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TabModel } from './models';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [MatTabsModule, CommonModule],
})
export class TabsComponent {
  @Input() public tabs: TabModel[] = [];
  @Input() public defaultIndex = 0;
  @Output() public currentTabChange = new EventEmitter<number>();
  public loadedTabs: boolean[] = [];
  public currentIndex = 0;
  public initialState!: { index: number; loadedTabs: boolean[] };

  public ngOnInit() {
    this.currentIndex = this.defaultIndex;
    this.loadedTabs = Array(this.tabs.length).fill(false);
    this.loadedTabs[this.defaultIndex] = true;
    this.saveInitialState();
  }

  public onTabChange(index: number): void {
    if (!this.loadedTabs[index]) {
      this.loadedTabs[index] = true;
    }
    this.currentIndex = index;
    this.currentTabChange.emit(this.currentIndex);
  }

  public saveInitialState(): void {
    this.initialState = {
      index: this.defaultIndex,
      loadedTabs: [...this.loadedTabs],
    };
  }

  public resetToInitialState(): void {
    this.currentIndex = this.initialState.index;
    this.loadedTabs = [...this.initialState.loadedTabs];
    this.currentTabChange.emit(this.currentIndex);
  }
}
