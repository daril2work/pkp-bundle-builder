
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Target } from "lucide-react";

interface EmptyStateProps {
  onAddCluster: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onAddCluster }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
      <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
        <Target className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Belum ada indikator
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Belum ada indikator. Klik "Skor" atau "Target" untuk mulai.
      </p>
      <Button
        onClick={onAddCluster}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
      >
        <Plus className="h-4 w-4 mr-2" />
        Tambah Klaster Baru
      </Button>
    </div>
  );
};
