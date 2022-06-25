import { CheckTypeofObjectDate } from '../models/check-typeof-object-date.model';
import { CheckTypeofPrimitiveDate } from '../models/check-typeof-primitive-date.model';
import { DeepNonAmbiguousDate } from '../models/deep-non-ambiguous-date.model';
import { JSDateToStringConverter } from '../models/js-date-to-string-converter.model';
import { PrimitiveDateType } from '../models/primitive-date-type.model';
import { RecursiveDateConverter } from '../models/recursive-date-converter.model';
import { StringToJSDateConverter } from '../models/string-to-js-date-converter.model';

export function createRecursiveDateConverter<PrimitiveDate extends PrimitiveDateType, ObjectDate>({
    checkTypeofDate,
    checkTypeofPrimitive,
    converterFromJsDate,
    converterToJsDate,
}: RecursiveDeepDateConverterFactoryPayload<PrimitiveDate, ObjectDate>): RecursiveDateConverter<PrimitiveDate, ObjectDate> {
    return function recursiveDateConverter<T, TargetDateType extends PrimitiveDate | ObjectDate>(
        obj: T
    ): DeepNonAmbiguousDate<T, TargetDateType, ObjectDate, PrimitiveDate> {
        for (const k in obj) {
            if (!Object.prototype.hasOwnProperty.call(obj, k)) {
                continue;
            }

            const value: unknown = obj[k];

            if (Array.isArray(value)) {
                value.map(recursiveDateConverter);
                continue;
            }

            if (typeof value === 'object') {
                if (checkTypeofDate(value)) {
                    // @ts-ignore
                    obj[k] = converterFromJsDate(value);
                    continue;
                }
                // @ts-ignore
                obj[k] = recursiveDateConverter(value);
            }

            if (checkTypeofPrimitive(<PrimitiveDate>value)) {
                // @ts-ignore
                obj[k] = converterToJsDate(value);
            }
        }
        return obj as DeepNonAmbiguousDate<T, TargetDateType, ObjectDate, PrimitiveDate>;
    };
}

interface RecursiveDeepDateConverterFactoryPayload<PrimitiveDate extends PrimitiveDateType, ObjectDate> {
    converterToJsDate: StringToJSDateConverter<PrimitiveDate, ObjectDate>;
    converterFromJsDate: JSDateToStringConverter<ObjectDate, PrimitiveDate>;
    checkTypeofDate: CheckTypeofObjectDate;
    checkTypeofPrimitive: CheckTypeofPrimitiveDate;
}
