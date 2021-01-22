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
import { RestAuditLogEntry } from './restAuditLogEntry';
import { RestCompetitionEndAuditLogEntryAllOf } from './restCompetitionEndAuditLogEntryAllOf';


export interface RestCompetitionEndAuditLogEntry { 
    type: RestCompetitionEndAuditLogEntry.TypeEnum;
    id: string;
    timestamp: number;
    competition: string;
    api: RestCompetitionEndAuditLogEntry.ApiEnum;
    user?: string;
}
export namespace RestCompetitionEndAuditLogEntry {
    export type TypeEnum = 'COMPETITION_START' | 'COMPETITION_END' | 'TASK_START' | 'TASK_MODIFIED' | 'TASK_END' | 'SUBMISSION' | 'PREPARE_JUDGEMENT' | 'JUDGEMENT' | 'LOGIN' | 'LOGOUT';
    export const TypeEnum = {
        COMPETITIONSTART: 'COMPETITION_START' as TypeEnum,
        COMPETITIONEND: 'COMPETITION_END' as TypeEnum,
        TASKSTART: 'TASK_START' as TypeEnum,
        TASKMODIFIED: 'TASK_MODIFIED' as TypeEnum,
        TASKEND: 'TASK_END' as TypeEnum,
        SUBMISSION: 'SUBMISSION' as TypeEnum,
        PREPAREJUDGEMENT: 'PREPARE_JUDGEMENT' as TypeEnum,
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


