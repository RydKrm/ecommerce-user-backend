export interface IPaginationQUery{
    page?:number,
    limit?:number,
    sortBy?: "asc"|"desc"
}

export interface IReqUser{
    role?:string,
    id?:number
}