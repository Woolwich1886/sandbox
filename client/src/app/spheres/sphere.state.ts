import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AdvancedSphereColor, SphereModel } from "./model/sphere.model";

export const SphereFeature = 'spheres;';

export interface SphereFeatureState {
    spherePageState: SpherePageState;
}

export interface SpherePageState {
    spheres: SphereModel[];
    isRedOn: boolean;
    isBlueOn: boolean;
    isGreenOn: boolean;
    colorCount: Record<AdvancedSphereColor, number>;
    lastRedNumber: number | undefined;
    log: string[];
}

export const selectFeatureState = createFeatureSelector<SphereFeatureState>(SphereFeature);

export const selectPageState = createSelector(selectFeatureState, (state: SphereFeatureState) => state.spherePageState);
