export class Study{
    id!:string;
    name!:string;
    time!:string;

    constructor(id:string, name:string, time:string){
        this.id = id;
        this.name= name;
        this.time= time
    }
}