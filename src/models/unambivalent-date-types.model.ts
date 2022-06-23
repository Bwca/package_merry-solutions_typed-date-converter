import { AmbivalentDate } from './ambivalent-date-type.model';

export type UnAbmibalentDateTypes<T, ConvertAmbivalentDateTo extends AmbivalentDate = Date> = {
    [K in keyof T]: T[K] extends AmbivalentDate ? ConvertAmbivalentDateTo : T[K] extends object ? UnAbmibalentDateTypes<T[K]> : T[K];
};
