
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Trash2, BarChart3, Target, Info } from "lucide-react";
import { Indicator } from "@/pages/BundleBuilder";

interface IndicatorCardProps {
  indicator: Indicator;
  onUpdate: (indicatorId: string, updatedIndicator: Indicator) => void;
  onDelete: (indicatorId: string) => void;
}

export const IndicatorCard: React.FC<IndicatorCardProps> = ({ 
  indicator, 
  onUpdate, 
  onDelete 
}) => {
  const [localIndicator, setLocalIndicator] = useState(indicator);

  const handleUpdate = (updates: Partial<Indicator>) => {
    const updatedIndicator = { ...localIndicator, ...updates };
    setLocalIndicator(updatedIndicator);
    onUpdate(indicator.id, updatedIndicator);
  };

  const calculateQuarterlyTarget = () => {
    if (!indicator.targetData) return '';
    const { targetPercent, sasaran } = indicator.targetData;
    const quarterlyTarget = (targetPercent * sasaran) / 100 / 4;
    return `Target per triwulan: ${quarterlyTarget.toFixed(1)} unit (${targetPercent}% × ${sasaran} ÷ 4 triwulan)`;
  };

  return (
    <Card className={`border-l-4 ${
      indicator.type === 'score' 
        ? 'border-l-blue-500 bg-blue-50/30' 
        : 'border-l-purple-500 bg-purple-50/30'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {indicator.type === 'score' ? (
              <BarChart3 className="h-5 w-5 text-blue-600" />
            ) : (
              <Target className="h-5 w-5 text-purple-600" />
            )}
            <Input
              value={localIndicator.name}
              onChange={(e) => handleUpdate({ name: e.target.value })}
              className="font-medium border-none bg-transparent p-0 h-auto text-base focus-visible:ring-0"
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(indicator.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 shrink-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Textarea
            placeholder="Definisi operasional indikator"
            value={localIndicator.description}
            onChange={(e) => handleUpdate({ description: e.target.value })}
            className="min-h-[60px] resize-none"
          />
        </div>

        <div className="flex gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name={`type-${indicator.id}`}
              checked={indicator.type === 'score'}
              onChange={() => handleUpdate({ type: 'score' })}
              className="text-blue-600"
            />
            <span>Sistem Skor (0-10)</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name={`type-${indicator.id}`}
              checked={indicator.type === 'target'}
              onChange={() => handleUpdate({ type: 'target' })}
              className="text-purple-600"
            />
            <span>Target & Capaian</span>
          </label>
        </div>

        {indicator.type === 'score' && indicator.scoreData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { key: 'score0', label: 'Skor 0', color: 'bg-red-50 border-red-200' },
              { key: 'score4', label: 'Skor 4', color: 'bg-yellow-50 border-yellow-200' },
              { key: 'score7', label: 'Skor 7', color: 'bg-blue-50 border-blue-200' },
              { key: 'score10', label: 'Skor 10', color: 'bg-green-50 border-green-200' }
            ].map(({ key, label, color }) => (
              <div key={key} className={`p-3 rounded-lg border ${color}`}>
                <label className="block text-sm font-medium mb-2">{label}</label>
                <Textarea
                  value={indicator.scoreData?.[key as keyof typeof indicator.scoreData] || ''}
                  onChange={(e) => handleUpdate({
                    scoreData: {
                      ...indicator.scoreData!,
                      [key]: e.target.value
                    }
                  })}
                  className="min-h-[80px] resize-none text-sm"
                  placeholder={`Keterangan untuk ${label.toLowerCase()}...`}
                />
              </div>
            ))}
          </div>
        )}

        {indicator.type === 'target' && indicator.targetData && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Target (%)</label>
                <Input
                  type="number"
                  value={indicator.targetData.targetPercent}
                  onChange={(e) => handleUpdate({
                    targetData: {
                      ...indicator.targetData!,
                      targetPercent: parseInt(e.target.value) || 0
                    }
                  })}
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Total Sasaran</label>
                <Input
                  type="number"
                  value={indicator.targetData.sasaran}
                  onChange={(e) => handleUpdate({
                    targetData: {
                      ...indicator.targetData!,
                      sasaran: parseInt(e.target.value) || 0
                    }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Satuan</label>
                <Input
                  value={indicator.targetData.satuan}
                  onChange={(e) => handleUpdate({
                    targetData: {
                      ...indicator.targetData!,
                      satuan: e.target.value
                    }
                  })}
                  placeholder="unit"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Periodisitas</label>
                <Select
                  value={indicator.targetData.periodisitas}
                  onValueChange={(value) => handleUpdate({
                    targetData: {
                      ...indicator.targetData!,
                      periodisitas: value
                    }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tahunan (Akumulatif)">Tahunan (Akumulatif)</SelectItem>
                    <SelectItem value="Triwulanan">Triwulanan</SelectItem>
                    <SelectItem value="Bulanan">Bulanan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {indicator.targetData.periodisitas === 'Tahunan (Akumulatif)' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                  <div className="text-sm text-blue-800">
                    <strong>Target Tahunan (Akumulatif):</strong><br />
                    {calculateQuarterlyTarget()}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <p className="text-sm text-gray-700">
                <strong>Preview Perhitungan:</strong><br />
                Target per triwulan: {((indicator.targetData.targetPercent * indicator.targetData.sasaran) / 100 / 4).toFixed(1)} {indicator.targetData.satuan} ÷ 4 triwulan
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
