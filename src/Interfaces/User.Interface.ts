import { Document } from "mongoose";

export interface IUserModel extends Document {
  username: string;
  password:string;
  email: string;
  authenticateUser(candidatePassword:string,originalPassword:string):Promise<boolean>
}

export interface IUser {
  username: string;
  password:string;
  email: string;
}