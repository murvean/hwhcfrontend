import { User } from "./user";

export class Assignment {
    constructor(
      public owner: User,
      public subject: string,
      public deadlineDate: string,
      public deadlineTime: string,
      
    ){
  
    }
  }