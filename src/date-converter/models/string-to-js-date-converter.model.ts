import { PrimitiveDateType } from './primitive-date-type.model';

// eslint-disable-next-line no-unused-vars
export type StringToJSDateConverter<S extends PrimitiveDateType, D> = (date: S) => D;
