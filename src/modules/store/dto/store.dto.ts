import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class createStoreDto{
    @IsString({message:"Store name must be string"})
    @IsNotEmpty({message:"Shop name required"})
    name:string

    @IsString({message:"Store description must be string"})
    @IsNotEmpty({message:"Shop description required"})
    description:string

    @IsOptional()
    userID:number
}

export class UpdateStoreDto{
    @IsOptional()
    name:string
    @IsOptional()
    description:string
}