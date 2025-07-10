
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3, FileText } from "lucide-react";

interface QuarterData {
  quarter: string;
  score: number | null;
  evaluation: string;
  rtl: string;
}

interface ScoreIndicatorFormProps {
  indicator: any;
  scoreData: {
    score0: string;
    score4: string;
    score7: string;
    score10: string;
  };
}

export const ScoreIndicatorForm: React.FC<ScoreIndicatorFormProps> = ({ 
  indicator, 
  scoreData 
}) => {
  const [quarterData, setQuarterData] = useState<Record<string, QuarterData>>({
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

  const updateQuarterData = (quarter: string, field: keyof QuarterData, value: any) => {
    setQuarterData(prev => ({
      ...prev,
      [quarter]: {
        ...prev[quarter],
        [field]: value
      }
    }));
  };

  const getScoreDescription = (score: number) => {
    if (score === 0) return scoreData.score0;
    if (score <= 4) return scoreData.score4;
    if (score <= 7) return scoreData.score7;
    if (score === 10) return scoreData.score10;
    return '';
  };

  const getEvaluationBadge = (evaluation: string) => {
    const option = evaluationOptions.find(opt => opt.value === evaluation);
    if (!option) return null;
    return <Badge className={option.color}>{option.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Score Reference */}
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

      {/* Quarterly Tabs */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <BarChart3 className="h-5 w-5" />
            Penilaian Triwulan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="Q1" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="Q1">Triwulan I</TabsTrigger>
              <TabsTrigger value="Q2">Triwulan II</TabsTrigger>
              <TabsTrigger value="Q3">Triwulan III</TabsTrigger>
              <TabsTrigger value="Q4">Triwulan IV</TabsTrigger>
            </TabsList>
            
            {Object.keys(quarterData).map(quarter => (
              <TabsContent key={quarter} value={quarter} className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    {quarterData[quarter].score !== null && (
                      <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600">
                        {getScoreDescription(quarterData[quarter].score!)}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Evaluasi
                    </label>
                    <Select 
                      value={quarterData[quarter].evaluation} 
                      onValueChange={(value) => updateQuarterData(quarter, 'evaluation', value)}
                    >
                      <SelectTrigger className="focus:ring-blue-500 focus:border-blue-500">
                        <SelectValue placeholder="Pilih evaluasi" />
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
                    Rencana Tindak Lanjut (RTL)
                  </label>
                  <Textarea
                    value={quarterData[quarter].rtl}
                    onChange={(e) => updateQuarterData(quarter, 'rtl', e.target.value)}
                    placeholder="Jelaskan rencana tindak lanjut untuk triwulan ini..."
                    className="min-h-[100px] focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Summary Table */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Ringkasan Evaluasi</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Triwulan</TableHead>
                <TableHead>Skor</TableHead>
                <TableHead>Evaluasi</TableHead>
                <TableHead>Status RTL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.values(quarterData).map((data) => (
                <TableRow key={data.quarter}>
                  <TableCell className="font-medium">
                    {data.quarter === 'Q1' ? 'Triwulan I' :
                     data.quarter === 'Q2' ? 'Triwulan II' :
                     data.quarter === 'Q3' ? 'Triwulan III' : 'Triwulan IV'}
                  </TableCell>
                  <TableCell>
                    {data.score !== null ? (
                      <Badge variant="outline" className="font-mono">
                        {data.score}/10
                      </Badge>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {data.evaluation ? getEvaluationBadge(data.evaluation) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {data.rtl ? (
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        Tersedia
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-500">
                        Belum diisi
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
