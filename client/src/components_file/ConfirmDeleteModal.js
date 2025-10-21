import React from "react";
import { motion } from "framer-motion";

export default function ConfirmDeleteModal({ count, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 w-96 text-center text-white shadow-xl"
      >
        <h2 className="text-lg font-semibold mb-3">Confirm Delete</h2>
        <p className="text-gray-300 mb-5">
          Are you sure you want to delete <b>{count}</b> file{count > 1 ? "s" : ""}?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500/60 rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}
