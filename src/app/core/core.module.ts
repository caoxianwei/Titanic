import { NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-guard';

import { I18NService } from './i18n/i18n.service';
import {
  BasicConfigurationService,
  CharacterTestService,
  EntranceTestService,
  UserAuthService,
  QuestionService,
  TeacherService,
  StudentService,
  CommonService
} from '@core/common/common.service';
@NgModule({
    providers: [
        I18NService,
        BasicConfigurationService,
        CharacterTestService,
        EntranceTestService,
        UserAuthService,
        QuestionService,
        TeacherService,
        StudentService,
        CommonService
    ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
