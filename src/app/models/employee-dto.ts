 
import { Employee } from './employee';
import { Position } from './position';

export interface EmployeeDTO {
    positionList:Position[];
    employee:Employee;
}
