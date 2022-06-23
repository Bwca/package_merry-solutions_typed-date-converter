export interface Book {
  title: string;
  details: Details;
}

type BookType = 'paperback' | 'hardcover' | 'ebook';

interface Details {
  type: BookType;
  published: string;
  author: Author;
}

interface Author {
  name: string;
  born: string;
  died: string | null;
}
