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


export interface TemporalPoint { 
    value: number;
    unit: TemporalPoint.UnitEnum;
}
export namespace TemporalPoint {
    export type UnitEnum = 'FRAME_NUMBER' | 'SECONDS' | 'MILLISECONDS';
    export const UnitEnum = {
        FRAME_NUMBER: 'FRAME_NUMBER' as UnitEnum,
        SECONDS: 'SECONDS' as UnitEnum,
        MILLISECONDS: 'MILLISECONDS' as UnitEnum
    };
}


