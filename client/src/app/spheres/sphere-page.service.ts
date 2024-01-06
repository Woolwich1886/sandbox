import { Injectable, OnDestroy } from '@angular/core';
import { AdvancedSphereColor, SphereColor, SphereModel } from './sphere.model';
import { NEVER, Observable, OperatorFunction, ReplaySubject, Subject, Subscription, combineLatest, connect, distinctUntilChanged, distinctUntilKeyChanged, filter, interval, map, merge, mergeMap, of, pipe, publishReplay, share, shareReplay, switchMap, takeUntil, takeWhile, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { SphereFeatureState, SpherePageState, selectPageState } from './sphere.state';
import { SphereAction } from './sphere.action';

@Injectable()
export class SpherePageService implements OnDestroy {

  private readonly flowSub: Subscription;

  constructor(private store: Store<SphereFeatureState>) {
    const state$ = this.getState();
    const redFlow$ = state$.pipe(toSphere('red', 3000, 1));
    const blueFlow$ = state$.pipe(toSphere('blue', 1200, 0.5));
    const greenFlow$ = state$.pipe(toSphere('green', 1400, 0.25));
    const flow$: Observable<SphereModel> = merge(redFlow$, blueFlow$, greenFlow$).pipe(tap(sphere => this.addSphere(sphere)));
    this.flowSub = flow$.subscribe();
  }

  getSpheres(): Observable<SphereModel[]> {
    return this.getState().pipe(map(s => s.spheres));
  }

  getColorCount(color: AdvancedSphereColor): Observable<number> {
    const value = color + 'Count' as keyof SpherePageState;
    return this.getState().pipe(map(state => state[value])) as Observable<number>;
  }

  ngOnDestroy(): void {
    this.flowSub.unsubscribe();
  }

  addSphere(sphere: SphereModel): void {
    this.store.dispatch(SphereAction.AddSphere(sphere));
  }

  reset(): void {
    this.store.dispatch(SphereAction.Reset());
  }

  switchRed(): void {
    this.store.dispatch(SphereAction.SwitchRed());
  }

  switchBlue(): void {
    this.store.dispatch(SphereAction.SwitchBlue());
  }

  switchGreen(): void {
    this.store.dispatch(SphereAction.SwitchGreen());
  }

  private getState(): Observable<SpherePageState> {
    return this.store.select(selectPageState);
  }
}

function toSphere(color: SphereColor, time: number, probability: number): OperatorFunction<SpherePageState, SphereModel> {
  const values: Record<SphereColor, 'isRedOn' | 'isBlueOn' | 'isGreenOn'> = { 'red': 'isRedOn', 'blue': 'isBlueOn', 'green': 'isGreenOn' };
  return pipe(
    distinctUntilKeyChanged(values[color]),
    map(state => state[values[color]]),
    switchMap(isOn => isOn ? interval(time).pipe(filter(() => Math.random() < probability), map(() => createSphere(color))) : NEVER),
  );
}

export function createSphere(color: AdvancedSphereColor, number?: number): SphereModel {
  return { color, number: Math.floor(number ?? (Math.random() * 10 + 1)) };
}
