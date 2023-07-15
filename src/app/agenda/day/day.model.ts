import { Study } from "src/app/study/study.model";

export class Day {
    name!:string;
    studies!:Study[]

    constructor(name:string, studies:Study[]){
        this.name = name;
        this.studies = studies
    }

}