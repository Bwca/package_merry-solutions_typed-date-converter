import { AmbiguousDate } from './ambiguous-date.model';

export type DeepNonAmbiguousDate<T, TargetDateType extends AmbiguousDate<ObjectDate, PrimitiveDate>, ObjectDate, PrimitiveDate> = {
    [K in keyof T]: T[K] extends AmbiguousDate<ObjectDate, PrimitiveDate>
        ? T[K] extends NonNullable<ObjectDate | PrimitiveDate>
            ? T[K] extends PrimitiveDate
                ? T[K]
                : TargetDateType
            : TargetDateType | null
        : T[K] extends Array<infer A>
        ? Array<DeepNonAmbiguousDate<A, TargetDateType, ObjectDate, PrimitiveDate>>
        : T[K] extends object
        ? DeepNonAmbiguousDate<T[K], TargetDateType, ObjectDate, PrimitiveDate>
        : T[K];
};
