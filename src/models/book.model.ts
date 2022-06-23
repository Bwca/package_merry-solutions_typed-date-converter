export interface Book {
    title: string;
    details: {
        type: string;
        published: Date | string;
        author: {
            name: string;
            born: Date | string;
            died: Date | string | null;
        };
    };
}
