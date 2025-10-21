import React from "react";
import FileRow from "./FileRow";

export default function FileTable({ files, selectedFiles, setSelectedFiles, setFiles }) {
  const allSelected = selectedFiles.length === files.length && files.length > 0;

  const toggleSelectAll = () => {
    if (allSelected) setSelectedFiles([]);
    else setSelectedFiles(files.map(f => f.name));
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg transition-all duration-300">
      <table className="w-full text-left">
        <thead>
          <tr className="text-sm border-b border-white/10 text-white-300">
            <th className="py-3 px-4">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleSelectAll}
              />
            </th>
            <th className="py-3 px-4">File Name</th>
            <th className="py-3 px-4">Size (KB)</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {files.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center text-gray-400 py-6">
                No files found
              </td>
            </tr>
          ) : (
            files.map((file, idx) => (
              <FileRow
                key={idx}
                file={file}
                selected={selectedFiles.includes(file.name)}
                setSelectedFiles={setSelectedFiles}
                selectedFiles={selectedFiles}
                setFiles={setFiles}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
