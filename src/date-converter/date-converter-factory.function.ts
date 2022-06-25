import { PropertyStringPath } from 'property-string-path';

import { AmbiguousDate } from './models/ambiguous-date.model';
import { NonAmbiguousDate } from './models/non-ambiguous-date.model';

export function dateConverterFactory<ObjectDate, PrimitiveDate extends PrimitiveDateType>(
    converterToJsDate: StringToJSDateConverter<PrimitiveDate, ObjectDate>,
    converterFromJsDate: JSDateToStringConverter<ObjectDate, PrimitiveDate>
) {
    return function dateConverter<T, TargetDateType extends PrimitiveDate | ObjectDate>(
        arg: PropertyStringPath<T> | Array<PropertyStringPath<T>>,
        item: T,
        convertTo: TargetDateType extends PrimitiveDateType ? 'primitive' : 'object'
    ): NonAmbiguousDate<T, TargetDateType, ObjectDate, PrimitiveDate> {
        // @ts-ignore
        (Array.isArray(arg) ? arg : [arg]).forEach((path) => {
            // @ts-ignore
            const pathFragments = path.split('.');
            const value: AmbiguousDate<ObjectDate, PrimitiveDate> = pathFragments.reduce(
                (a: Record<string, unknown>, b: string) => a[b],
                item
            );
            const lastKey = pathFragments.pop();
            let ref: Record<string, unknown> = item as Record<string, unknown>;
            for (const fragment of pathFragments) {
                ref = ref[fragment] as Record<string, unknown>;
            }
            if (value === null) {
                ref[lastKey] = null;
                return;
            }
            ref[lastKey] = convertTo === 'primitive' ? converterFromJsDate(<ObjectDate>value) : converterToJsDate(<PrimitiveDate>value);
        });

        return item as NonAmbiguousDate<T, TargetDateType, ObjectDate, PrimitiveDate>;
    };
}

type PrimitiveDateType = string | number;
// eslint-disable-next-line no-unused-vars
type JSDateToStringConverter<S, D extends PrimitiveDateType> = (date: S) => D;
// eslint-disable-next-line no-unused-vars
type StringToJSDateConverter<S extends PrimitiveDateType, D> = (date: S) => D;
