import { isValidDate } from 'iso-datestring-validator';

import { PrimitiveDateType } from '../models/primitive-date-type.model';
import { createRecursiveDateConverter } from './recursive-deep-date-converter.factory';

describe('Tests for createRecursiveDateConverter', () => {
    const converterToJsDate = (s: string) => new Date(s);
    const converterFromJsDate = (s: Date) => s.toISOString();
    const checkTypeofDate = (s: unknown) => s instanceof Date;
    const checkTypeofPrimitive = (s: PrimitiveDateType) => typeof s === 'string' && isValidDate(s);

    const converter = createRecursiveDateConverter<string, Date>({
        converterToJsDate,
        converterFromJsDate,
        checkTypeofDate,
        checkTypeofPrimitive,
    });

    let testData: SomeSchedule;

    beforeEach(() => {
        testData = getSomeSchedule();
    });
    describe('Tests for createRecursiveDateConverter: from string to Date', () => {
        it('Should convert data on first layer', () => {
            // Act
            const data = converter<SomeSchedule, Date>(testData);

            // Assert
            expect(data.createdAt instanceof Date).toBeTruthy();
        });

        it('Should convert data on nested layer', () => {
            // Act
            const data = converter<SomeSchedule, Date>(testData);

            // Assert
            expect(data.author.lastLoggedIn instanceof Date).toBeTruthy();
        });

        it('Should convert data inside array', () => {
            // Act
            const data = converter<SomeSchedule, Date>(testData);

            // Assert
            expect(data.events[0].date instanceof Date).toBeTruthy();
        });

        it('Should convert data inside deep nested array', () => {
            // Act
            const data = converter<SomeSchedule, Date>(testData);

            // Assert
            expect(data.events[0].subEvents[0].time instanceof Date).toBeTruthy();
        });
    });

    describe('Tests for createRecursiveDateConverter: from Date to string', () => {
        beforeEach(() => {
            testData = converter(testData);
        });
        it('Should convert data on first layer', () => {
            // Act
            const data = converter<SomeSchedule, string>(testData);

            // Assert
            expect(typeof data.createdAt === 'string').toBeTruthy();
        });

        it('Should convert data on nested layer', () => {
            // Act
            const data = converter<SomeSchedule, string>(testData);

            // Assert
            expect(typeof data.author.lastLoggedIn === 'string').toBeTruthy();
        });

        it('Should convert data inside array', () => {
            // Act
            const data = converter<SomeSchedule, string>(testData);

            // Assert
            expect(typeof data.events[0].date === 'string').toBeTruthy();
        });

        it('Should convert data inside deep nested array', () => {
            // Act
            const data = converter<SomeSchedule, string>(testData);

            // Assert
            expect(typeof data.events[0].subEvents[0].time === 'string').toBeTruthy();
        });
    });
});

function getSomeSchedule(): SomeSchedule {
    return {
        name: 'someName',
        num: 12,
        createdAt: '1991-12-12',
        author: {
            lastLoggedIn: '1991-12-12',
        },
        events: [
            {
                date: '1991-12-12',
                subEvents: [
                    {
                        time: '1991-12-12',
                    },
                ],
            },
        ],
    };
}

interface SomeSchedule {
    name: string;
    num: number;
    createdAt: string | Date;
    author: {
        lastLoggedIn: string | Date;
    };
    events: Array<{
        date: string | Date;
        subEvents: Array<{
            time: string | Date;
        }>;
    }>;
}

describe('README tests', () => {
    let user: User;

    const converterToJsDate = (d: string) => new Date(d);
    const converterFromJsDate = (d: Date) => d.toISOString();
    const checkTypeofDate = (v: unknown) => v instanceof Date;
    const checkTypeofPrimitive = (v: string | number) => typeof v === 'string' && /^\d{4}(-\d{2}){2}$/.test(v);
    const deepDateConverter = createRecursiveDateConverter<string, Date>({
        converterToJsDate,
        converterFromJsDate,
        checkTypeofDate,
        checkTypeofPrimitive,
    });

    beforeEach(() => {
        user = getUser();
    });

    it('Should convert all fields to Date where it is required', () => {
        // Act
        const mappedUser = deepDateConverter<User, Date>(user);

        // Assert
        expect(
            [mappedUser.registered, mappedUser.details.birthday, mappedUser.activities[0].date].every((d) => d instanceof Date)
        ).toBeTruthy();
    });

    it('Should not mess up other strings', () => {
        // Act
        const mappedUser = deepDateConverter<User, Date>(user);

        // Assert
        expect(
            [mappedUser.name, mappedUser.details.place, mappedUser.activities[0].place].every((s) => typeof s === 'string')
        ).toBeTruthy();
    });

    it('Should convert Dates back to strings', () => {
        // Act
        const intermediateUser = deepDateConverter<User, Date>(user);
        const mappedUser = deepDateConverter<typeof intermediateUser, string>(intermediateUser);

        // Assert
        expect(
            [mappedUser.registered, mappedUser.details.birthday, mappedUser.activities[0].date].every((s) => typeof s === 'string')
        ).toBeTruthy();
    });

    it('Should respect null', () => {
        // Act
        const mappedUser = deepDateConverter<User, Date>(user);

        // Assert
        expect(mappedUser.lastLoginDate).toEqual(null);
    });
});

function getUser(): User {
    return {
        registered: '1970-12-12',
        name: 'Bob',
        lastLoginDate: null,
        details: {
            birthday: '1970-12-12',
            place: 'some village',
        },
        activities: [
            {
                date: '1970-12-12',
                place: 'not specified',
            },
        ],
    };
}

interface User {
    registered: string | Date;
    name: string;
    lastLoginDate: string | Date | null;
    details: {
        birthday: string | Date;
        place: string;
    };
    activities: Array<{
        place: string;
        date: string | Date;
    }>;
}
