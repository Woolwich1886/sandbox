import { Action as StoreAction } from "@ngrx/store";

export type Action<T, U> = {
    type: T;
    payload: U,
} & StoreAction;

/**
 * Типизация изменений
 * https://netbasal.com/create-a-typed-version-of-simplechanges-in-angular-451f86593003
*/
type MarkFunctionProperties<T> = {
    // eslint-disable-next-line @typescript-eslint/ban-types
    [Key in keyof T]: T[Key] extends Function ? never : Key;
};

type ExcludeFunctions<T> = Pick<T, MarkFunctionProperties<T>[keyof T]>;

export type NgChanges<T, K = ExcludeFunctions<T>> = {
    [Key in keyof K]: {
        previousValue: K[Key];
        currentValue: K[Key];
        firstChange: boolean;
        isFirstChange(): boolean;
    }
};