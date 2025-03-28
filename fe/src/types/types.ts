export interface Folder {
    id: number;
    name: string;
    parentId: number | null;
    children?: Folder[];
}

export interface File {
    id: number;
    name: string;
    path: string;
    folderId: number;
}