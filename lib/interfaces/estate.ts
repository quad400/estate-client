import { IAgent } from "./agent";
import { IUser } from "./user";

export interface IEstate {
  _id: string;
  title: string;
  images: string[];
  price: number;
  location: string;
  category: string;
  details?: string;
  ratings: number;
  agent: IAgent;
}

export interface IFeedbacks {
  _id: string;
  user: IUser;
  rate: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}
