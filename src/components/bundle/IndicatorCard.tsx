
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Trash2, BarChart3, Target } from "lucide-react";
import { Indicator } from "@/pages/BundleBuilder";
import { ScoreDataForm } from "./ScoreDataForm";
import { TargetDataForm } from "./TargetDataForm";
import { QuarterlyTabs } from "./QuarterlyTabs";

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
          <div className="space-y-4">
            <ScoreDataForm indicator={indicator} onUpdate={handleUpdate} />
            <QuarterlyTabs indicator={indicator} />
          </div>
        )}

        {indicator.type === 'target' && indicator.targetData && (
          <div className="space-y-4">
            <TargetDataForm indicator={indicator} onUpdate={handleUpdate} />
            <QuarterlyTabs indicator={indicator} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
