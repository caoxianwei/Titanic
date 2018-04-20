import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { LayoutDefaultComponent } from './default/default.component';
import { LayoutFullScreenComponent } from './fullscreen/fullscreen.component';
import { HeaderComponent } from './default/header/header.component';
import { SidebarComponent } from './default/sidebar/sidebar.component';
import { HeaderNotifyComponent } from './default/header/components/notify.component';
import { HeaderTaskComponent } from './default/header/components/task.component';
import { HeaderI18nComponent } from './default/header/components/i18n.component';
import { HeaderUserComponent } from './default/header/components/user.component';

import { NotifyDedetailComponent } from './default/header/components/notify-detail.component';

const COMPONENTS = [
    LayoutDefaultComponent,
    LayoutFullScreenComponent,
    HeaderComponent,
    SidebarComponent
];

const HEADERCOMPONENTS = [
    HeaderNotifyComponent,
    HeaderTaskComponent,
    HeaderI18nComponent,
    HeaderUserComponent
];
const COMPONENTS_NOROUNT = [
    NotifyDedetailComponent
];
// passport
import { LayoutPassportComponent } from './passport/passport.component';
const PASSPORT = [
    LayoutPassportComponent
];

@NgModule({
    imports: [SharedModule],
    providers: [],
    declarations: [
        ...COMPONENTS,
        ...HEADERCOMPONENTS,
        ...PASSPORT,
        ...COMPONENTS_NOROUNT
    ],
    exports: [
        ...COMPONENTS,
        ...PASSPORT
    ],
    entryComponents: COMPONENTS_NOROUNT
})
export class LayoutModule { }
