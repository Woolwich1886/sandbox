import { createReducer, on } from "@ngrx/store";
import { MessengerState } from "./messenger.state";
import { LoadMessage, SelectChat, SendMessage, SetChatList, SetCurrentUser, SetMessagesList, UpdateChatList } from "./messenger.action";
import { UserInfo } from "./model/user-info.model";
import { ChatPreviewInfo } from "./model/chat-preview-info.model";

export const initialState: MessengerState = {
    currentUser: {} as UserInfo,
    selectedChatId: undefined,
    chatList: [],
    messages: [],
};

export const messengerReducer = createReducer(
    initialState,
    on(SetCurrentUser, setCurrentUser),
    on(SendMessage, sendMessage),
    on(LoadMessage, loadMessage),
    on(SetChatList, setChatList),
    on(SelectChat, selectChat),
    on(UpdateChatList, updateChatList),
    on(SetMessagesList, setMessagesList)
);

function setCurrentUser(state: MessengerState, action: any): MessengerState {
    //console.log(action);
    return { ...state, currentUser: action.payload };
}

function setChatList(state: MessengerState, action: any): MessengerState {
    //console.log(action);
    return { ...state, chatList: action.payload };
}

function setMessagesList(state: MessengerState, action: any): MessengerState {
    console.log(action);
    return { ...state, messages: action.payload };
}

function sendMessage(state: MessengerState, action: any): MessengerState {
    return { ...state };
}

function loadMessage(state: MessengerState, action: any): MessengerState {
    console.log(action);
    const newMessages = [...state.messages, action.payload];
    return { ...state, messages: newMessages };
}

function selectChat(state: MessengerState, action: any): MessengerState {
    console.log(action);
    const chatId = Number(action.payload);
    const list = state.chatList.map(info => ({ ...info, isActive: info.id === chatId }));
    console.log('костыль с number()');
    return { ...state, chatList: list, selectedChatId: Number(action.payload) };
}

function updateChatList(state: MessengerState, action: any): MessengerState {
    console.log(action);
    const newList = state.chatList.filter(c => c.id !== action.payload.id);
    const chat: ChatPreviewInfo = { ...action.payload, isActive: state.selectedChatId === action.payload.id };
    newList.unshift(chat);
    return { ...state, chatList: newList };
}