import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject, NzMessageService } from 'ng-zorro-antd';
import { StudentCenterService } from './../student-center.service';
import { Logger } from 'angular2-logger/core';
import { I18NService } from '@core/i18n/i18n.service';
@Component({
    templateUrl: './show-report.component.html'
})
export class ShowReportComponent implements OnInit {
    loading = false;
    @Input() content: any;
    @Input() type: any;
    constructor(
        private subject: NzModalSubject,
        private service: StudentCenterService,
        private msg: NzMessageService,
        private i18: I18NService,
        private log: Logger) { }
    ngOnInit() {
        if (this.type === 2) {
            this.content = '平时积极出勤,是个准时的好学生.但是晚归情况较为严重,希望引起注意!\n在专业测试中,你的成绩属于中等,学习能力并不弱,希望你再加把劲,争取名列前茅!\n大家对你的评价,在合作交际方面并不是特别理想,希望你将一部分精力用于社交,社交能力也是种不可或缺的能力!';
        } else if (this.type === 3) {
            this.content = '在大学的整个学习阶段,你的表现较为突出,在学科竞赛、社团活动、班级事务等各个方面都能看到你的身影,在同学中的拥有较强的话语权.\n考虑到你的专业水平与个人性格特质,建议你考虑规模大一些的事业单位技术岗,转正薪资参考范围是6k至8k.';
        }
        /* if (this.type === 1) {
            this.service.getEntranceReport().subscribe((data: any) => {
                if (data.code !== 403) {
                    this.content = data.report.content;
                } else {
                    this.msg.warning('请先完成入学测试!');
                }
            });
        } else if (this.type === 2) {
            this.content = '平时积极出勤,是个准时的好学生.但是晚归情况较为严重,希望引起注意!\n在专业测试中,你的成绩属于中等,学习能力并不弱,希望你再加把劲,争取名列前茅!\n大家对你的评价,在合作交际方面并不是特别理想,希望你将一部分精力用于社交,社交能力也是种不可或缺的能力!';
        } else if (this.type === 3) {
            this.content = '在大学的整个学习阶段,你的表现较为突出,在学科竞赛、社团活动、班级事务等各个方面都能看到你的身影,在同学中的拥有较强的话语权.\n考虑到你的专业水平与个人性格特质,建议你考虑规模大一些的事业单位技术岗,转正薪资参考范围是6k至8k.';
        } */
    }
}
