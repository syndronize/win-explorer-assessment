import { useState } from 'react';
import { FaFolder, FaFolderOpen, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { Folder } from '../types/types';

interface FolderTreeProps {
    folders: Folder[];
    currentFolderId: number | null;
    onSelect: (folderId: number) => void;
    closeFolder: () => void;  // Add this
    currentFolder: Folder | null;  // Add this
}

export default function FolderTree({
    folders,
    currentFolderId,
    onSelect,
    closeFolder,
    currentFolder
}: FolderTreeProps) {
    const [expandedFolders, setExpandedFolders] = useState<Record<number, boolean>>({});

    const toggleFolder = (folderId: number) => {
        setExpandedFolders(prev => ({
            ...prev,
            [folderId]: !prev[folderId]
        }));
    };

    return (
        <div className="p-4">
            {/* Header with folder name and close button */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{currentFolder?.name || 'Folders'}</h2>
                {currentFolder && (
                    <button
                        onClick={closeFolder}
                        className="p-1 text-gray-500 hover:text-gray-700"
                        aria-label="Close folder"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Folder list */}
            <div className="space-y-1">
                {folders.map(folder => (
                    <div
                        key={folder.id}
                        className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 ${currentFolderId === folder.id ? 'bg-blue-100' : ''
                            }`}
                        onClick={() => onSelect(folder.id)}
                    >
                        {folder.children && folder.children.length > 0 ? (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFolder(folder.id);
                                }}
                                className="mr-2 text-gray-500 hover:text-gray-700"
                            >
                                {expandedFolders[folder.id] ? <FaChevronDown size={14} /> : <FaChevronRight size={14} />}
                            </button>
                        ) : (
                            <span className="w-6"></span> // Spacer for alignment
                        )}
                        {currentFolderId === folder.id ? (
                            <FaFolderOpen className="mr-2 text-blue-500" />
                        ) : (
                            <FaFolder className="mr-2 text-gray-500" />
                        )}
                        <span>{folder.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}