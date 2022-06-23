export interface Book {
    title: string;
    details: {
        type: string;
        published: string;
        author: {
            name: string;
            born: string;
            died: string | null;
        };
    };
}
