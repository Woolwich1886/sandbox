import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SphereModel } from "./sphere.model";

export const SphereFeature = 'spheres;';

export interface SphereFeatureState {
    spherePageState: SpherePageState;
}

export interface SpherePageState {
    spheres: SphereModel[];
    isRedOn: boolean;
    isBlueOn: boolean;
    isGreenOn: boolean;
    redCount: number;
    blueCount: number;
    greenCount: number;
    violetCount: number;
    whiteCount: number;
    lastRedNumber: number | undefined;
}

export const selectFeatureState = createFeatureSelector<SphereFeatureState>(SphereFeature);

export const selectPageState = createSelector(selectFeatureState, (state: SphereFeatureState) => state.spherePageState);
