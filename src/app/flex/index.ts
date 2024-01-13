import { NgModule } from '@angular/core';

import { FlexChildDirective } from './flex-child.directive';
import { FlexContainerDirective } from './flex-container.directive';

@NgModule({
    imports: [FlexChildDirective, FlexContainerDirective],
    exports: [FlexChildDirective, FlexContainerDirective]
})
export class FlexModule { }

export * from './flex';
export * from './flex-child.directive';
export * from './flex-container.directive';