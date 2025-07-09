
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Indicator } from "@/pages/BundleBuilder";

interface QuarterlyTabsProps {
  indicator: Indicator;
}

export const QuarterlyTabs: React.FC<QuarterlyTabsProps> = ({ indicator }) => {
  const getQuarterlyTarget = () => {
    if (indicator.type !== 'target' || !indicator.targetData) return 0;
    const { targetPercent, sasaran } = indicator.targetData;
    return (targetPercent * sasaran) / 100 / 4;
  };

  const renderScoreQuarter = (quarter: string, index: number) => (
    <TabsContent key={quarter} value={quarter} className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <h4 className="font-medium text-blue-900 mb-2">Sistem Skor (0-10)</h4>
            <p className="text-sm text-blue-800">
              Penilaian berdasarkan kriteria skor yang telah ditetapkan
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skor Aktual
            </label>
            <Input
              type="number"
              placeholder="0"
              min="0"
              max="10"
              className="text-sm"
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Evaluasi Triwulan {index + 1}
            </label>
            <Select>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tercapai">✅ Tercapai</SelectItem>
                <SelectItem value="tidak-tercapai">❌ Tidak Tercapai</SelectItem>
                <SelectItem value="perlu-perhatian">⚠️ Perlu Perhatian</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              RTL (Rencana Tindak Lanjut)
            </label>
            <Textarea
              placeholder="Rencana tindak lanjut untuk triwulan ini..."
              className="min-h-[80px] resize-none text-sm"
            />
          </div>
        </div>
      </div>
    </TabsContent>
  );

  const renderTargetQuarter = (quarter: string, index: number) => (
    <TabsContent key={quarter} value={quarter} className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <h4 className="font-medium text-blue-900 mb-2">Target & Perhitungan</h4>
            <p className="text-sm text-blue-800">
              Target: {getQuarterlyTarget().toFixed(1)} {indicator.targetData?.satuan}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              ({indicator.targetData?.targetPercent}% × {indicator.targetData?.sasaran} ÷ 4)
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Capaian Aktual
            </label>
            <Input
              type="number"
              placeholder="0"
              className="text-sm"
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Evaluasi Triwulan {index + 1}
            </label>
            <Select>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tercapai">✅ Tercapai</SelectItem>
                <SelectItem value="tidak-tercapai">❌ Tidak Tercapai</SelectItem>
                <SelectItem value="perlu-perhatian">⚠️ Perlu Perhatian</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              RTL (Rencana Tindak Lanjut)
            </label>
            <Textarea
              placeholder="Rencana tindak lanjut untuk triwulan ini..."
              className="min-h-[80px] resize-none text-sm"
            />
          </div>
        </div>
      </div>
    </TabsContent>
  );

  return (
    <div className="mt-6">
      <Tabs defaultValue="q1" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="q1">Q1</TabsTrigger>
          <TabsTrigger value="q2">Q2</TabsTrigger>
          <TabsTrigger value="q3">Q3</TabsTrigger>
          <TabsTrigger value="q4">Q4</TabsTrigger>
        </TabsList>
        
        {['q1', 'q2', 'q3', 'q4'].map((quarter, index) => 
          indicator.type === 'score' 
            ? renderScoreQuarter(quarter, index)
            : renderTargetQuarter(quarter, index)
        )}
      </Tabs>
    </div>
  );
};
