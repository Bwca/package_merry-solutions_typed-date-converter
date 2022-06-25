import { CheckTypeofObjectDate } from './models/check-typeof-object-date.model';
import { CheckTypeofPrimitiveDate } from './models/check-typeof-primitive-date.model';
import { JSDateToStringConverter } from './models/js-date-to-string-converter.model';
import { PathDateConverter } from './models/path-date-converter.model';
import { PrimitiveDateType } from './models/primitive-date-type.model';
import { StringToJSDateConverter } from './models/string-to-js-date-converter.model';
import { createPathDateConverter } from './path-date-converter/path-date-converter.factory';

export function dateConverterFactory<ObjectDate, PrimitiveDate extends PrimitiveDateType>(
    converterToJsDate: StringToJSDateConverter<PrimitiveDate, ObjectDate>,
    converterFromJsDate: JSDateToStringConverter<ObjectDate, PrimitiveDate>
): PathDateConverter<ObjectDate, PrimitiveDate>;

export function dateConverterFactory<ObjectDate, PrimitiveDate extends PrimitiveDateType>(
    converterToJsDate: StringToJSDateConverter<PrimitiveDate, ObjectDate>,
    converterFromJsDate: JSDateToStringConverter<ObjectDate, PrimitiveDate>,
    checkTypeofDate: CheckTypeofObjectDate,
    checkTypeofPrimitive: CheckTypeofPrimitiveDate
): PathDateConverter<ObjectDate, PrimitiveDate>;

export function dateConverterFactory<ObjectDate, PrimitiveDate extends PrimitiveDateType>(
    converterToJsDate: StringToJSDateConverter<PrimitiveDate, ObjectDate>,
    converterFromJsDate: JSDateToStringConverter<ObjectDate, PrimitiveDate>,
    checkTypeofDate?: CheckTypeofObjectDate,
    checkTypeofPrimitive?: CheckTypeofPrimitiveDate
): PathDateConverter<ObjectDate, PrimitiveDate> {
    // @ts-ignore
    return createPathDateConverter<PrimitiveDate, ObjectDate>(converterToJsDate, converterFromJsDate);
}
