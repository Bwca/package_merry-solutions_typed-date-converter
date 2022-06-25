import { PropertyStringPath } from 'property-string-path';

import { NonAmbiguousDate } from './non-ambiguous-date.model';
import { PrimitiveDateType } from './primitive-date-type.model';

export type PathDateConverter<PrimitiveDate, ObjectDate> = <T, TargetDateType extends PrimitiveDate | ObjectDate>(
    item: T,
    arg: PropertyStringPath<T> | Array<PropertyStringPath<T>>,
    convertTo: TargetDateType extends PrimitiveDateType ? 'primitive' : 'object'
) => NonAmbiguousDate<T, TargetDateType, ObjectDate, PrimitiveDate>;
