
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface ScoreReferenceGuideProps {
  scoreData: {
    score0: string;
    score4: string;
    score7: string;
    score10: string;
  };
}

export const ScoreReferenceGuide: React.FC<ScoreReferenceGuideProps> = ({ scoreData }) => {
  return (
    <Card className="border-blue-200 bg-blue-50/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <FileText className="h-5 w-5" />
          Panduan Penilaian
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { score: '0', desc: scoreData.score0, color: 'border-red-200 bg-red-50' },
            { score: '4', desc: scoreData.score4, color: 'border-yellow-200 bg-yellow-50' },
            { score: '7', desc: scoreData.score7, color: 'border-blue-200 bg-blue-50' },
            { score: '10', desc: scoreData.score10, color: 'border-green-200 bg-green-50' }
          ].map(({ score, desc, color }) => (
            <div key={score} className={`p-3 rounded-lg border ${color}`}>
              <div className="font-semibold text-sm mb-1">Skor {score}</div>
              <div className="text-sm text-gray-700">{desc}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
