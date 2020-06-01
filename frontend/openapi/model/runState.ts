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
import {TaskDescription} from './taskDescription';


export interface RunState { 
    id: number;
    status: RunState.StatusEnum;
    currentTask?: TaskDescription;
    timeLeft: number;
}
export namespace RunState {
    export type StatusEnum = 'CREATED' | 'ACTIVE' | 'PREPARING_TASK' | 'RUNNING_TASK' | 'TASK_ENDED' | 'TERMINATED';
    export const StatusEnum = {
        CREATED: 'CREATED' as StatusEnum,
        ACTIVE: 'ACTIVE' as StatusEnum,
        PREPARINGTASK: 'PREPARING_TASK' as StatusEnum,
        RUNNINGTASK: 'RUNNING_TASK' as StatusEnum,
        TASKENDED: 'TASK_ENDED' as StatusEnum,
        TERMINATED: 'TERMINATED' as StatusEnum
    };
}


