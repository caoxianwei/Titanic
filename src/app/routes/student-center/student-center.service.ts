import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';

@Injectable()
export class StudentCenterService {
    baseURL = 'http://120.78.212.113:81/';
    constructor(
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
        private httpClient: HttpClient
    ) {
    }
    /**
     * 获取入学报告
     */
    getEntranceReport() {
        return this.httpClient.get(this.baseURL + 'api/enreport/' + this.tokenService.get().Noid);
    }
}
