import { PropertyStringPath } from 'property-string-path';

import { AmbiguousDate } from '../models/ambiguous-date.model';
import { JSDateToStringConverter } from '../models/js-date-to-string-converter.model';
import { NonAmbiguousDate } from '../models/non-ambiguous-date.model';
import { PathDateConverter } from '../models/path-date-converter.model';
import { PrimitiveDateType } from '../models/primitive-date-type.model';
import { StringToJSDateConverter } from '../models/string-to-js-date-converter.model';

export function createPathDateConverter<PrimitiveDate extends PrimitiveDateType, ObjectDate>(
    converterToJsDate: StringToJSDateConverter<PrimitiveDate, ObjectDate>,
    converterFromJsDate: JSDateToStringConverter<ObjectDate, PrimitiveDate>
): PathDateConverter<PrimitiveDate, ObjectDate> {
    // @ts-ignore
    return function dateConverter<T, TargetDateType extends PrimitiveDate | ObjectDate>(
        item: T,
        arg: PropertyStringPath<T> | Array<PropertyStringPath<T>>,
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
