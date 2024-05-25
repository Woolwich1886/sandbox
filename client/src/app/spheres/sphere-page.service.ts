import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  NEVER,
  Observable,
  OperatorFunction,
  Subscription,
  distinctUntilKeyChanged,
  filter,
  interval,
  map,
  merge,
  pipe,
  switchMap,
  tap
} from 'rxjs';
import { SphereHelpDialogComponent } from './sphere-help-dialog/sphere-help-dialog.component';
import { AddSphere, Reset, SwitchColor } from './sphere.action';
import { AdvancedSphereColor, SphereColor, SphereModel } from './model/sphere.model';
import { SphereFeatureState, SpherePageState, selectPageState } from './sphere.state';

const colorMap: Record<SphereColor, 'isRedOn' | 'isBlueOn' | 'isGreenOn'> = {
  'red': 'isRedOn',
  'blue': 'isBlueOn',
  'green': 'isGreenOn'
};

@Injectable()
export class SpherePageService implements OnDestroy {

  private readonly flowSub: Subscription;

  constructor(private store: Store<SphereFeatureState>, private dialog: MatDialog) {
    const state$ = this.getState();
    const redFlow$ = state$.pipe(toSphere('red', 3000, 1));
    const blueFlow$ = state$.pipe(toSphere('blue', 1000, 0.5));
    const greenFlow$ = state$.pipe(toSphere('green', 1000, 0.25));
    const flow$: Observable<SphereModel> = merge(redFlow$, blueFlow$, greenFlow$).pipe(tap(sphere => this.addSphere(sphere)));
    this.flowSub = flow$.subscribe();
  }

  ngOnDestroy(): void {
    this.flowSub.unsubscribe();
    this.reset();
  }

  getSpheres(): Observable<SphereModel[]> {
    return this.getState().pipe(map(s => s.spheres));
  }

  getColorCount(): Observable<Record<AdvancedSphereColor, number>> {
    return this.getState().pipe(map(state => state.colorCount));
  }

  addSphere(sphere: SphereModel): void {
    this.store.dispatch(AddSphere(sphere));
  }

  reset(): void {
    this.store.dispatch(Reset());
  }

  switchColor(color: SphereColor) {
    this.store.dispatch(SwitchColor(color));
  }

  getColorIsOn(color: SphereColor): Observable<boolean> {
    return this.getState().pipe(map(info => info[colorMap[color]]));
  }

  getLog(): Observable<string[]> {
    return this.getState().pipe(map(info => info.log));
  }

  openHelp(): void {
    this.dialog.open(SphereHelpDialogComponent);
  }

  private getState(): Observable<SpherePageState> {
    return this.store.select(selectPageState);
  }
}

function toSphere(color: SphereColor, time: number, probability: number): OperatorFunction<SpherePageState, SphereModel> {
  return pipe(
    distinctUntilKeyChanged(colorMap[color]),
    map(state => state[colorMap[color]]),
    switchMap(isOn => isOn ? interval(time).pipe(filter(() => Math.random() < probability), map(() => createSphere(color))) : NEVER),
  );
}

export function createSphere(color: AdvancedSphereColor, number?: number): SphereModel {
  return { color, number: Math.floor(number ?? (Math.random() * 10 + 1)) };
}

export const localizedColors: Record<AdvancedSphereColor, string> = {
  'red': 'красный',
  'blue': 'синий',
  'green': 'зеленый',
  'violet': 'фиолетовый',
  'black': 'черный'
};
