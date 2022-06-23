import { PropertyStringPath } from 'property-string-path';

import { AmbivalentDate } from '../models/ambivalent-date-type.model';
import { UnAbmibalentDateTypes } from '../models/unambivalent-date-types.model';

// @ts-ignore
export function dateConverter<T, C extends AmbivalentDate>(
    arg: PropertyStringPath<T> | PropertyStringPath<T>[],
    item: T,
    convertTo: C extends Date ? 'date' : 'string'
): UnAbmibalentDateTypes<T, C> {
    // @ts-ignore
    (Array.isArray(arg) ? arg : [arg]).forEach((path) => {
        const pathFragments = path.split('.');
        const value: AmbivalentDate = pathFragments.reduce((a: Record<string, unknown>, b: string) => a[b], item);
        const lastKey = pathFragments.pop();
        let ref: Record<string, unknown> = item as Record<string, unknown>;
        for (const fragment of pathFragments) {
            ref = ref[fragment] as Record<string, unknown>;
        }
        if (value === null) {
            ref[lastKey] = null;
            return;
        }
        ref[lastKey] = convertTo === 'date' ? new Date(value) : (value as unknown as Date).toISOString();
    });

    return item as UnAbmibalentDateTypes<T, C>;
}

type Nullish<T> = T | null;
