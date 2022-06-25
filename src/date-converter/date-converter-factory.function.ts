import { CheckTypeofObjectDate } from './models/check-typeof-object-date.model';
import { CheckTypeofPrimitiveDate } from './models/check-typeof-primitive-date.model';
import { JSDateToStringConverter } from './models/js-date-to-string-converter.model';
import { PathDateConverter } from './models/path-date-converter.model';
import { PrimitiveDateType } from './models/primitive-date-type.model';
import { RecursiveDateConverter } from './models/recursive-date-converter.model';
import { StringToJSDateConverter } from './models/string-to-js-date-converter.model';
import { createPathDateConverter } from './path-date-converter/path-date-converter.factory';
import { createRecursiveDateConverter } from './recursive-deep-date-converter/recursive-deep-date-converter.factory';

export function dateConverterFactory<ObjectDate, PrimitiveDate extends PrimitiveDateType>(
    converterToJsDate: StringToJSDateConverter<PrimitiveDate, ObjectDate>,
    converterFromJsDate: JSDateToStringConverter<ObjectDate, PrimitiveDate>
): PathDateConverter<ObjectDate, PrimitiveDate>;

export function dateConverterFactory<ObjectDate, PrimitiveDate extends PrimitiveDateType>(
    converterToJsDate: StringToJSDateConverter<PrimitiveDate, ObjectDate>,
    converterFromJsDate: JSDateToStringConverter<ObjectDate, PrimitiveDate>,
    checkTypeofDate: CheckTypeofObjectDate,
    checkTypeofPrimitive: CheckTypeofPrimitiveDate
): RecursiveDateConverter<ObjectDate, PrimitiveDate>;

export function dateConverterFactory<ObjectDate, PrimitiveDate extends PrimitiveDateType>(
    converterToJsDate: StringToJSDateConverter<PrimitiveDate, ObjectDate>,
    converterFromJsDate: JSDateToStringConverter<ObjectDate, PrimitiveDate>,
    checkTypeofDate?: CheckTypeofObjectDate,
    checkTypeofPrimitive?: CheckTypeofPrimitiveDate
): PathDateConverter<ObjectDate, PrimitiveDate> | RecursiveDateConverter<ObjectDate, PrimitiveDate> {
    // @ts-ignore
    return checkTypeofDate && checkTypeofPrimitive
        ? createRecursiveDateConverter<PrimitiveDate, ObjectDate>({
              converterToJsDate,
              converterFromJsDate,
              checkTypeofDate,
              checkTypeofPrimitive,
          })
        : createPathDateConverter<PrimitiveDate, ObjectDate>(converterToJsDate, converterFromJsDate);
}
