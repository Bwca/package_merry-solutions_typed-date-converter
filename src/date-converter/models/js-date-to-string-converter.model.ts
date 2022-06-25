import { PrimitiveDateType } from './primitive-date-type.model';

// eslint-disable-next-line no-unused-vars
export type JSDateToStringConverter<S, D extends PrimitiveDateType> = (date: S) => D;
