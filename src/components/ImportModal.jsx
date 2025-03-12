import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { Select } from "@mantine/core";
import { Group, Text, Button, Tooltip, Notification } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";

const ImportModal = ({ onClose }) => {
    const [fileType, setFileType] = useState("csv");
    const [loading, setLoading] = useState(false);
    const [isImporting, setIsImporting] = useState(false);
    const [importProgress, setImportProgress] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [error, setError] = useState("");

    const handleImport = () => {
        setIsImporting(true);

        // Simulate import progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setImportProgress(progress);

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    setIsImporting(false);
                    onClose();
                }, 500);
            }
        }, 300);
    };

    const handleReject = (files) => {
        console.log("Rejected files", files);
        setError("The selected files do not match the selected file type.");
    };

    const handleDrop = (files) => {
        setLoading(true);
        console.log("Accepted files", files);

        // Check file types against selected type
        const allowedMimeTypes = getMimeTypes(fileType);

        // Validate the uploaded files
        const invalidFiles = files.filter((file) => !allowedMimeTypes.includes(file.type));

        if (invalidFiles.length > 0) {
            setError("Some files do not match the selected file type.");
        } else {
            setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
            setError(""); // Reset error if all files are valid
        }

        setTimeout(() => {
            setLoading(false);
            console.log("Files uploaded");
        }, 2000); // Simulating a 2-second upload time
    };

    const handleDeleteFile = (fileToDelete) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((file) => file !== fileToDelete));
    };

    const getMimeTypes = (type) => {
        switch (type) {
            case "html":
                return ["text/html"];
            case "csv":
                return ["text/csv", "application/vnd.ms-excel"];
            case "json":
                return ["application/json"];
            default:
                return [];
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>

            {/* Modal */}
            <div className="flex items-center justify-center min-h-screen p-4">
                <div
                    className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full p-6 relative transform transition-all animate-fade-in"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" aria-label="Close modal">
                        <FiX className="h-5 w-5" />
                    </button>

                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Import Bookmarks</h2>

                    {!isImporting ? (
                        <>
                            <Dropzone
                                onDrop={handleDrop}
                                onReject={handleReject}
                                maxSize={5 * 1024 ** 2}
                                accept={getMimeTypes(fileType).join(", ")}
                                loading={loading}
                                disabled={!fileType}
                            >
                                <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: "none" }}>
                                    <Dropzone.Accept>
                                        <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} />
                                    </Dropzone.Accept>
                                    <Dropzone.Reject>
                                        <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
                                    </Dropzone.Reject>
                                    <Dropzone.Idle>
                                        <IconPhoto size={52} color="var(--mantine-color-dimmed)" stroke={1.5} />
                                    </Dropzone.Idle>

                                    <div>
                                        <Text size="xl" inline>
                                            Drag images here or click to select files
                                        </Text>
                                        <Text size="sm" c="dimmed" inline mt={7}>
                                            Attach as many files as you like, each file should not exceed 5mb
                                        </Text>
                                    </div>
                                </Group>
                            </Dropzone>

                            {/* Error notification */}
                            {error && (
                                <Notification color="red" onClose={() => setError("")}>
                                    {error}
                                </Notification>
                            )}

                            {/* Display selected files */}
                            {selectedFiles.length > 0 && (
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Selected Files</h3>
                                    <div className="mt-2 space-y-2">
                                        {selectedFiles.map((file, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <Text size="sm" className="text-gray-800 dark:text-gray-300">
                                                    {file.name}
                                                </Text>
                                                <Tooltip label="Delete file">
                                                    <button className="text-red-600 hover:text-red-800" onClick={() => handleDeleteFile(file)}>
                                                        <FiX size={16} />
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* File type selection */}
                            <div className="mt-4">
                                <Select
                                    label="File Type"
                                    placeholder="Pick value"
                                    data={[
                                        { value: "html", label: "HTML" },
                                        { value: "csv", label: "CSV" },
                                        { value: "json", label: "JSON" },
                                    ]}
                                    clearable
                                    allowDeselect
                                    searchable
                                    nothingFoundMessage="Nothing found..."
                                    value={fileType}
                                    onChange={setFileType}
                                />
                            </div>

                            {/* Import button */}
                            <div className="mt-6 flex justify-end">
                                <Button variant="outline" onClick={onClose} className="mr-3">
                                    Cancel
                                </Button>
                                <Button onClick={handleImport} disabled={selectedFiles.length === 0}>
                                    Import
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="py-8">
                            <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                    <div>
                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary/10">
                                            {importProgress < 50 ? "Analyzing" : "Processing"}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-semibold inline-block text-primary">{importProgress}%</span>
                                    </div>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/10">
                                    <div
                                        style={{ width: `${importProgress}%` }}
                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500"
                                    ></div>
                                </div>
                                <p className="text-center text-sm text-gray-600 dark:text-gray-400">AI is analyzing your bookmarks...</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImportModal;
