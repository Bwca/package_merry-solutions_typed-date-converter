import { Book } from '../models/book.model';
import { dateConverter } from './date-converter.function';

describe('Tests for dateConverter', () => {
    let book: Book;

    beforeEach(() => {
        book = getABook();
    });

    it('Should properly convert string date at given path to a Date object', () => {
        // Act
        const convertedBook = dateConverter<Book, Date>('details.published', book, 'date');

        // Assert
        expect(convertedBook.details.published instanceof Date).toBeTruthy();
    });

    it('Should properly convert Date at given path back to string', () => {
        // Arrange
        const aBookWithDate = dateConverter<Book, Date>('details.published', book, 'date');

        // Act
        const stringDateBook = dateConverter<typeof aBookWithDate, string>('details.published', aBookWithDate, 'string');

        // Assert
        expect(typeof stringDateBook.details.published).toEqual('string');
    });

 /*    it('Should preserve null', () => {
        // Act
        const convertedBook = dateConverter<Book, Date | null>('details.published', book, 'string');

        // Assert
        expect(typeof stringDateBook.details.published).toEqual('string');
    }); */
});

function getABook(): Book {
    return {
        details: {
            author: {
                born: '1090-12-12',
                died: null,
                name: 'Bobuka',
            },
            published: '1289-01-30',
            type: 'ebook',
        },
        title: 'All secrets of the universe',
    };
}
