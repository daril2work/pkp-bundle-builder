
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Eye, Save, Plus, Target, Users } from "lucide-react";
import { ClusterCard } from "@/components/bundle/ClusterCard";
import { EmptyState } from "@/components/bundle/EmptyState";
import { toast } from "@/hooks/use-toast";

export interface Indicator {
  id: string;
  name: string;
  description: string;
  type: 'score' | 'target';
  scoreData?: {
    score0: string;
    score4: string;
    score7: string;
    score10: string;
  };
  targetData?: {
    targetPercent: number;
    sasaran: number;
    satuan: string;
    periodisitas: string;
  };
}

export interface Cluster {
  id: string;
  name: string;
  indicators: Indicator[];
}

const BundleBuilder = () => {
  const [year, setYear] = useState<number>(2025);
  const [bundleTitle, setBundleTitle] = useState<string>('Bundle PKP 2025');
  const [clusters, setClusters] = useState<Cluster[]>([]);

  const addNewCluster = () => {
    const newCluster: Cluster = {
      id: `cluster-${Date.now()}`,
      name: 'Klaster Baru',
      indicators: []
    };
    setClusters([...clusters, newCluster]);
  };

  const updateCluster = (clusterId: string, updatedCluster: Cluster) => {
    setClusters(clusters.map(cluster => 
      cluster.id === clusterId ? updatedCluster : cluster
    ));
  };

  const deleteCluster = (clusterId: string) => {
    setClusters(clusters.filter(cluster => cluster.id !== clusterId));
  };

  const handlePreview = () => {
    toast({
      title: "Preview Bundle",
      description: "Menampilkan simulasi bundle seperti yang dilihat Puskesmas",
      duration: 3000,
    });
  };

  const handleSaveBundle = () => {
    toast({
      title: "Bundle Tersimpan",
      description: `Bundle PKP untuk tahun ${year} berhasil disimpan`,
      duration: 3000,
    });
  };

  const handleAssignBundle = () => {
    toast({
      title: "Bundle Berhasil Diassign",
      description: `Bundle ${bundleTitle} telah tersedia untuk semua akun Puskesmas`,
      duration: 3000,
    });
  };

  const totalIndicators = clusters.reduce((total, cluster) => 
    total + cluster.indicators.length, 0
  );

  const isBundleComplete = clusters.length > 0 && totalIndicators > 0 && bundleTitle.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Bundle Builder PKP</h1>
              <p className="text-sm text-gray-600">Penilaian Kinerja Puskesmas</p>
            </div>
          </div>
          
          <div className="flex flex-row gap-4 items-end">
            <div className="flex flex-row gap-4 flex-1">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tahun
                </label>
                <Input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                  className="w-full"
                  min="2020"
                  max="2030"
                />
              </div>
              <div className="flex-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Judul Bundle
                </label>
                <Input
                  type="text"
                  value={bundleTitle}
                  onChange={(e) => setBundleTitle(e.target.value)}
                  className="w-full"
                  placeholder="Masukkan judul bundle..."
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handlePreview}
                className="bg-white hover:bg-gray-50 border-gray-300"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button 
                onClick={handleSaveBundle}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Simpan Bundle
              </Button>
              {isBundleComplete && (
                <Button 
                  onClick={handleAssignBundle}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Assign ke Puskesmas
                </Button>
              )}
            </div>
          </div>
          
          <div className="flex gap-4 mt-4 text-sm text-gray-600">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {clusters.length} Klaster
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
              {totalIndicators} Indikator
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {clusters.length === 0 ? (
          <EmptyState onAddCluster={addNewCluster} />
        ) : (
          <div className="space-y-6">
            {clusters.map((cluster) => (
              <ClusterCard
                key={cluster.id}
                cluster={cluster}
                onUpdate={updateCluster}
                onDelete={deleteCluster}
              />
            ))}
          </div>
        )}
        
        {clusters.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Button
              onClick={addNewCluster}
              variant="outline"
              className="bg-white hover:bg-blue-50 border-blue-200 text-blue-600 hover:text-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Klaster Baru
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BundleBuilder;
