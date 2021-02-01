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
import { SubmissionInfo } from './submissionInfo';
import { RestPrepareJudgementAuditLogEntryAllOf } from './restPrepareJudgementAuditLogEntryAllOf';
import { RestAuditLogEntry } from './restAuditLogEntry';


export interface RestPrepareJudgementAuditLogEntry { 
    type: RestPrepareJudgementAuditLogEntry.TypeEnum;
    id: string;
    timestamp: number;
    validator: string;
    token: string;
    submission: SubmissionInfo;
}
export namespace RestPrepareJudgementAuditLogEntry {
    export type TypeEnum = 'COMPETITION_START' | 'COMPETITION_END' | 'TASK_START' | 'TASK_MODIFIED' | 'TASK_END' | 'SUBMISSION' | 'PREPARE_JUDGEMENT' | 'JUDGEMENT' | 'LOGIN' | 'LOGOUT';
    export const TypeEnum = {
        COMPETITION_START: 'COMPETITION_START' as TypeEnum,
        COMPETITION_END: 'COMPETITION_END' as TypeEnum,
        TASK_START: 'TASK_START' as TypeEnum,
        TASK_MODIFIED: 'TASK_MODIFIED' as TypeEnum,
        TASK_END: 'TASK_END' as TypeEnum,
        SUBMISSION: 'SUBMISSION' as TypeEnum,
        PREPARE_JUDGEMENT: 'PREPARE_JUDGEMENT' as TypeEnum,
        JUDGEMENT: 'JUDGEMENT' as TypeEnum,
        LOGIN: 'LOGIN' as TypeEnum,
        LOGOUT: 'LOGOUT' as TypeEnum
    };
}


