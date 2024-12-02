import { IUser } from "./user";

export interface IFeedback {
  rate: number;
  comment: string;
  user: IUser;
  updatedAt: Date;
}
