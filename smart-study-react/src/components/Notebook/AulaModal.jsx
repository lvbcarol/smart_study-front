import React from "react";

const AulaModal = ({ open, onClose, notebookTitle, setNotebookTitle, onSave }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Create New Notebook</h2>
        <input
          type="text"
          value={notebookTitle}
          onChange={(e) => setNotebookTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
          placeholder="Notebook title"
        />
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-gray-700">Cancel</button>
          <button onClick={onSave} className="bg-[#5e2c82] text-white px-4 py-2 rounded">Create</button>
        </div>
      </div>
    </div>
  );
};

export default AulaModal;
