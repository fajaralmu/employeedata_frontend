import { Position } from './position';
export class Employee {

    id:number |undefined;
    position:Position|undefined;
    name:string|undefined;
    idNumber:string|undefined;
    gender:number = 1;
    birthDate:Date|undefined;
    
    genderString:string = "";
    birthDateString:string = "";
}
