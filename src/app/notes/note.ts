export interface Note {
    content?: string | undefined | null;
    created_at?: string | undefined | null;
    id?: string | undefined | null;
    title?: string | undefined | null;
    updated_at?: string | undefined | null;
}

export interface NoteResponse {
    message?: string | undefined | null;
    data?: Note[];
}
