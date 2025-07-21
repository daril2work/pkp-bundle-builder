import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ScoreData {
  score0: string;
  score4: string;
  score7: string;
  score10: string;
}

interface Indicator {
  id: string;
  name: string;
}

interface ScoreIndicatorFormProps {
  indicator: Indicator;
  scoreData: ScoreData;
}

export const ScoreIndicatorForm: React.FC<ScoreIndicatorFormProps> = ({ indicator, scoreData }) => {
  const scores = [
    { value: "10", label: "Skor 10", description: scoreData.score10 },
    { value: "7", label: "Skor 7", description: scoreData.score7 },
    { value: "4", label: "Skor 4", description: scoreData.score4 },
    { value: "0", label: "Skor 0", description: scoreData.score0 },
  ];

  return (
    <Card className="bg-white border-gray-200">
      <CardHeader>
        <CardTitle className="text-base font-medium text-gray-800">Input Data: {indicator.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup defaultValue="7" className="space-y-4">
          {scores.map((score) => (
            <Label 
              key={score.value} 
              htmlFor={`${indicator.id}-${score.value}`}
              className="flex items-start p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:bg-purple-50 has-[:checked]:border-purple-400"
            >
              <RadioGroupItem value={score.value} id={`${indicator.id}-${score.value}`} className="mt-1" />
              <div className="ml-4">
                <p className="font-semibold text-gray-900">{score.label}</p>
                <p className="text-sm text-gray-600">{score.description}</p>
              </div>
            </Label>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};
