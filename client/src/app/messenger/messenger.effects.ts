import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MessengerState, selectChatState } from "./messenger.state";
import { Store } from "@ngrx/store";
import { distinctUntilChanged, distinctUntilKeyChanged, filter, map, of, switchMap, take, tap, withLatestFrom } from "rxjs";
import { routerNavigatedAction } from "@ngrx/router-store";
import { ChatService } from "./chat.service";
import { Message } from "./model/message.model";
import { LoadMessage, SendMessage } from "./messenger.action";

@Injectable()
export class MessengerEffects {

    constructor(private actions$: Actions, private store: Store<MessengerState>, private service: ChatService) {

    }

    setCurrentUser$ = createEffect(() => this.actions$.pipe(
        ofType(routerNavigatedAction),
        filter(action => action.payload.event.url.match(/^\/messenger\/user\/\d+\/chat$/) != null),
        map(info => info.payload.routerState.root.firstChild?.params['id']),
        switchMap(id => this.service.getUserChatInfo(id)),
        map(payload => ({ type: 'Set current user', payload }))
    ));

    setChatList$ = createEffect(() => this.store.select(selectChatState).pipe(
        map(info => info.currentUser),
        filter(user => !!user?.id),
        distinctUntilChanged((a, b) => a.id === b.id),
        switchMap(info => this.service.getChatList(info.id)),
        map(payload => ({ type: 'Set chat list', payload }))
    ));

    updateChatList$ = createEffect(() => this.store.select(selectChatState).pipe(
        map(info => info.currentUser),
        filter(user => !!user?.id),
        distinctUntilChanged((a, b) => a.id === b.id),
        switchMap(info => this.service.updateChatList(info.id)),
        map(payload => ({ type: 'Update chat list', payload }))
    ));

    setMessagesList$ = createEffect(() => this.store.select(selectChatState).pipe(
        map(info => info.selectedChatId),
        filter(chatId => !!chatId),
        distinctUntilChanged(),
        switchMap(id => this.service.getMessages(id!)),
        map(payload => ({ type: 'Set messages list', payload }))
    ));

    loadMessage$ = createEffect(() => this.store.select(selectChatState).pipe(
        map(info => info.selectedChatId),
        distinctUntilChanged(),
        switchMap(id => this.service.loadMessage(id!)),
        map(payload => LoadMessage(payload))
    ));

}