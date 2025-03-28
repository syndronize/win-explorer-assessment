import { useState, useEffect } from 'react';
import api from '../api/client';
import { Folder, File } from '../types/types';

export default function useFileExplorer() {
    const [isFolderOpen, setIsFolderOpen] = useState(false);

    const [folders, setFolders] = useState<Folder[]>([]);
    const [currentFolder, setCurrentFolder] = useState<Folder | null>(null);
    const [contents, setContents] = useState<{
        folders: Folder[];
        files: File[];
    }>({ folders: [], files: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchFolders = async () => {
        try {
            const response = await api.get<Folder[]>('/folders');
            if (response.status === 200) {
                setFolders(response.data);
            }
        } catch (err) {
            console.error('Failed to load folders:', err);
            setError('Failed to load folder structure');
        }
    };



    const uploadFile = async (folderId: number, file: Blob | File, name?: string) => {
        const formData = new FormData();
        formData.append('file', file as Blob); // Explicitly cast to Blob
        formData.append('folder_id', folderId.toString());
        if (name) formData.append('name', name);

        try {
            setLoading(true);
            await api.post('/files', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            fetchFolderContents(folderId); // Refresh contents
        } catch (err) {
            setError('Failed to upload file');
        } finally {
            setLoading(false);
        }
    };

    const fetchFolderContents = async (folderId: number) => {
        try {
            setIsFolderOpen(true);
            setLoading(true);
            const response = await api.get(`/folders/${folderId}/contents`);
            setCurrentFolder(response.data.current);
            setContents(response.data.contents);
            return response.data;
        } catch (error) {
            console.error('Error loading folder contents:', error);
            setError('Failed to load folder contents');
            throw error;
        } finally {
            setLoading(false);
        }
    };
    const closeFolder = () => {
        setIsFolderOpen(false);
        setCurrentFolder(null);
        setContents({ folders: [], files: [] });
    };

    useEffect(() => {
        fetchFolders();
    }, []);

    return {
        folders,
        currentFolder,
        contents,
        loading,
        error,
        fetchFolderContents,
        uploadFile,
        isFolderOpen,
        closeFolder
    };
}