import { FaFolder, FaFile } from 'react-icons/fa';
import { Folder, File } from '../types/types';

interface FolderContentProps {
    folders: Folder[];
    files: File[];
    currentFolder: Folder | null;
    onFolderSelect: (folderId: number) => void;
}

export default function FolderContent({
    folders,
    files,
    currentFolder,
    onFolderSelect
}: FolderContentProps) {
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="space-y-4">
            {currentFolder && (
                <h2 className="text-lg font-semibold">{currentFolder.name}</h2>
            )}

            <div className="grid grid-cols-12 gap-4 font-medium text-gray-500 text-sm border-b pb-2">
                <div className="col-span-6">Name</div>
                <div className="col-span-3">Type</div>
                <div className="col-span-3 text-right">Size</div>
            </div>

            {folders.map(folder => (
                <div
                    key={`folder-${folder.id}`}
                    className="grid grid-cols-12 gap-4 items-center py-2 px-2 hover:bg-gray-100 rounded cursor-pointer"
                    onClick={() => onFolderSelect(folder.id)}
                >
                    <div className="col-span-6 flex items-center">
                        <FaFolder className="mr-2 text-yellow-500" />
                        <span>{folder.name}</span>
                    </div>
                    <div className="col-span-3 text-sm text-gray-500">Folder</div>
                    <div className="col-span-3 text-right text-sm text-gray-500">-</div>
                </div>
            ))}

            {files.map(file => (
                <div
                    key={`file-${file.id}`}
                    className="grid grid-cols-12 gap-4 items-center py-2 px-2 hover:bg-gray-100 rounded"
                >
                    <div className="col-span-6 flex items-center">
                        <FaFile className="mr-2 text-blue-500" />
                        <span>{file.name}</span>
                    </div>
                    <div className="col-span-3 text-sm text-gray-500">
                        {file.mime_type}
                    </div>
                    <div className="col-span-3 text-right text-sm text-gray-500">
                        {formatFileSize(file.size)}
                    </div>
                </div>
            ))}
        </div>
    );
}