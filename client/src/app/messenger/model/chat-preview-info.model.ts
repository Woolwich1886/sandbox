import { Message } from "./message.model";
import { UserInfo } from "./user-info.model";

export interface ChatPreviewInfo {
    id: number;
    user: UserInfo;
    lastMessage: Message;
    isActive: boolean;
}