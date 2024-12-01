export interface IUser {
  _id?: string;
  email: string;
  name: string;
  image: string;
  agent_id: string;
  is_deleted?: boolean;
}
