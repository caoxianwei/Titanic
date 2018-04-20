import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { NotifyService } from './notify.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { map, groupBy, concatMap, mergeMap, flatMap, delay, tap, toArray } from 'rxjs/operators';
import * as moment from 'moment';
import { NoticeItem } from '@delon/abc';
import { SettingsService } from '@delon/theme';
import { NotifyDedetailComponent } from './notify-detail.component';

/**
 * 菜单通知
 */
@Component({
    selector: 'header-notify',
    template: `
    <notice-icon
        [data]="data"
        [count]="count"
        [loading]="loading"
        (select)="select($event)"
        (clear)="clear($event)"
        [(popoverVisible)]="popoverVisible"
        ></notice-icon>
    `
})
// (popupVisibleChange)="loadData($event)"
export class HeaderNotifyComponent implements OnInit {

    data: NoticeItem[] = [
        { title: '通知', list: [], emptyText: '你已查看所有通知', emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg' },
        { title: '待办', list: [], emptyText: '你已完成所有待办', emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg' }
    ];
    count = 0;
    loading = false;
    popoverVisible = false;
    constructor(
        private msg: NzMessageService,
        private settings: SettingsService,
        private modal: NzModalService,
        private service: NotifyService) {

    }

    ngOnInit() {
        this.getData();
    }
    getData() {
        this.service.getNotices().subscribe(data => {
            console.log(data);
            // this.loadData(data);
            this.data[0].list = [];
            this.data[1].list = [];
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const element = data[key];
                    if (element.type === '通知') {
                        this.data[0].list.push(element);
                    } else if (element.type === '待办') {
                        this.data[1].list.push(element);
                    }
                }
            }
            /*  let hasInform = false;
             for (const key in data) {
                 if (data.hasOwnProperty(key)) {
                     const element = data[key];
                     if (element.type === '通知') {
                         hasInform = true;
                     }
                 }
             }
             if (hasInform) {
                 this.loadData(data);
             } else {
                 this.loadData([]);
             } */
            this.count = data.length;
        });
    }
    private parseGroup(data: Observable<any[]>) {
        // console.log('parseGroup');
        data.pipe(
            concatMap((i: any) => i),
            map((i: any) => {
                // if (i.datetime) i.datetime = moment(i.datetime).fromNow();
                // change to color
                if (i.status) {
                    i.color = ({
                        todo: '',
                        processing: 'blue',
                        urgent: 'red',
                        doing: 'gold',
                    })[i.status];
                }
                return i;
            }),
            groupBy((x: any) => x.type),
            mergeMap(g => g.pipe(toArray())),
            tap((ls: any) => {
                this.data.find(w => w.title === ls[0].type).list = ls;
            })
        ).subscribe(res => this.loading = false);
        setTimeout(() => {
            console.log(this.data);
        }, 1000);
    }

    loadData(data) {
        //  if (!res || this.loading) return;
        this.loading = true;
        // region: mock http request
        this.parseGroup(ArrayObservable.of(data).pipe(delay(1000)));
        // endregion
    }

    clear(type: string) {
        this.msg.success(`清空了 ${type}`);
    }

    select(res: any) {
        if (res.item.type === '通知') {
            setTimeout(() => {
                this.popoverVisible = true;
            }, 1);
            setTimeout(() => {
                this.popoverVisible = false;
            }, 2);
            this.modal.open({
                wrapClassName: 'modal-md',
                content: NotifyDedetailComponent,
                footer: false,
                maskClosable: false,
                componentParams: {
                    id: res.item.id
                }
            }).subscribe(result => {
                if (result['finished'] === true) {
                    this.getData();
                }
            });
        }
    }
}
