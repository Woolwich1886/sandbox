import { createAction } from "@ngrx/store";
import { ChatPreviewInfo } from "./model/chat-preview-info.model";
import { Message } from "./model/message.model";
import { UserInfo } from "./model/user-info.model";

export enum MessengerActionType {
    SetCurrentUser = '[Messenger Page] Set current user',
    SendMessage = '[Messenger Page] Send message',
    LoadMessage = '[Messenger Page] Load message',
    SetMessagesList = '[Messenger Page] Set messages list',
    SetChatList = '[Messenger Page] Set chat list',
    SelectChat = '[Messenger Page] Select chat',
    UpdateChatList = '[Messenger Page] Update chat list',
}

export const SetCurrentUser = createAction(MessengerActionType.SetCurrentUser, (payload: UserInfo) => ({ payload }));
export const SendMessage = createAction(MessengerActionType.SendMessage, (payload: string) => ({ payload }));
export const LoadMessage = createAction(MessengerActionType.LoadMessage, (payload: Message) => ({ payload }));
export const SetMessagesList = createAction(MessengerActionType.SetMessagesList, (payload: Message[]) => ({ payload }));
export const SetChatList = createAction(MessengerActionType.SetChatList, (payload: ChatPreviewInfo[]) => ({ payload }));
export const SelectChat = createAction(MessengerActionType.SelectChat, (payload: number) => ({ payload }));
export const UpdateChatList = createAction(MessengerActionType.UpdateChatList, (payload: ChatPreviewInfo) => ({ payload }));

