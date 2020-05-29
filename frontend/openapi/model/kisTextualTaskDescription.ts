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
import { KisTextualTaskDescriptionAllOf } from './kisTextualTaskDescriptionAllOf';
import { TaskDescriptionBase } from './taskDescriptionBase';
import { TemporalRange } from './temporalRange';
import { TaskGroup } from './taskGroup';
import { VideoItem } from './videoItem';


export interface KisTextualTaskDescription extends TaskDescriptionBase { 
    uid: string;
    item: VideoItem;
    temporalRange: TemporalRange;
    descriptions: Array<string>;
    delay: number;
}

