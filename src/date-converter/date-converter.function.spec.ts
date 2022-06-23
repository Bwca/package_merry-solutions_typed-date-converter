import { Book } from '../models/book.model';
import { dateConverterFactory } from './date-converter.function';

describe('Tests for dateConverter', () => {
    let book: Book;
    const convertToDate = (s: string) => new Date(s);
    const convertToString = (s: Date) => s.toISOString();
    const dateConverter = dateConverterFactory<Date, string>(convertToDate, convertToString);

    beforeEach(() => {
        book = getABook();
    });

    it('Should properly convert string date at given path to a Date object', () => {
        // Act
        const convertedBook = dateConverter<Book, Date>('details.published', book);

        // Assert
        expect(convertedBook.details.published instanceof Date).toBeTruthy();
    });

    it('Should properly convert Date at given path back to string', () => {
        // Arrange
        const aBookWithDate = dateConverter<Book, Date>('details.published', book);

        // Act
        const stringDateBook = dateConverter<typeof aBookWithDate, string>('details.published', aBookWithDate);

        // Assert
        expect(typeof stringDateBook.details.published).toEqual('string');
    });

    it('Should not mess with other properties', () => {
        // Act
        const convertedBook = dateConverter<Book, Date>('details.published', book);

        // Assert
        expect(typeof convertedBook.details.author.name).toEqual('string');
    });
});

function getABook(): Book {
    return {
        details: {
            author: {
                born: '1090-12-12',
                died: null,
                name: 'Some important dude',
            },
            published: '1289-01-30',
            type: 'ebook',
        },
        title: 'All secrets of the universe',
    };
}
