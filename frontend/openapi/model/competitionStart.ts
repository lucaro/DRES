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


export interface CompetitionStart { 
    competitionId: number;
    name: string;
    type: CompetitionStart.TypeEnum;
    scoreboards: Array<string>;
}
export namespace CompetitionStart {
    export type TypeEnum = 'LOCAL' | 'DISTRIBUTED';
    export const TypeEnum = {
        LOCAL: 'LOCAL' as TypeEnum,
        DISTRIBUTED: 'DISTRIBUTED' as TypeEnum
    };
}


