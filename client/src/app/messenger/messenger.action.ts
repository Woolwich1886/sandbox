import { createAction, props } from "@ngrx/store";
import { UserInfo } from "./model/user-info.model";
import { ChatPreviewInfo } from "./model/chat-preview-info.model";
import { Message } from "./model/message.model";

export const SetCurrentUser = createAction('Set current user', (payload: UserInfo) => ({ payload }));
export const SendMessage = createAction('Send message', (payload: string) => ({ payload }));
export const LoadMessage = createAction('Load message', (payload: Message) => ({ payload }));
export const SetMessagesList = createAction('Set messages list', (payload: Message[]) => ({ payload }));
export const SetChatList = createAction('Set chat list', (payload: ChatPreviewInfo[]) => ({ payload }));
export const SelectChat = createAction('Select chat', (payload: number) => ({ payload }));
export const UpdateChatList = createAction('Update chat list', (payload: ChatPreviewInfo) => ({ payload }));
