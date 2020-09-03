import { User } from "./user";

export class AssignmentBase {
  constructor(
    public owner: User,
    public orderId: string,
    public subject: string,
    public deadlineDate: string,
    public deadlineTime: string,
    public details: string,
    public offer: number
  ) {

  }
}
