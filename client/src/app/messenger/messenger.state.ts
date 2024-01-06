import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ChatPreviewInfo } from "./model/chat-preview-info.model";
import { Message } from "./model/message.model";
import { UserInfo } from "./model/user-info.model";

export const MessagerFeature = 'messager';

export interface MessengerFeatureState {
    messengerState: MessengerState;
}

export interface MessengerState {
    currentUser: UserInfo,
    selectedChatId?: number;
    chatList: ChatPreviewInfo[];
    messages: Message[];
}

export const selectFeatureState = createFeatureSelector<MessengerFeatureState>(MessagerFeature);

export const selectChatState = createSelector(selectFeatureState, (state: MessengerFeatureState) => state.messengerState);