import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ACLGuard } from '@delon/acl';

import { AnimalTestComponent } from './character-test/animal-test/animal-test.component';
import { ColorTestComponent } from './character-test/color-test/color-test.component';
import { NineHouseTestComponent } from './character-test/nine-house-test/nine-house-test.component';

const routes: Routes = [
  { path: 'animal-test', component: AnimalTestComponent },
  { path: 'color-test', component: ColorTestComponent },
  { path: 'nine-house-test', component: NineHouseTestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageEntranceTestRoutingModule { }
