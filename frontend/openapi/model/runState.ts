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
import { TaskInfo } from './taskInfo';


export interface RunState { 
    id: string;
    status: RunState.StatusEnum;
    currentTask?: TaskInfo;
    timeLeft: number;
}
export namespace RunState {
    export type StatusEnum = 'CREATED' | 'ACTIVE' | 'PREPARING_TASK' | 'RUNNING_TASK' | 'TASK_ENDED' | 'TERMINATED';
    export const StatusEnum = {
        CREATED: 'CREATED' as StatusEnum,
        ACTIVE: 'ACTIVE' as StatusEnum,
        PREPARING_TASK: 'PREPARING_TASK' as StatusEnum,
        RUNNING_TASK: 'RUNNING_TASK' as StatusEnum,
        TASK_ENDED: 'TASK_ENDED' as StatusEnum,
        TERMINATED: 'TERMINATED' as StatusEnum
    };
}


