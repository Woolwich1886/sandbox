import { createAction, props } from "@ngrx/store";
import { SphereModel } from "./sphere.model";

export class SphereAction {
    static SwitchRed = createAction('[Sphere Page Component] Switch Red');
    static SwitchBlue = createAction('[Sphere Page Component] Switch Blue');
    static SwitchGreen = createAction('[Sphere Page Component] Swithc Green');
    static Reset = createAction('[Sphere Page Component] Reset State');
    static AddSphere = createAction('[Sphere Page Component] Add Sphere', (sphere: SphereModel) => ({ sphere }));
}