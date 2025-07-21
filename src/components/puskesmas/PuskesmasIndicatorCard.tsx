
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { BarChart3, Target, Save, ChevronDown, ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/components/ui/use-toast";
import { TargetIndicatorForm } from "./TargetIndicatorForm";
import { ScoreIndicatorForm } from "./ScoreIndicatorForm";

interface Indicator {
  id: string;
  name: string;
  type: 'target' | 'score';
  description: string;
  status: string;
  targetData?: {
    unit: string;
    formula: string;
  };
  scoreData?: {
    score0: string;
    score4: string;
    score7: string;
    score10: string;
  };
}

interface PuskesmasIndicatorCardProps {
  indicator: Indicator;
  getStatusBadge: (status: string) => React.ReactNode;
}

export const PuskesmasIndicatorCard: React.FC<PuskesmasIndicatorCardProps> = ({ 
  indicator, 
  getStatusBadge 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast({
      title: "Data Tersimpan",
      description: `Data untuk indikator "${indicator.name}" telah berhasil disimpan.`,
      variant: "default",
    });
  };

  return (
    <Card className={`border-l-4 ${
      indicator.type === 'target' 
        ? 'border-l-purple-500 bg-purple-50/30' 
        : 'border-l-blue-500 bg-blue-50/30'
    } shadow-sm`}>
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-white/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                {indicator.type === 'target' ? (
                  <Target className="h-5 w-5 text-purple-600 shrink-0" />
                ) : (
                  <BarChart3 className="h-5 w-5 text-blue-600 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base font-semibold text-gray-900 truncate">
                    {indicator.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                    {indicator.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {getStatusBadge(indicator.status)}
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0 space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg border">
              <h4 className="font-medium text-gray-900 mb-2">Definisi Operasional:</h4>
              <p className="text-sm text-gray-700">{indicator.description}</p>
              {indicator.targetData?.formula && (
                <div className="mt-2">
                  <span className="text-xs font-medium text-gray-600">Formula: </span>
                  <span className="text-xs text-gray-600">{indicator.targetData.formula}</span>
                </div>
              )}
            </div>

            {indicator.type === 'target' && indicator.targetData && (
              <TargetIndicatorForm 
                indicator={indicator}
                targetData={indicator.targetData}
              />
            )}

            {indicator.type === 'score' && indicator.scoreData && (
              <ScoreIndicatorForm 
                indicator={indicator}
                scoreData={indicator.scoreData}
              />
            )}

            <div className="flex justify-end pt-4 border-t">
              <Button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Menyimpan...' : 'Simpan Data'}
              </Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
