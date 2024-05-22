import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { routerNavigatedAction } from "@ngrx/router-store";
import { Store } from "@ngrx/store";
import { distinctUntilChanged, filter, map, switchMap } from "rxjs";
import { ChatService } from "./chat.service";
import { LoadMessage, SetChatList, SetCurrentUser, SetMessagesList, UpdateChatList } from "./messenger.action";
import { MessengerState, selectCurrentUser, selectSelectedChatId } from "./messenger.state";

@Injectable()
export class MessengerEffects {

    private readonly setCurrentUser$ = createEffect(() => this.actions$.pipe(
        ofType(routerNavigatedAction),
        filter(action => action.payload.event.url.match(/^\/messenger\/user\/\d+\/chat$/) != null),
        map(info => info.payload.routerState.root.firstChild?.firstChild?.params['id']),
        switchMap(id => this.service.getUserChatInfo(id)),
        map(SetCurrentUser),
    ));

    private readonly selectedCurrentUser$ = this.store.select(selectCurrentUser).pipe(
        filter(user => !!user?.id),
        distinctUntilChanged((a, b) => a.id === b.id)
    );

    private readonly selectedChatId$ = this.store.select(selectSelectedChatId).pipe(
        filter(chatId => !!chatId),
        distinctUntilChanged(),
    );

    private readonly setChatList$ = createEffect(() => this.selectedCurrentUser$.pipe(
        switchMap(info => this.service.getChatList(info.id)),
        map(SetChatList),
    ));

    private readonly updateChatList$ = createEffect(() => this.selectedCurrentUser$.pipe(
        switchMap(info => this.service.updateChatList(info.id)),
        map(UpdateChatList),
    ));

    private readonly setMessagesList$ = createEffect(() => this.selectedChatId$.pipe(
        switchMap(id => this.service.getMessages(id!)),
        map(SetMessagesList),
    ));

    private readonly loadMessage$ = createEffect(() => this.selectedChatId$.pipe(
        switchMap(id => this.service.loadMessage(id!)),
        map(LoadMessage),
    ));

    constructor(private actions$: Actions, private store: Store<MessengerState>, private service: ChatService) {
    }

}