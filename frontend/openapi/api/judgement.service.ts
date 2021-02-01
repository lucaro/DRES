/**
 * DRES API
 * API for DRES (Distributed Retrieval Evaluation Server), Version 1.0
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

import { ErrorStatus } from '../model/models';
import { Judgement } from '../model/models';
import { JudgementRequest } from '../model/models';
import { JudgementValidatorStatus } from '../model/models';
import { JudgementVote } from '../model/models';
import { SuccessStatus } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';



@Injectable({
  providedIn: 'root'
})
export class JudgementService {

    protected basePath = 'http://localhost';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }


    private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
        if (value == null) {
            return httpParams;
        }

        if (typeof value === "object") {
            if (Array.isArray(value)) {
                (value as any[]).forEach( elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            } else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key,
                        (value as Date).toISOString().substr(0, 10));
                } else {
                   throw Error("key may not be null if value is Date");
                }
            } else {
                Object.keys(value).forEach( k => httpParams = this.addToHttpParamsRecursive(
                    httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }

    /**
     * Gets the next open Submission to be judged.
     * @param runId Run ID
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getApiRunWithRunidJudgeNext(runId: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<JudgementRequest>;
    public getApiRunWithRunidJudgeNext(runId: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<JudgementRequest>>;
    public getApiRunWithRunidJudgeNext(runId: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<JudgementRequest>>;
    public getApiRunWithRunidJudgeNext(runId: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        if (runId === null || runId === undefined) {
            throw new Error('Required parameter runId was null or undefined when calling getApiRunWithRunidJudgeNext.');
        }

        let headers = this.defaultHeaders;

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.get<JudgementRequest>(`${this.configuration.basePath}/api/run/${encodeURIComponent(String(runId))}/judge/next`,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Gets the status of all judgement validators.
     * @param runId Run ID
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getApiRunWithRunidJudgeStatus(runId: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<Array<JudgementValidatorStatus>>;
    public getApiRunWithRunidJudgeStatus(runId: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<Array<JudgementValidatorStatus>>>;
    public getApiRunWithRunidJudgeStatus(runId: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<Array<JudgementValidatorStatus>>>;
    public getApiRunWithRunidJudgeStatus(runId: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        if (runId === null || runId === undefined) {
            throw new Error('Required parameter runId was null or undefined when calling getApiRunWithRunidJudgeStatus.');
        }

        let headers = this.defaultHeaders;

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.get<Array<JudgementValidatorStatus>>(`${this.configuration.basePath}/api/run/${encodeURIComponent(String(runId))}/judge/status`,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Gets the next open Submission to voted on.
     * @param runId Run ID
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getApiRunWithRunidVoteNext(runId: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<JudgementRequest>;
    public getApiRunWithRunidVoteNext(runId: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<JudgementRequest>>;
    public getApiRunWithRunidVoteNext(runId: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<JudgementRequest>>;
    public getApiRunWithRunidVoteNext(runId: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        if (runId === null || runId === undefined) {
            throw new Error('Required parameter runId was null or undefined when calling getApiRunWithRunidVoteNext.');
        }

        let headers = this.defaultHeaders;

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.get<JudgementRequest>(`${this.configuration.basePath}/api/run/${encodeURIComponent(String(runId))}/vote/next`,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Returns a Judgement.
     * @param runId Run ID
     * @param judgement 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public postApiRunWithRunidJudge(runId: string, judgement?: Judgement, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<SuccessStatus>;
    public postApiRunWithRunidJudge(runId: string, judgement?: Judgement, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<SuccessStatus>>;
    public postApiRunWithRunidJudge(runId: string, judgement?: Judgement, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<SuccessStatus>>;
    public postApiRunWithRunidJudge(runId: string, judgement?: Judgement, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        if (runId === null || runId === undefined) {
            throw new Error('Required parameter runId was null or undefined when calling postApiRunWithRunidJudge.');
        }

        let headers = this.defaultHeaders;

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.post<SuccessStatus>(`${this.configuration.basePath}/api/run/${encodeURIComponent(String(runId))}/judge`,
            judgement,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Returns a Vote.
     * @param runId Run ID
     * @param judgementVote 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public postApiRunWithRunidJudgeVote(runId: string, judgementVote?: JudgementVote, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<SuccessStatus>;
    public postApiRunWithRunidJudgeVote(runId: string, judgementVote?: JudgementVote, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<SuccessStatus>>;
    public postApiRunWithRunidJudgeVote(runId: string, judgementVote?: JudgementVote, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<SuccessStatus>>;
    public postApiRunWithRunidJudgeVote(runId: string, judgementVote?: JudgementVote, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        if (runId === null || runId === undefined) {
            throw new Error('Required parameter runId was null or undefined when calling postApiRunWithRunidJudgeVote.');
        }

        let headers = this.defaultHeaders;

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.post<SuccessStatus>(`${this.configuration.basePath}/api/run/${encodeURIComponent(String(runId))}/judge/vote`,
            judgementVote,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
