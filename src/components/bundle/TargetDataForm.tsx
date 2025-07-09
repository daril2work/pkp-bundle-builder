
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info } from "lucide-react";
import { Indicator } from "@/pages/BundleBuilder";

interface TargetDataFormProps {
  indicator: Indicator;
  onUpdate: (updates: Partial<Indicator>) => void;
}

export const TargetDataForm: React.FC<TargetDataFormProps> = ({ indicator, onUpdate }) => {
  if (indicator.type !== 'target' || !indicator.targetData) return null;

  const calculateQuarterlyTarget = () => {
    const { targetPercent, sasaran } = indicator.targetData!;
    const quarterlyTarget = (targetPercent * sasaran) / 100 / 4;
    return `Target per triwulan: ${quarterlyTarget.toFixed(1)} unit (${targetPercent}% × ${sasaran} ÷ 4 triwulan)`;
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Target (%)</label>
          <Input
            type="number"
            value={indicator.targetData.targetPercent}
            onChange={(e) => onUpdate({
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
            onChange={(e) => onUpdate({
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
            onChange={(e) => onUpdate({
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
            onValueChange={(value) => onUpdate({
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
  );
};
