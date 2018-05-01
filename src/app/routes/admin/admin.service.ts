import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class AdminService {
    baseURL = 'http://120.78.212.113:81/';
    constructor(
        private httpClient: HttpClient
    ) {
    }
    /**
     * 获取用户列表
     * @param role_id 角色id
     * @param Noid 学号
     * @param sort 排序方式
     * @param page 页数
     * @param limit 单页数量
     */
    getUserList(role_id?, Noid?, sort?, page?, limit?): any {
        if (role_id === undefined) {
            role_id = '';
        }
        if (Noid === undefined) {
            Noid = '';
        }
        if (sort === undefined) {
            sort = '';
        } else if (sort === 'descend') {
            sort = 'desc';
        } else if (sort === 'ascend') {
            sort = 'asc';
        }
        if (page === undefined) {
            page = '';
        }
        if (limit === undefined) {
            limit = '';
        }
        return this.httpClient.get(this.baseURL + 'admin/userlist?role_id=' + role_id + '&Noid=' + Noid + '&sort=' + sort + '&page=' + page + '&limit=' + limit + '');
    }
    // 获取班级列表
    getClassList() {
        return this.httpClient.get(this.baseURL + 'admin/userlist/create');
    }
    // 获取角色列表
    getRoleList(sort?, page?, limit?) {
        if (sort === undefined) {
            sort = '';
        } else if (sort === 'descend') {
            sort = 'desc';
        } else if (sort === 'ascend') {
            sort = 'asc';
        }
        if (page === undefined) {
            page = '';
        }
        if (limit === undefined) {
            limit = '';
        }
        return this.httpClient.get(this.baseURL + 'admin/rolelist?sort=' + sort + '&page=' + page + '&limit=' + limit + '');
    }
    // 获取权限列表
    getPermitionList() {
        return this.httpClient.get(this.baseURL + 'admin/permitlist');
    }
    /**
     * 获取角色对应权限列表
     * @param id 角色id
     */
    getRolrPermition(id) {
        return this.httpClient.get(this.baseURL + 'admin/rolelist/authview/' + id);
    }
    /**
     * 新增用户
     * @param noid 学号
     * @param name 姓名
     * @param password 密码
     * @param branch 文理科(1文2理)
     * @param class_id 班级
     */
    addUser(noid, name, password, branch, class_id, role_id) {
        if (branch === null) {
            branch = '';
        }
        if (class_id === null) {
            class_id = '';
        }
        if (role_id === null) {
            role_id = '';
        }
        const params = new HttpParams()
            .set('noid', noid)
            .set('name', name)
            .set('password', password)
            .set('branch', branch)
            .set('class_id', class_id)
            .set('role_id', role_id);
        return this.httpClient.post(this.baseURL + 'admin/userlist/create', params);
    }
    /**
     * 删除用户
     * @param id 学号/工号
     */
    deleteUser(id) {
        return this.httpClient.delete(this.baseURL + 'admin/userlist/delete/' + id);
    }
    /**
     * 更新角色权限
     * @param id 角色id
     * @param permits 权限点数组
     */
    updateRolePermition(id, permits) {
        const params = new HttpParams()
            .set('permits', permits);
        return this.httpClient.put(this.baseURL + 'admin/rolelist/authview/' + id + '/edit', params);
    }
    /**
     * 删除角色
     * @param id 角色id
     */
    deleteRole(id) {
        return this.httpClient.delete(this.baseURL + 'admin/rolelist/delete/' + id);
    }
    /**
     * 添加角色
     * @param name 角色名称
     */
    addRole(name) {
        const params = new HttpParams()
            .set('name', name);
        return this.httpClient.post(this.baseURL + 'admin/rolelist/create', params);
    }
    /**
     * 编辑角色
     * @param id 角色id
     * @param name 角色名称
     */
    updateRole(id, name) {
        const params = new HttpParams()
            .set('name', name);
        return this.httpClient.put(this.baseURL + 'admin/rolelist/edit/' + id, params);
    }
    /**
     * 获取系统日志
     * @param noid 学号/工号
     * @param ip ip地址
     * @param catelog 操作类型
     * @param type 操作者
     * @param page 页码
     * @param limit 单页数量
     */
    getLogs(noid?, ip?, catelog?: 'create' | 'update' | 'delete' | '', type?, page?, limit?) {
        if (noid === undefined) {
            noid = '';
        }
        if (ip === undefined) {
            ip = '';
        }
        if (catelog === undefined) {
            catelog = '';
        }
        if (type === undefined) {
            type = '';
        }
        if (page === undefined) {
            page = '';
        }
        if (limit === undefined) {
            limit = '';
        }
        return this.httpClient.get(this.baseURL + 'admin/loglist?noid=' + noid + '&ip=' + ip + '&catelog=' + catelog + '&type=' + type + '&page=' + page + '&limit=' + limit + '');
    }
    /**
     * 获取阶段规则列表
     */
    getStageRoleList() {
        return this.httpClient.get(this.baseURL + 'admin/testrule');
    }
    /**
     * 编辑阶段规则
     * @param id 测试类别id
     * @param choice_count 选择题数量
     * @param choice_rate 选择题比重
     * @param judge_count 判断题数量
     * @param judge_rate 判断题比重
     * @param completion_count 填空题数量
     * @param completion_rate 填空题比重
     * @param answer_count 简答题数量
     * @param answer_rate 简答题比重
     * @param project_rate 答辩题比重
     */
    updateStageTestRule(id, choice_count, choice_rate, judge_count, judge_rate, completion_count, completion_rate, answer_count, answer_rate, project_rate) {
        const params = new HttpParams()
            .set('choice_count', choice_count)
            .set('choice_rate', choice_rate)
            .set('judge_count', judge_count)
            .set('judge_rate', judge_rate)
            .set('completion_count', completion_count)
            .set('completion_rate', completion_rate)
            .set('answer_count', answer_count)
            .set('answer_rate', answer_rate)
            .set('project_rate', project_rate);
        return this.httpClient.put(this.baseURL + 'admin/testrule/edit/' + id, params);
    }
    /**
     * 获取反馈列表
     * @param id 学号/工号
     */
    getFeedbackList(id?, page?, limit?) {
        if (id === undefined) {
            id = '';
        }
        if (page === undefined) {
            page = '';
        }
        if (limit === undefined) {
            limit = '';
        }
        return this.httpClient.get(this.baseURL + 'admin/feedback?noid=' + id + '&page=' + page + '&limit=' + limit + '');
    }
    /**
     * 获取反馈详细信息
     * @param id 反馈id
     */
    getFeedbackDetail(id) {
        return this.httpClient.get(this.baseURL + 'admin/feedback/' + id);
    }
    /**
     * 获取报告列表
     * @param type 入学报告为1,阶段报告为2,结业报告为3
     * @param page 页码
     * @param limit 单页条数
     */
    getReportList(type, page?, limit?) {
        if (page === undefined) {
            page = '';
        }
        if (limit === undefined) {
            limit = '';
        }
        if (type === 1) {
            return this.httpClient.get(this.baseURL + 'admin/report/entrance/index?page=' + page + '&limit=' + limit + '');
        } else if (type === 2) {
            return this.httpClient.get(this.baseURL + 'admin/report/stage/index?page=' + page + '&limit=' + limit + '');
        }
    }
    /**
     * 获取报告的前置条件
     * @param type 入学报告为1,阶段报告为2,结业报告为3
     */
    getReportPrepare(type) {
        if (type === 1) {
            return this.httpClient.get(this.baseURL + 'admin/report/entrance/where');
        } else if (type === 2) {
            return this.httpClient.get(this.baseURL + 'admin/report/stage/where');
        }
    }
    /**
     * 编辑入学报告内容
     * @param id id
     * @param content 描述
     */
    updateEntranceReport(id, content) {
        const params = new HttpParams()
            .set('content', content);
        return this.httpClient.put(this.baseURL + 'admin/report/entrance/edit/' + id, params);
    }
}
