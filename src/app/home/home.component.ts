import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `<p>home works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
