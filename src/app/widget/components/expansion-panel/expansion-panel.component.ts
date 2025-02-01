import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss'],
  standalone: true,
  imports: [MatExpansionModule],
})
export class ExpansionPanelComponent {
  public panelOpenState = false;
}
