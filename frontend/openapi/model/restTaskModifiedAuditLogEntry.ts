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
import { RestTaskModifiedAuditLogEntryAllOf } from './restTaskModifiedAuditLogEntryAllOf';
import { RestAuditLogEntry } from './restAuditLogEntry';


export interface RestTaskModifiedAuditLogEntry { 
    type: RestTaskModifiedAuditLogEntry.TypeEnum;
    id: string;
    timestamp: number;
    competition: string;
    taskName: string;
    modification: string;
    api: RestTaskModifiedAuditLogEntry.ApiEnum;
    user?: string;
}
export namespace RestTaskModifiedAuditLogEntry {
    export type TypeEnum = 'COMPETITION_START' | 'COMPETITION_END' | 'TASK_START' | 'TASK_MODIFIED' | 'TASK_END' | 'SUBMISSION' | 'JUDGEMENT' | 'LOGIN' | 'LOGOUT';
    export const TypeEnum = {
        COMPETITIONSTART: 'COMPETITION_START' as TypeEnum,
        COMPETITIONEND: 'COMPETITION_END' as TypeEnum,
        TASKSTART: 'TASK_START' as TypeEnum,
        TASKMODIFIED: 'TASK_MODIFIED' as TypeEnum,
        TASKEND: 'TASK_END' as TypeEnum,
        SUBMISSION: 'SUBMISSION' as TypeEnum,
        JUDGEMENT: 'JUDGEMENT' as TypeEnum,
        LOGIN: 'LOGIN' as TypeEnum,
        LOGOUT: 'LOGOUT' as TypeEnum
    };
    export type ApiEnum = 'REST' | 'CLI' | 'INTERNAL';
    export const ApiEnum = {
        REST: 'REST' as ApiEnum,
        CLI: 'CLI' as ApiEnum,
        INTERNAL: 'INTERNAL' as ApiEnum
    };
}


