import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { FooterComponent } from './footer/footer.component';

const COMPONENTS = [
    FooterComponent
];

@NgModule({
    imports: [SharedModule],
    providers: [
    ],
    declarations: [
        ...COMPONENTS
    ],
    exports: [
        ...COMPONENTS
    ]
})
export class UtilsModule { }
