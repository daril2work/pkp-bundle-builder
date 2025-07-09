
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Indicator } from "@/pages/BundleBuilder";

interface ScoreDataFormProps {
  indicator: Indicator;
  onUpdate: (updates: Partial<Indicator>) => void;
}

export const ScoreDataForm: React.FC<ScoreDataFormProps> = ({ indicator, onUpdate }) => {
  if (indicator.type !== 'score' || !indicator.scoreData) return null;

  return (
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
            onChange={(e) => onUpdate({
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
  );
};
