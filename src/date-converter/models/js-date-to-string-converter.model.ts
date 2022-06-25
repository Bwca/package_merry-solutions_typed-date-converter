import { PrimitiveDateType } from './primitive-date-type.model';

export type JSDateToStringConverter<S, D extends PrimitiveDateType> = (date: S) => D;
