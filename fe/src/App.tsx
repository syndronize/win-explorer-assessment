import useFileExplorer from './hooks/useFileExplorer';
import FileUploader from './components/FileUploader';
import FolderTree from './components/FolderTree';
import FolderContent from './components/FolderContent';
import { motion } from 'framer-motion';
export default function App() {
    const {
        folders,
        currentFolder,
        contents,
        loading,
        error,
        isFolderOpen,
        fetchFolderContents,
        uploadFile,
        closeFolder
    } = useFileExplorer();
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 border-r border-gray-200 bg-white overflow-y-auto p-4">
                <div
                    className="flex items-center cursor-pointer mb-4"
                    onClick={closeFolder} // Add click handler to close folder
                >
                    <h1 className="text-xl font-bold">File Explorer</h1>
                </div>
                <FolderTree
                    folders={folders}
                    currentFolderId={currentFolder?.id || null}
                    onSelect={fetchFolderContents}
                />
            </div>

            {/* Main Content - Only show when folder is open */}
            {isFolderOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 p-6 overflow-y-auto"
                >
                    <div className="flex-1 p-6 overflow-y-auto">
                        <FileUploader
                            folderId={currentFolder?.id || 0}
                            onUpload={uploadFile}
                        />

                        {loading ? (
                            <div>Loading contents...</div>
                        ) : error ? (
                            <div className="text-red-500">{error}</div>
                        ) : (
                            <FolderContent
                                folders={contents.folders}
                                files={contents.files}
                                currentFolder={currentFolder}
                                onFolderSelect={fetchFolderContents}
                            />
                        )}
                    </div>
                </motion.div>
            )}
        </div>
    );
}