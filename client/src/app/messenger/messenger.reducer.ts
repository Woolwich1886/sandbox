import { createReducer, on } from "@ngrx/store";
import { Action } from "../utils/type-utils";
import { DeselectChat, LoadMessage, MessengerActionType, SelectChat, SetChatList, SetCurrentUser, SetMessagesList, UpdateChatList } from "./messenger.action";
import { MessengerState } from "./messenger.state";
import { ChatPreviewInfo } from "./model/chat-preview-info.model";
import { Message } from "./model/message.model";
import { UserInfo } from "./model/user-info.model";

export const initialState: MessengerState = {
    currentUser: {} as UserInfo,
    selectedChatId: undefined,
    chatList: [],
    messages: [],
};

export const messengerReducer = createReducer(
    initialState,
    on(SetCurrentUser, setCurrentUser),
    on(LoadMessage, loadMessage),
    on(SetChatList, setChatList),
    on(SelectChat, selectChat),
    on(UpdateChatList, updateChatList),
    on(SetMessagesList, setMessagesList),
    on(DeselectChat, deselectChat),
);

function setCurrentUser(state: MessengerState, action: Action<MessengerActionType.SetCurrentUser, UserInfo>): MessengerState {
    const list = state.chatList.map(info => ({ ...info, isActive: false }));
    return { ...state, currentUser: action.payload, selectedChatId: undefined, chatList: list };
}

function setChatList(state: MessengerState, action: Action<MessengerActionType.SetChatList, ChatPreviewInfo[]>): MessengerState {
    return { ...state, chatList: action.payload };
}

function setMessagesList(state: MessengerState, action: Action<MessengerActionType.SetMessagesList, Message[]>): MessengerState {
    return { ...state, messages: action.payload };
}

function loadMessage(state: MessengerState, action: Action<MessengerActionType.LoadMessage, Message>): MessengerState {
    const newMessages = [...state.messages, action.payload];
    return { ...state, messages: newMessages };
}

function selectChat(state: MessengerState, action: Action<MessengerActionType.SelectChat, number>): MessengerState {
    const chatId = Number(action.payload);
    const list = state.chatList.map(info => ({ ...info, isActive: info.id === chatId }));
    return { ...state, chatList: list, selectedChatId: Number(action.payload) };
}

function updateChatList(state: MessengerState, action: Action<MessengerActionType.UpdateChatList, ChatPreviewInfo>): MessengerState {
    const newList = state.chatList.filter(c => c.id !== action.payload.id);
    const chat: ChatPreviewInfo = { ...action.payload, isActive: state.selectedChatId === action.payload.id };
    newList.unshift(chat);
    return { ...state, chatList: newList };
}

function deselectChat(state: MessengerState): MessengerState {
    const list = state.chatList.map(info => ({ ...info, isActive: false }));
    return { ...state, chatList: list, selectedChatId: undefined };
}