import { useState } from 'react';

interface FileUploaderProps {
    folderId: number;
    onUpload: (folderId: number, file: Blob | File, name?: string) => Promise<void>;
}


export default function FileUploader({ folderId, onUpload }: FileUploaderProps) {
    const [file, setFile] = useState<File | null>(null);
    const [customName, setCustomName] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setIsUploading(true);
        try {
            await onUpload(folderId, file, customName || undefined);
            setFile(null);
            setCustomName('');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="p-4 border rounded-lg bg-gray-50 mb-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select File
                    </label>
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Custom Name (optional)
                    </label>
                    <input
                        type="text"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Leave blank to use original filename"
                    />
                </div>

                <button
                    type="submit"
                    disabled={!file || isUploading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md
            hover:bg-blue-700 disabled:bg-blue-300
            disabled:cursor-not-allowed"
                >
                    {isUploading ? 'Uploading...' : 'Upload File'}
                </button>
            </form>
        </div>
    );
}