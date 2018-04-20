import { Component, OnInit, Input } from '@angular/core';
import { EnterCorrectService } from './enter-correct.service';
import { NzModalSubject } from 'ng-zorro-antd';
import { Logger } from 'angular2-logger/core';
@Component({
    selector: 'do-enter-correct',
    templateUrl: './do-enter-correct.component.html'
})
export class DoEnterCorrectComponent implements OnInit {
    constructor(
        private service: EnterCorrectService,
        private subject: NzModalSubject,
        private log: Logger,
    ) { }
    @Input() id: any;
    submit() {
        const result = {
            'choice': [],
            'judgment': [],
            'completion': [],
            'answer': []
        };

    }
    loading = true;
    panels = [
        {
            active: true,
            name: '填空题',
            type: 3,
        },
        {
            active: false,
            name: '简答题',
            type: 4,
        }
    ];
    answer = [];
    completion = [];
    getData(): void {
        this.service.getEnterTestProfessionAnswerOfStudent(this.id).subscribe((data: any) => {
            for (const key in data.comrelpy) {
                if (data.comrelpy.hasOwnProperty(key)) {
                    data.comrelpy[key].answer = JSON.parse(data.comrelpy[key].answer);
                    const element1 = data.comrelpy[key].answer;
                    data.comrelpy[key].answer = '';
                    for (const key2 in element1) {
                        if (element1.hasOwnProperty(key2)) {
                            data.comrelpy[key].answer += key2 + ':' + element1[key2];
                        }
                    }
                }
            }
            this.answer = data.ansreply;
            this.completion = data.comrelpy;
            this.log.debug(this.completion);
            this.loading = false;
        });
    }
    ngOnInit() {
        this.getData();
    }
    cancel() {
        this.subject.destroy();
    }
    save() {
        this.loading = true;
        let completionScore = 0;
        this.completion.forEach(element => {
            completionScore += parseInt(element.score, 10);
        });
        let answerScore = 0;
        this.answer.forEach(element => {
            answerScore += parseInt(element.score, 10);
        });
        this.service.submitEnterTest(this.id, completionScore, answerScore).subscribe(() => {
            const result = {};
            result['finished'] = true;
            this.subject.next(result);
            this.subject.destroy();
        });
    }
}
