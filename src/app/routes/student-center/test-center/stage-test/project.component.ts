import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject, UploadFile, NzMessageService } from 'ng-zorro-antd';
import { StageTestService } from './stage-test.service';
import { Logger } from 'angular2-logger/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { I18NService } from '@core/i18n/i18n.service';
@Component({
    templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {
    loading = false;
    @Input() id: any;
    constructor(
        private subject: NzModalSubject,
        private msg: NzMessageService,
        private service: StageTestService,
        private log: Logger) { }
    projectName;
    projectDescription;
    ngOnInit() {
        this.loading = true;
        this.service.getStageTestQestions(this.id).subscribe((data: any) => {
            this.projectName = data.test.project_name;
            this.projectDescription = data.test.project_detail;
            this.loading = false;
        });
    }







    uploading = false;
    fileList: UploadFile[] = [];


    beforeUpload = (file: UploadFile): boolean => {
        this.fileList.push(file);
        return false;
    }
    cancel() {
        this.subject.destroy();
    }
    handleUpload() {
        let projectName;
        let fileName;
        const formData = new FormData();
        this.fileList.forEach((file: any) => {
            formData.append('files[]', file);
            this.log.debug(file);
            if (file.type === 'application/msword') {
                fileName = file.name;
            } else {
                projectName = file.name;
            }
        });
        this.loading = true;
        // this.log.debug(this.fileList);
        this.service.submitStageTestProject(this.id, projectName, fileName, formData).subscribe((data) => {
            // this.log.debug(data);
            this.msg.success('上传成功!');
            this.subject.destroy();
        });
        // You can use any AJAX library you like
        /* const req = new HttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts/', formData, {
          // reportProgress: true
        }); */
        /* this.service.submitStageTestProject()
        this.http.request(req).pipe(filter(e => e instanceof HttpResponse)).subscribe((event: any) => {
          this.uploading = false;
          this.msg.success('upload successfully.');
        }, (err) => {
          this.uploading = false;
          this.msg.error('upload failed.');
        }); */
    }



}
