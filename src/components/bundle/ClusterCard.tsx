
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Edit3, Plus, Trash2, Target, BarChart3 } from "lucide-react";
import { Cluster, Indicator } from "@/pages/BundleBuilder";
import { IndicatorCard } from "./IndicatorCard";

interface ClusterCardProps {
  cluster: Cluster;
  onUpdate: (clusterId: string, updatedCluster: Cluster) => void;
  onDelete: (clusterId: string) => void;
}

export const ClusterCard: React.FC<ClusterCardProps> = ({ cluster, onUpdate, onDelete }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(cluster.name);

  const handleNameSave = () => {
    onUpdate(cluster.id, { ...cluster, name: tempName });
    setIsEditingName(false);
  };

  const addIndicator = (type: 'score' | 'target') => {
    const newIndicator: Indicator = {
      id: `indicator-${Date.now()}`,
      name: type === 'score' ? 'Indikator Baru' : 'Indikator Target Baru',
      description: type === 'score' ? 'Definisi operasional indikator' : 'Definisi operasional indikator target',
      type,
      ...(type === 'score' ? {
        scoreData: {
          score0: 'Tidak memenuhi kriteria',
          score4: 'Memenuhi sebagian kecil kriteria',
          score7: 'Memenuhi sebagian besar kriteria',
          score10: 'Memenuhi seluruh kriteria'
        }
      } : {
        targetData: {
          targetPercent: 80,
          sasaran: 100,
          satuan: 'unit',
          periodisitas: 'Tahunan (Akumulatif)'
        }
      })
    };

    onUpdate(cluster.id, {
      ...cluster,
      indicators: [...cluster.indicators, newIndicator]
    });
  };

  const updateIndicator = (indicatorId: string, updatedIndicator: Indicator) => {
    onUpdate(cluster.id, {
      ...cluster,
      indicators: cluster.indicators.map(ind => 
        ind.id === indicatorId ? updatedIndicator : ind
      )
    });
  };

  const deleteIndicator = (indicatorId: string) => {
    onUpdate(cluster.id, {
      ...cluster,
      indicators: cluster.indicators.filter(ind => ind.id !== indicatorId)
    });
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            {isEditingName ? (
              <div className="flex items-center gap-2 flex-1">
                <Input
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleNameSave()}
                  autoFocus
                />
                <Button size="sm" onClick={handleNameSave}>
                  Simpan
                </Button>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-gray-900">{cluster.name}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingName(true)}
                  className="text-gray-500 hover:text-gray-700 p-1"
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded-full">
              {cluster.indicators.length} indikator
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => addIndicator('score')}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <BarChart3 className="h-4 w-4 mr-1" />
              Skor
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => addIndicator('target')}
              className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
            >
              <Target className="h-4 w-4 mr-1" />
              Target
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(cluster.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {cluster.indicators.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Target className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Belum ada indikator. Klik "Skor" atau "Target" untuk mulai.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cluster.indicators.map((indicator) => (
              <IndicatorCard
                key={indicator.id}
                indicator={indicator}
                onUpdate={updateIndicator}
                onDelete={deleteIndicator}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
