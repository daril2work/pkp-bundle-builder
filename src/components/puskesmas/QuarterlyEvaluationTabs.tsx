
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MessageSquare } from "lucide-react";

interface QuarterEvaluation {
  quarter: string;
  score: number | null;
  evaluation: string;
  rtl: string;
}

interface QuarterlyEvaluationTabsProps {
  type: 'score' | 'target';
}

export const QuarterlyEvaluationTabs: React.FC<QuarterlyEvaluationTabsProps> = ({ type }) => {
  const [quarterData, setQuarterData] = useState<Record<string, QuarterEvaluation>>({
    Q1: { quarter: 'Q1', score: null, evaluation: '', rtl: '' },
    Q2: { quarter: 'Q2', score: null, evaluation: '', rtl: '' },
    Q3: { quarter: 'Q3', score: null, evaluation: '', rtl: '' },
    Q4: { quarter: 'Q4', score: null, evaluation: '', rtl: '' },
  });

  const evaluationOptions = [
    { value: 'tidak_tercapai', label: 'Tidak Tercapai', color: 'bg-red-100 text-red-800 border-red-200' },
    { value: 'sebagian_tercapai', label: 'Sebagian Tercapai', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { value: 'tercapai', label: 'Tercapai', color: 'bg-green-100 text-green-800 border-green-200' },
  ];

  const scoreOptions = Array.from({ length: 11 }, (_, i) => i);

  const updateQuarterData = (quarter: string, field: keyof QuarterEvaluation, value: any) => {
    setQuarterData(prev => ({
      ...prev,
      [quarter]: {
        ...prev[quarter],
        [field]: value
      }
    }));
  };

  const getEvaluationBadge = (evaluation: string) => {
    const option = evaluationOptions.find(opt => opt.value === evaluation);
    if (!option) return null;
    return <Badge className={option.color}>{option.label}</Badge>;
  };

  const getQuarterName = (quarter: string) => {
    const names = {
      Q1: 'Triwulan I',
      Q2: 'Triwulan II', 
      Q3: 'Triwulan III',
      Q4: 'Triwulan IV'
    };
    return names[quarter as keyof typeof names] || quarter;
  };

  return (
    <Card className="border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <MessageSquare className="h-5 w-5" />
          Evaluasi Triwulan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="Q1" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="Q1">Q1</TabsTrigger>
            <TabsTrigger value="Q2">Q2</TabsTrigger>
            <TabsTrigger value="Q3">Q3</TabsTrigger>
            <TabsTrigger value="Q4">Q4</TabsTrigger>
          </TabsList>
          
          {Object.keys(quarterData).map(quarter => (
            <TabsContent key={quarter} value={quarter} className="space-y-4 mt-4">
              <div className="p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-medium text-gray-900 mb-3">{getQuarterName(quarter)}</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {type === 'score' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Skor Aktual (0-10)
                      </label>
                      <Select 
                        value={quarterData[quarter].score?.toString() || ''} 
                        onValueChange={(value) => updateQuarterData(quarter, 'score', parseInt(value))}
                      >
                        <SelectTrigger className="focus:ring-blue-500 focus:border-blue-500">
                          <SelectValue placeholder="Pilih skor" />
                        </SelectTrigger>
                        <SelectContent>
                          {scoreOptions.map(score => (
                            <SelectItem key={score} value={score.toString()}>
                              {score}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Evaluasi Triwulan
                    </label>
                    <Select 
                      value={quarterData[quarter].evaluation} 
                      onValueChange={(value) => updateQuarterData(quarter, 'evaluation', value)}
                    >
                      <SelectTrigger className="focus:ring-blue-500 focus:border-blue-500">
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                      <SelectContent>
                        {evaluationOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    RTL (Rencana Tindak Lanjut)
                  </label>
                  <Textarea
                    value={quarterData[quarter].rtl}
                    onChange={(e) => updateQuarterData(quarter, 'rtl', e.target.value)}
                    placeholder="Rencana tindak lanjut untuk triwulan ini..."
                    className="min-h-[100px] focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {quarterData[quarter].evaluation && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm text-gray-600">Status:</span>
                    {getEvaluationBadge(quarterData[quarter].evaluation)}
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};
