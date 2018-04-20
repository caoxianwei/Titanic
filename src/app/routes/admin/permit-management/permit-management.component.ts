import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { AdminService } from '../admin.service';
import { Logger } from 'angular2-logger/core';
@Component({
  templateUrl: './permit-management.component.html'
})
export class PermitManagementComponent implements OnInit {
  constructor(
    private modal: NzModalService,
    private msg: NzMessageService,
    private service: AdminService,
    private log: Logger) {
  }
  list: any[] = [];
  roleId;
  roleOptions;
  ngOnInit() {
    this.service.getRoleList(undefined, undefined, 1000).subscribe((data: any) => {
      this.roleOptions = data.role;
    });
    this.getPermitions();
  }
  showTransferBoolean = true;
  getPermitions() {
    this.service.getPermitionList().subscribe((data: any) => {
      for (const key in data.per) {
        if (data.per.hasOwnProperty(key)) {
          const element = data.per[key];
          element.title = element.remark;
          element.description = element.remark;
          element.direction = 'left';
          element.selected = false;
        }
      }
      this.list = data.per;
      this.result = data.per;
    });
  }
  roleChange() {
    setTimeout(() => {
      this.showTransferBoolean = false;
      this.service.getRolrPermition(this.roleId).subscribe((data: any) => {
        for (const key in this.list) {
          if (this.list.hasOwnProperty(key)) {
            const element = this.list[key];
            element.direction = 'left';
          }
        }
        for (let i = 0; i < this.list.length; i++) {
          this.result[i].selected = false;
          for (let j = 0; j < data.authview.length; j++) {
            if (this.list[i].permitPoint === data.authview[j].permitPoint) {
              this.list[i].direction = 'right';
              this.result[i].selected = true;
            }
          }
        }
        this.showTransferBoolean = true;
      });
    }, 1);
  }
  filterOption(inputValue, option) {
    return option.description.indexOf(inputValue) > -1;
  }

  search(ret: any) {
    // console.log('nzSearchChange', ret);
  }

  select(ret: any) {
    // console.log('nzSelectChange', ret);
  }

  change(ret: any) {
    if (ret.to === 'right') {
      for (const key in this.result) {
        if (this.result.hasOwnProperty(key)) {
          const element = this.result[key];
          for (const key2 in ret.list) {
            if (ret.list.hasOwnProperty(key2)) {
              const element2 = ret.list[key2];
              if (element2.permitPoint === element.permitPoint) {
                this.result[key].selected = true;
              }
            }
          }
        }
      }
    }
    if (ret.to === 'left') {
      for (const key in this.result) {
        if (this.result.hasOwnProperty(key)) {
          const element = this.result[key];
          for (const key2 in ret.list) {
            if (ret.list.hasOwnProperty(key2)) {
              const element2 = ret.list[key2];
              if (element2.permitPoint === element.permitPoint) {
                this.result[key].selected = false;
              }
            }
          }
        }
      }
    }
    // console.log('nzChange', ret);
  }
  result = [];
  save() {
    const _result = [];
    for (const key in this.result) {
      if (this.result.hasOwnProperty(key)) {
        const element = this.result[key];
        if (element.selected) {
          _result.push(element.permitPoint);
        }
      }
    }
    this.service.updateRolePermition(this.roleId, _result).subscribe(() => {
      this.msg.success('保存成功!');
      this.roleChange();
    });
  }
}
