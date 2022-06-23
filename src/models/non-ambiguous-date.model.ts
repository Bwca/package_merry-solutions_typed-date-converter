import { AmbiguousDate } from './ambiguous-date.model';

export type NonAmbiguousDate<T, TargetDateType extends AmbiguousDate<ObjectDate, PrimitiveDate>, ObjectDate, PrimitiveDate> = {
    [K in keyof T]: T[K] extends AmbiguousDate<ObjectDate, PrimitiveDate>
        ? T[K] extends NonNullable<AmbiguousDate<ObjectDate, PrimitiveDate>>
            ? TargetDateType
            : TargetDateType | null
        : T[K] extends object
        ? NonAmbiguousDate<T[K], TargetDateType, ObjectDate, PrimitiveDate>
        : T[K];
};
