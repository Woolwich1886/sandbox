import { createAction } from "@ngrx/store";
import { SphereColor, SphereModel } from "./sphere.model";

export enum SphereActionType {
    SwitchColor = '[Sphere Page] Switch Color',
    Reset = '[Sphere Page] Reset state',
    AddSphere = '[Sphere Page] Add Sphere',
}

export const SwitchColor = createAction(SphereActionType.SwitchColor, (payload: SphereColor) => ({ payload }));
export const Reset = createAction(SphereActionType.Reset);
export const AddSphere = createAction(SphereActionType.AddSphere, (payload: SphereModel) => ({ payload }));
