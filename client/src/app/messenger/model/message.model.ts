import { UserInfo } from "./user-info.model";

export interface Message {
    author: UserInfo;
    content: string;
    sendOn?: Date;
}