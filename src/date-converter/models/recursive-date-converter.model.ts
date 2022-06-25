import { DeepNonAmbiguousDate } from './deep-non-ambiguous-date.model';

export type RecursiveDateConverter<PrimitiveDate, ObjectDate> = <T, TargetDateType extends PrimitiveDate | ObjectDate>(
    obj: T
) => DeepNonAmbiguousDate<T, TargetDateType, ObjectDate, PrimitiveDate>;
