import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { AnimalTestComponent } from './character-test/animal-test/animal-test.component';
import { ColorTestComponent } from './character-test/color-test/color-test.component';
import { NineHouseTestComponent } from './character-test/nine-house-test/nine-house-test.component';
import { CreateOrEditAnimalTestComponent } from './character-test/animal-test/create-or-edit-animal-test.component';
import { CreateOrEditColorTestComponent } from './character-test/color-test/create-or-edit-color-test.component';
import { CreateOrEditNineHouseTestComponent } from './character-test/nine-house-test/create-or-edit-nine-house-test.component';
import { ManageEntranceTestRoutingModule } from './manage-entrance-test-routing.module';


import { UtilsModule } from '../utils/utils.module';
const COMPONENTS_NOROUNT = [CreateOrEditAnimalTestComponent, CreateOrEditColorTestComponent, CreateOrEditNineHouseTestComponent];

@NgModule({
    imports: [
        SharedModule,
        ManageEntranceTestRoutingModule,
        UtilsModule
    ],
    declarations: [
        AnimalTestComponent,
        ColorTestComponent,
        NineHouseTestComponent,
        ...COMPONENTS_NOROUNT
    ],
    entryComponents: COMPONENTS_NOROUNT
})
export class ManageEntranceTestModule { }
