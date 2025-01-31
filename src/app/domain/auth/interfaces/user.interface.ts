import { eUserStatus } from '../enums/user-status.enum';

export interface iUser {
  uid: string;
  user_name: string;
  email: string;
  type: any;
  roles: any[];
  status: eUserStatus;
  providers: string;
  is_active: boolean;
  timestamp: string;
}
