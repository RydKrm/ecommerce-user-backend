import { Injectable } from "@nestjs/common";
import { readFile, writeFile } from "fs/promises";

@Injectable()
export class CrudRepository{
    async findOne(id:string){
        const contents = await readFile("users.json",'utf8');
        const messages = JSON.parse(contents);
        return messages[id]
    }

    async findAll(){
        const contents = await readFile("users.json",'utf8');
        const messages = JSON.parse(contents);
        return messages;
    }

    async create(firstName:string,lastName:string){
        const contents = await readFile('users.json','utf8');
        const messages = JSON.parse(contents);
        const id = Math.floor(Math.random()*999);
        messages[id] = {id, firstName, lastName};

        await writeFile('messges.json', JSON.stringify(messages));
    }

}