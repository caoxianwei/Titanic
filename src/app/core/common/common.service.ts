import { Injectable, Component, Inject } from '@angular/core';
import { I18NService } from '@core/i18n/i18n.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { MenuService, TitleService } from '@delon/theme';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';

@Injectable()
export class BasicConfigurationService {
    modal: NzModalService;
    constructor(
        public i18n: I18NService,
        private httpClient: HttpClient,
        private titleService: TitleService,
        private menuService: MenuService) {
    }
    /**
     * 修改当前语言环境下的页面标题后缀
     */
    setTitle() {
        this.getMenuJson().subscribe((data: any) => {
            if (this.i18n.currentLang === 'zh-CN') {
                this.titleService.suffix = data.app.name;
            } else if (this.i18n.currentLang === 'en') {
                this.titleService.suffix = data.app.enName;
            }
            this.menuService.resume();
            this.titleService.setTitle();
        });
    }
    /**
     * 修改当前语言环境下的页面标题前缀
     */
    setTitlePrefix(zhCnName: any, enName: any) {
        if (this.i18n.currentLang === 'zh-CN') {
            this.titleService.prefix = zhCnName;
        } else if (this.i18n.currentLang === 'en') {
            this.titleService.prefix = enName;
        }
        this.menuService.resume();
        this.titleService.setTitle();
    }
    /**
     * 获取菜单json
     */
    getMenuJson() {
        console.log('into getMenuJson');

        return this.httpClient.get('../../../assets/app-data.json');
    }
    /**
     * 返回当前语言环境下[确认删除模态框]参数
     */
    getDeleteOptions() {
        if (this.i18n.currentLang === 'en') {
            return {
                title: 'Confirm!',
                content: 'Are you sure you want to delete it?',
                okText: 'Ok',
                cancelText: 'Cancel',
            };
        } else if (this.i18n.currentLang === 'zh-CN') {
            return {
                title: '请确认!',
                content: '确认要删除吗?',
                okText: '确认',
                cancelText: '取消',
            };
        }
    }
    /**
     * 返回当前语言环境下[终止测试消息通知框]内容
     */
    getStopTestOptions() {
        if (this.i18n.currentLang === 'en') {
            return {
                title: 'Do you want to stop the test?',
                content: 'If the test is stopped, the next question will be answered!',
                okText: 'Ok',
                cancelText: 'Cancel',
            };
        } else if (this.i18n.currentLang === 'zh-CN') {
            return {
                title: '确认要停止测试吗?',
                content: '如若停止测试,下次将重新答题!',
                okText: '确认',
                cancelText: '取消',
            };
        }
    }
    /**
     * 返回当前语言环境下[禁止答题警告框]参数
     */
    getForbiddanceOptions() {
        if (this.i18n.currentLang === 'en') {
            return {
                title: 'Have finished, do not repeat!',
                type: 'error',
                confirmButtonText: 'Ok'
            };
        } else if (this.i18n.currentLang === 'zh-CN') {
            return {
                title: '已完成，请勿重复!',
                type: 'error',
                confirmButtonText: '确认'
            };
        }
    }
    /**
     * 返回当前浏览器语言环境[zh-CN,en]
     */
    getCurrentLanguage() {
        return this.i18n.currentLang;
    }
}
export interface IAnimalTestDto {
    id: number;
    question: string;
    answer_tiger: string;
    answer_peacock: string;
    answer_koala: string;
    answer_owl: string;
    answer_chameleon: string;
}
export class AnimalTest implements IAnimalTestDto {
    id: number;
    question: string;
    answer_tiger: string;
    answer_peacock: string;
    answer_koala: string;
    answer_owl: string;
    answer_chameleon: string;
    constructor(obj?: IAnimalTestDto) {
        if (obj) {
            this.id = obj.id;
            this.question = obj.question;
            this.answer_tiger = obj.answer_tiger;
            this.answer_peacock = obj.answer_peacock;
            this.answer_koala = obj.answer_koala;
            this.answer_owl = obj.answer_owl;
            this.answer_chameleon = obj.answer_chameleon;
        }
    }
}

@Injectable()
export class QuestionService {
    baseURL = 'http://120.78.212.113:81/';
    constructor(
        private httpClient: HttpClient) {
    }
    /**
     * 返回[入学测评]试题集合
     */
    getEntranceTests(): any {
        return this.httpClient.get(this.baseURL + 'api/ChoiceTest');
    }
    /**
     * 返回[性格测试]试题集合,返回的试题类型(动物,色彩,九型)由后台随机生成并记录
     */
    getCharacterTests(): any {
        return this.httpClient.get(this.baseURL + 'api/EnTest/1');
    }
    /**
     * 返回[专业测评]试题
     */
    getProfessionTests(): any {
        return this.httpClient.get(this.baseURL + 'api/EnTest/2');
    }
    /**
     * 返回[专业测评]试题
     */
    getThinkingTests(): any {
        return this.httpClient.get(this.baseURL + 'api/EnTest/3');
    }
    /**
     * 向服务器提交[专业测评]答题数据
     * @param result 结果标签id
     * @param entest_id 测试类型id
     * @param useranswer 用户回答
     */
    sendEntranceTestsResult(result, entest_id, useranswer, choice?, judgment?, completion?, answer?): any {
        const params = new HttpParams()
            .set('result', result)
            .set('entest_id', entest_id)
            .set('useranswer', useranswer)
            .set('choice', choice)
            .set('judgment', judgment)
            .set('completion', completion)
            .set('answer', answer);
        return this.httpClient.post(this.baseURL + 'api/EnTest/Submit', params);
    }
}
@Injectable()
export class TeacherService {
    baseURL = 'http://120.78.212.113:81/';
    constructor(
        private httpClient: HttpClient) {
    }
    /**
     * 添加阶段测试项目答辩题
     */
    updateStageTestProject(id, Project_Name, Project_Detail, startime_at, endtime_at): any {
        const params = new HttpParams()
            .set('Project_Name', Project_Name)
            .set('Project_Detail', Project_Detail)
            .set('startime_at', startime_at)
            .set('endtime_at', endtime_at);
        return this.httpClient.post(this.baseURL + 'api/intest/edit/' + id, params);
    }
    /**
     * 添加阶段测试项目答辩题
     */
    setStageTestProject(id, Project_Name, Project_Detail, startime_at, endtime_at): any {
        const params = new HttpParams()
            .set('Project_Name', Project_Name)
            .set('Project_Detail', Project_Detail)
            .set('startime_at', startime_at)
            .set('endtime_at', endtime_at);
        return this.httpClient.post(this.baseURL + 'api/intest/complete/' + id, params);
    }
    /**
     * 随机生成阶段测评试卷
     */
    getStageTestByRandom(): any {
        return this.httpClient.get(this.baseURL + 'api/intest/generate');
    }
    /**
     * 获得阶段测试信息
     */
    getStageTest(): any {
        return this.httpClient.get(this.baseURL + 'api/intest/index');
    }
    /**
     * 获取教师任课信息(班级、专业)(考勤用)
     */
    getLessonInformation(): any {
        return this.httpClient.get(this.baseURL + 'api/teacher/index');
    }
    /**
     * 根据班级与课程获取已经上过的课程学生出勤记录
     */
    getHistoryAttendanceInfo(classId: any, courseId: any): any {
        const params = new HttpParams()
            .set('classid', classId);
        return this.httpClient.get(this.baseURL + 'api/teacher/showteach/' + courseId, { params });
    }
    /**
     * 根据班级与课程,获取已经上过的课程记录
     */
    getClassRecord(classId: any, courseId: any): any {
        const params = new HttpParams()
            .set('classid', classId)
            .set('courseid', courseId);
        return this.httpClient.get(this.baseURL + 'api/teacher/showteach', { params });
    }
    /**
     * 查询教师任课信息(作业用)
     */
    getClassInfo(): any {
        return this.httpClient.get(this.baseURL + 'api/task/index');
    }
    /**
     * 查看发布的作业列表
     */
    getReleaseTaskList(Teach_id: any): any {
        const params = new HttpParams()
            .set('Teach_id', Teach_id);
        return this.httpClient.post(this.baseURL + 'api/task/showlist', params);
    }
    /**
     * 发布作业
     */
    addHomework(teachId, name, content, startTime, endTime): any {
        const params = new HttpParams()
            .set('Teach_id', teachId)
            .set('Task_Name', name)
            .set('Task_Content', content)
            .set('Task_starttime', startTime)
            .set('Task_Endtime', endTime);
        return this.httpClient.post(this.baseURL + 'api/task/addtask', params);
    }
    /**
     * 修改作业
     */
    updateHomework(recordId, name, content, startTime, endTime): any {
        const params = new HttpParams()
            .set('Task_Name', name)
            .set('Task_Content', content)
            .set('Task_starttime', startTime)
            .set('Task_Endtime', endTime);
        return this.httpClient.post(this.baseURL + 'api/task/edittask/' + recordId, params);
    }
    /**
     * 删除作业
     */
    deleteHomework(recordId): any {
        return this.httpClient.get(this.baseURL + 'api/task/deltask/' + recordId);
    }
    /**
     * 批改作业
     */
    correctHomework(id, score, comment): any {
        const params = new HttpParams()
            .set('Score', score)
            .set('Comment', comment);
        return this.httpClient.post(this.baseURL + 'api/task/showlist/tasking/' + id + '/correct', params);
    }
    /**
     * 查看作业上交情况
     */
    getHomeworkSubmitInfo(id: any): any {
        const params = new HttpParams()
            .set('Task_id', id);
        return this.httpClient.get(this.baseURL + 'api/task/showlist/tasking', { params });
    }
    /**
     * 查看某一条上交记录的作业提交答案
     */
    getHomeworkAnswer(id: any): any {
        return this.httpClient.get(this.baseURL + 'api/task/showlist/tasking/' + id);
    }
    /**
     * 查看教师课表
     */
    getLessonInfo(stage, week): any {
        const params = new HttpParams()
            .set('stage', stage)
            .set('week', week);
        return this.httpClient.post(this.baseURL + 'api/Schedule/show', params);
    }
    /**
     * 删除选举结果
     */
    deleteSelectionResult(id: any): any {
        return this.httpClient.get(this.baseURL + 'api/selection/del/' + id);
    }
    /**
     * 查看投票结果
     */
    getVoteResult(id) {
        return this.httpClient.get(this.baseURL + 'api/selection/index/' + id);
    }
    /**
     * 查看投票内容(包含进行时、未来、过去的记录)
     */
    getVoteContent() {
        return this.httpClient.get(this.baseURL + 'api/selection/index');
    }
    /**
     * 班主任或助教发起评选
     */
    addSelection(MaxVote, Name, StartTime, EndTime): any {
        const params = new HttpParams()
            .set('MaxVote', MaxVote)
            .set('Name', Name)
            .set('StartTime', StartTime)
            .set('EndTime', EndTime);
        return this.httpClient.post(this.baseURL + 'api/selection/add', params);
    }
}
@Injectable()
export class StudentService {
    baseURL = 'http://120.78.212.113:81/';
    constructor(
        private httpClient: HttpClient) {
    }
    /**
     * 检验学生是否已投过票
     */
    hasVoted(id): any {
        return this.httpClient.get(this.baseURL + 'api/vote/isvote/' + id);
    }
    /**
     * 获取可以投票的名单列表
     */
    getVoteList(id): any {
        return this.httpClient.get(this.baseURL + 'api/vote/list/' + id);
    }
    /**
     * 学生行使投票权
     */
    vote(id, students): any {
        const params = new HttpParams()
            .set('students', students);
        return this.httpClient.post(this.baseURL + 'api/vote/voting/' + id, params);
    }
    /**
     * 查看投票内容(包含进行时、未来、过去的记录)
     */
    getVoteContent() {
        return this.httpClient.get(this.baseURL + 'api/vote/index');
    }
    /**
     * 查看投票详情(包含自己的票数)
     */
    getVoteDetail(id) {
        return this.httpClient.get(this.baseURL + 'api/vote/index/' + id);
    }
    /**
     * 学生作业列表
     */
    getHomeworkList(teach_id?): any {
        const params = new HttpParams()
            .set('Teach_id', teach_id);
        return this.httpClient.get(this.baseURL + 'api/tasking/index', { params });
    }
    /**
     * 查看作业内容
     */
    getHomeworkDetails(homeworkId): any {
        return this.httpClient.get(this.baseURL + 'api/tasking/show/' + homeworkId);
    }
    /**
     * 学生提交作业
     */
    submitHomework(id, answer) {
        const params = new HttpParams()
            .set('Task_id', id)
            .set('Answer', answer);
        return this.httpClient.post(this.baseURL + 'api/tasking/add', params);
    }
    /**
     * 查看作业成绩
     */
    getHomeweorkScore(id): any {
        const params = new HttpParams()
            .set('Task_id', id);
        return this.httpClient.get(this.baseURL + 'api/tasking/showMyTask', { params });
    }
}
@Injectable()
export class CommonService {
    baseURL = 'http://120.78.212.113:81/';
    constructor(
        private httpClient: HttpClient) {
    }
    /**
     * 查询班级课表
     */
    getClassLessonInfo(stage, week, classId): any {
        const params = new HttpParams()
            .set('stage', stage)
            .set('week', week)
            .set('classid', classId);
        return this.httpClient.post(this.baseURL + 'api/Schedule/ShowStudent', params);
    }
    /**
     * 课表查询参数
     */
    getLessonParams(): any {
        return this.httpClient.get(this.baseURL + 'api/Schedule/index');
    }
}
@Injectable()
export class EntranceTestService {
    baseURL = 'http://120.78.212.113:81/';
    constructor(
        public http: _HttpClient,
        private httpClient: HttpClient,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }
    /**
     * 返回[入学测评]试题集合
     */
    getEntranceTests(): any {
        const httpOptions = {
            headers: new HttpHeaders({
                'opuser': this.tokenService.get().Noid
            })
        };
        return this.httpClient.get(this.baseURL + 'api/ChoiceTest', httpOptions);
    }
    /**
     * 返回[专业测评]试题
     */
}
interface ItemsResponse {
    results: string[];
}
@Injectable()
export class CharacterTestService {
    baseUrl = '../../../assets/testData/';
    baseURL = 'http://120.78.212.113:81/';
    courses$: Observable<any>;
    constructor(
        public http: _HttpClient,
        private httpClient: HttpClient,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }
    /**
     * 测试接口是否连通
     */
    getData(pageIndex?: number, pageSize?: number) {
        console.warn('into getData()');
        return this.httpClient.get('http://120.78.212.113:81/admin/questype/4');
    }
    /**
     * 返回[性格测试]试题集合,返回的试题类型(动物,色彩,九型)由后台随机生成并记录
     */
    getCharacterTests(): any {
        const httpOptions = {
            headers: new HttpHeaders({
                'opuser': this.tokenService.get().Noid
            })
        };
        return this.httpClient.get(this.baseURL + 'api/EnTest/1', httpOptions);
    }
    /**
     * 返回[动物性格测试法]试题集合(测评)
     */
    getAnimalTests(): any {
        const httpOptions = {
            headers: new HttpHeaders({
                'opuser': this.tokenService.get().Noid
            })
        };
        return this.httpClient.get(this.baseURL + 'api/EnTest/1', httpOptions);
    }
    /**
     * 返回[动物性格测试法]试题集合(维护)
     */
    getAnimalTestsForMaintenance(pageIndex: number, pageSize: number): any {
        const params = new HttpParams()
            .set('page', pageIndex.toString())
            .set('limit', pageSize.toString());
        return this.httpClient.get('http://120.78.212.113:81/admin/questype/4', { params });
    }
    /**
     * 返回[性格色彩测试法]试题集合(测评)
     */
    getColorTests(): any {
        const httpOptions = {
            headers: new HttpHeaders({
                'opuser': this.tokenService.get().Noid
            })
        };
        return this.httpClient.get(this.baseURL + 'api/EnTest/1', httpOptions);
    }
    /**
     * 返回[九型人格测试法]试题集合(测评)
     */
    getNineHouseTests(): any {
        const httpOptions = {
            headers: new HttpHeaders({
                'opuser': this.tokenService.get().Noid
            })
        };
        return this.httpClient.get(this.baseURL + 'api/EnTest/1', httpOptions);
    }
    /**
     * 保存单条[动物性格测试法]试题
     */
    saveAnimalTest(obj: IAnimalTestDto) {
        if (obj.id) {
            console.log('execute edit operation!');
        } else {
            console.log('execute create operation');
        }
    }
}

@Injectable()
export class UserAuthService {
    baseURL = 'http://120.78.212.113:81/';
    constructor(
        public http: _HttpClient,
        private httpClient: HttpClient) {
    }
    /**
     * 登录
     */
    getUserInfo(noId, password) {
        const params = new HttpParams()
            .set('Noid', noId)
            .set('Password', password);
        return this.httpClient.post(this.baseURL + 'api/login', params);
    }
}
