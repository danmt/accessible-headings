import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadingComponent } from './heading/heading.component';
import { HeadingDirective } from './heading/heading.directive';

@NgModule({
  declarations: [HeadingComponent, HeadingDirective],
  exports: [HeadingComponent],
  imports: [CommonModule]
})
export class SharedModule {}
