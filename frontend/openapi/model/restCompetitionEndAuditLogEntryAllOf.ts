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


export interface RestCompetitionEndAuditLogEntryAllOf { 
    competition?: string;
    api?: RestCompetitionEndAuditLogEntryAllOf.ApiEnum;
    user?: string;
}
export namespace RestCompetitionEndAuditLogEntryAllOf {
    export type ApiEnum = 'REST' | 'CLI' | 'INTERNAL';
    export const ApiEnum = {
        REST: 'REST' as ApiEnum,
        CLI: 'CLI' as ApiEnum,
        INTERNAL: 'INTERNAL' as ApiEnum
    };
}


