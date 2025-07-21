import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TargetData {
  unit: string;
  formula: string;
}

interface Indicator {
  id: string;
  name: string;
}

interface TargetIndicatorFormProps {
  indicator: Indicator;
  targetData: TargetData;
}

export const TargetIndicatorForm: React.FC<TargetIndicatorFormProps> = ({ indicator, targetData }) => {
  // In a real app, you'd use state management (e.g., useState, useForm)
  // to handle form values and calculations.
  const target = 1500; // mock value
  const achievement = 1250; // mock value
  const result = ((achievement / target) * 100).toFixed(2);

  return (
    <Card className="bg-white border-gray-200">
      <CardHeader>
        <CardTitle className="text-base font-medium text-gray-800">Input Data: {indicator.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="space-y-2">
            <Label htmlFor={`target-${indicator.id}`}>Sasaran</Label>
            <Input id={`target-${indicator.id}`} type="number" placeholder="e.g., 1500" defaultValue={target} />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`achievement-${indicator.id}`}>Pencapaian</Label>
            <Input id={`achievement-${indicator.id}`} type="number" placeholder="e.g., 1250" defaultValue={achievement} />
          </div>
          <div className="space-y-2">
            <Label>Hasil ({targetData.unit})</Label>
            <div className="w-full h-10 flex items-center px-3 rounded-md border border-input bg-gray-100">
              <span className="font-semibold text-gray-900">{result} {targetData.unit}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
