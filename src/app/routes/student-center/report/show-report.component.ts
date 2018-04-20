import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';
import { StudentService } from '@core/common/common.service';
import { Logger } from 'angular2-logger/core';
import { I18NService } from '@core/i18n/i18n.service';
@Component({
    templateUrl: './show-report.component.html'
})
export class ShowReportComponent implements OnInit {
    loading = false;
    @Input() type: any;
    constructor(
        private subject: NzModalSubject,
        private studentService: StudentService,
        private i18: I18NService,
        private log: Logger) { }
    content;
    ngOnInit() {
        if (this.type === 1) {
            this.content = '个性特点：很传统，注重细节，条理分明，责任感强，重视纪律。保守、分析力强，精准度高，喜欢把细节条例化，个性拘谨含蓄。\n优点：天生就有爱找出事情真相的习性，因为有耐心仔细考察所有的细节并想出合乎逻辑的解决办法。\n缺点：把事实和精确度置于感情之前，这会被认为是感情冷漠。在压力下，有时为了避免做出结论，会分析过度。\n学习方向推荐: 你拥有不错的理论基础，在专业的学习中会比一般人走的更远。基于学校培养计划和你个人的性格特色，建议你重点关注云计算方向，这是未来的趋势，现已有大量应用于市场。';
        } else if (this.type === 2) {
            this.content = '平时积极出勤,是个准时的好学生.但是晚归情况较为严重,希望引起注意!\n在专业测试中,你的成绩属于中等,学习能力并不弱,希望你再加把劲,争取名列前茅!\n大家对你的评价,在合作交际方面并不是特别理想,希望你将一部分精力用于社交,社交能力也是种不可或缺的能力!';
        } else if (this.type === 3) {
            this.content = '在大学的整个学习阶段,你的表现较为突出,在学科竞赛、社团活动、班级事务等各个方面都能看到你的身影,在同学中的拥有较强的话语权.\n考虑到你的专业水平与个人性格特质,建议你考虑规模大一些的事业单位技术岗,转正薪资参考范围是6k至8k.';
        }
    }
}
