import { PrimitiveDateType } from './primitive-date-type.model';

export type StringToJSDateConverter<S extends PrimitiveDateType, D> = (date: S) => D;
