/**
 * 
 * DRES API
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Task } from './task';
import { Team } from './team';


export interface Competition { 
    id: number;
    name: string;
    description?: string;
    tasks: Array<Task>;
    teams: Array<Team>;
}

