import { CrudRepository } from "./crud.repository";

export class CrudService{
   constructor(public crudRepo:CrudRepository){
   }

   findOne(id:string){
     return this.crudRepo.findOne(id);
   }

   findAll(){
    return this.crudRepo.findAll()
   }

   create(firstName:string, lastName:string){
    return this.crudRepo.create(firstName,lastName);
   }

}
