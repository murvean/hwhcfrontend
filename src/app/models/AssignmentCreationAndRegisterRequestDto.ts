import {User} from './user';
import {AssignmentBase} from './AssignmentBase';

export class AssignmentCreationAndRegisterRequestDto {
  constructor(
    public user: User,
    public assignment: AssignmentBase
  ) {

  }
}
