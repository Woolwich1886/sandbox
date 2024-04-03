import { createReducer, on } from "@ngrx/store";
import { createSphere } from "./sphere-page.service";
import { SphereAction } from "./sphere.action";
import { SphereModel } from "./sphere.model";
import { SpherePageState } from "./sphere.state";

export const initialState: SpherePageState = {
    spheres: [],
    isRedOn: false,
    isBlueOn: false,
    isGreenOn: false,
    redCount: 0,
    blueCount: 0,
    greenCount: 0,
    violetCount: 0,
    whiteCount: 0,
    lastRedNumber: undefined,
};

export const spherePageReducer = createReducer(
    initialState,
    on(SphereAction.SwitchRed, switchRed),
    on(SphereAction.SwitchBlue, switchBlue),
    on(SphereAction.SwitchGreen, switchGreen),
    on(SphereAction.Reset, reset),
    on(SphereAction.AddSphere, addSphere),
);

function switchRed(state: SpherePageState): SpherePageState {
    return { ...state, isRedOn: !state.isRedOn };
}

function switchBlue(state: SpherePageState): SpherePageState {
    return { ...state, isBlueOn: !state.isBlueOn };
}

function switchGreen(state: SpherePageState): SpherePageState {
    return { ...state, isGreenOn: !state.isGreenOn };
}

function addSphere(state: SpherePageState, payload: { sphere: SphereModel; }): SpherePageState {
    //TODO: подсчет и добавление сфер по последним трем
    const sphere = payload.sphere;
    let newState = { ...state };
    //newState.lastThree.add(sphere);
    newState.spheres.push(sphere);
    const newList = [...newState.spheres, payload.sphere];
    newState = { ...newState, spheres: newList };
    switch (sphere.color) {
        case "red":
            newState.redCount++;
            newState = { ...newState, lastRedNumber: sphere.number };
            break;
        case "blue":
            newState.blueCount++;
            if (sphere.number > (newState.lastRedNumber ?? 10)) {
                const violet: SphereModel = createSphere('violet');
                newState.violetCount++;
                newState = { ...newState, spheres: [...newState.spheres, violet] };
            }
            break;
        case "green":
            const anotherGreen: SphereModel = createSphere('green');
            newState.greenCount += 2;
            newState = { ...newState, spheres: [...newState.spheres, anotherGreen] };
            break;
        default:
            throw new Error('Unsupported sphere color in reducer.');
    }
    return newState;
}

function reset(state: SpherePageState): SpherePageState {
    return initialState;
}