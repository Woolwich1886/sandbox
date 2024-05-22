import { createReducer, on } from "@ngrx/store";
import { Action } from "../utils/type-utils";
import { createSphere, localizedColors } from "./sphere-page.service";
import { AddSphere, Reset, SphereActionType, SwitchColor } from "./sphere.action";
import { SphereColor, SphereModel } from "./sphere.model";
import { SpherePageState } from "./sphere.state";

export const initialState: SpherePageState = {
    spheres: [],
    isRedOn: false,
    isBlueOn: false,
    isGreenOn: false,
    colorCount: {
        red: 0,
        blue: 0,
        green: 0,
        violet: 0,
        black: 0,
    },
    lastRedNumber: undefined,
    log: [],
};

export const spherePageReducer = createReducer(
    initialState,
    on(Reset, reset),
    on(AddSphere, addSphere),
    on(SwitchColor, switchColor),
);

function switchColor(state: SpherePageState, action: Action<SphereActionType.SwitchColor, SphereColor>): SpherePageState {
    switch (action.payload) {
        case 'red':
            return { ...state, isRedOn: !state.isRedOn };
        case 'blue':
            return { ...state, isBlueOn: !state.isBlueOn };
        case 'green':
            return { ...state, isGreenOn: !state.isGreenOn };
        default:
            throw new Error('Unsupported color in reducer');
    }
}

function addSphere(state: SpherePageState, action: Action<SphereActionType.AddSphere, SphereModel>): SpherePageState {
    const sphere = action.payload;
    let newState = { ...state };
    const newColorCount = { ...state.colorCount };
    newState = {
        ...newState,
        spheres: [...newState.spheres, sphere],
        log: [...newState.log, toLogUpdate(sphere)]
    };
    switch (sphere.color) {
        case 'red':
            newColorCount.red++;
            newState = { ...newState, lastRedNumber: sphere.number, };
            break;
        case 'blue':
            newColorCount.blue++;
            if (sphere.number > (newState.lastRedNumber ?? 10)) {
                newColorCount.violet++;
                const violet = createSphere('violet');
                newState = {
                    ...newState,
                    spheres: [...newState.spheres, violet],
                    log: [...newState.log, toLogUpdate(violet)]
                };
            }
            break;
        case 'green': {
            newColorCount.green += 2;
            const anotherGreen = createSphere('green');
            newState = {
                ...newState,
                spheres: [...newState.spheres, anotherGreen],
                log: [...newState.log, `Выпал дополнительный зеленый шар с номером ${anotherGreen.number}`]
            };
            break;
        }
        default:
            throw new Error('Unsupported sphere color in reducer.');
    }
    if (newState.spheres.length > 2) {
        const lastThree = newState.spheres.slice(newState.spheres.length - 3);
        const lastThreeColors = lastThree.map(s => s.color);
        const uniqueColors = Array.from(new Set(lastThreeColors)).length;
        const max = Math.max(...lastThree.map(s => s.number));
        if (uniqueColors < 2) {
            newColorCount.black++;
            const black = createSphere('black', max);
            newState = {
                ...newState,
                spheres: [...newState.spheres, black],
                log: [...newState.log, `Три одинаковых цвета подряд, выпал черный шар с номером ${black.number}`]
            };
        } else if (uniqueColors > 2) {
            newColorCount[`${lastThree[2].color}`]++;
            const other = createSphere(lastThree[2].color, max);
            newState = {
                ...newState,
                spheres: [...newState.spheres, other],
                log: [...newState.log, `Три разных цвета подряд, выпал ${localizedColors[other.color]} шар с номером ${other.number}`]
            };
        }
    }
    newState = { ...newState, colorCount: newColorCount };
    return newState;
}

function reset(): SpherePageState {
    return initialState;
}

function toLogUpdate(sphere: SphereModel): string {
    return `Выпал ${localizedColors[sphere.color]} шар с номером ${sphere.number}`;
}