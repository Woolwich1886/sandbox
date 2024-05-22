export interface SphereModel {
    color: AdvancedSphereColor;
    number: number;
}

export type SphereColor = 'red' | 'blue' | 'green';
export type AdvancedSphereColor = SphereColor | 'black' | 'violet';