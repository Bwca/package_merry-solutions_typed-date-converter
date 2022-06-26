# Typed Date Converter


## Well, what is it?

It is an attempt to create an approach for converting primitive dates (numbers/strings) into object types (Date, Moment,
etc.) for typescript, without the need to describe them in a separate interface.

For example, you get from api:
```typescript
interface User {
  registered: string;
  name: string;
  lastLoginDate: string | null;
  details: Details;
  activities: Activity[];
}

interface Details {
  birthday: string;
  place: string;
}

interface Activity {
  place: string;
  date: string;
}
```

but in the application you need the convert the `User.registered`, `User.lastLoginDate`, `Details.birthday` and 
`Activity.date` to `Date`. What now? Create a new interface for each of these with this type, or modify existing one for 
using generic? This is the problem this package tries to tackle: convert all dates from one type to another and return a 
new **typed** entity without the need to manually create new interfaces.

## Well, how to use it?

Install with
```bash
npm i @merry-solutions/typed-date-converter
```

Next, the interface used for converting should be turned into a 'super' interface, to include all possible date types, 
this is required for proper converted result typings. So let's add `Date` type to the union of fields we intend to
convert:

```typescript
interface User {
  registered: string | Date;
  name: string;
  lastLoginDate: string | Date | null;
  details: Details;
  activities: Activity[];
}

interface Details {
  birthday: string | Date;
  place: string;
}

interface Activity {
  place: string;
  date: string | Date;
}
```

This is required for proper typing of the output. Now we need some functions for checking and converting the fields:
* to check if the property is primitive fit for conversion to object date;
* to check if object is date which requires conversion into primitive;
* to convert primitive to a date object;
* to convert date object to a primitive.
* 
For the sake of simplicity, let's assume our dates come always in format YYYY-MM-DD. So our functions would look the 
following way:

```typescript
import {
  CheckTypeofObjectDate,
  CheckTypeofPrimitiveDate,
  JSDateToStringConverter,
  StringToJSDateConverter,
  createRecursiveDateConverter,
} from '@merry-solutions/typed-date-converter';

const converterToJsDate: StringToJSDateConverter<string, Date> = (d: string) => new Date(d);
const converterFromJsDate:JSDateToStringConverter<Date, string> = (d: Date) => d.toISOString();
const checkTypeofDate: CheckTypeofObjectDate = (v: unknown) => v instanceof Date;
// if string is YYYY-MM-DD, we assume it is a date string
const checkTypeofPrimitive: CheckTypeofPrimitiveDate = (v: string | number) => typeof v === 'string' && /^\d{4}(-\d{2}){2}$/.test(v);

const deepDateConverter = createRecursiveDateConverter<string, Date>({
  converterToJsDate,
  converterFromJsDate,
  checkTypeofDate,
  checkTypeofPrimitive,
});
```
There, we have a converter ready for usage. Now assuming we have a user
```typescript
const user: User = {
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
```

our conversion would go as following:
```typescript
const convertedUser = deepDateConverter<User, Date>(user);
// now all these fields are Date: mappedUser.registered, mappedUser.details.birthday, mappedUser.activities[0].date
```
To convert back to string dates we could do the same process to the object we received, passing different types:
```typescript
const converteToPrimitiveDatesdUser = deepDateConverter<typeof convertedUser, string>(convertedUser);
// now all these fields are back to string: mappedUser.registered, mappedUser.details.birthday, mappedUser.activities[0].date
```

Don't forget to pass types to the converter, so the IDE knows the correct type.

Simple as that :)