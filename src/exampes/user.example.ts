import { dateConverterFactory } from '../date-converter';

interface User {
    registered: string | Date;
    details: {
        birthday: string | Date;
    };
}

const convertToDate = (s: string) => new Date(s);
const convertToString = (s: Date) => s.toISOString();

const dateConverter = dateConverterFactory<Date, string>(convertToDate, convertToString);

const convertedUser = dateConverter<User, Date>(
    ['details.birthday', 'registered'],
    {
        registered: '1970-12-12',
        details: {
            birthday: '1970-12-12',
        },
    },
    'object'
);

convertedUser.registered;
