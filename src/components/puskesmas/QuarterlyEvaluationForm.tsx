
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, MessageSquare } from "lucide-react";

interface QuarterlyData {
  quarter: string;
  score?: number;
  percentage?: number;
  evaluation: string;
  rtl: string;
  isCompleted: boolean;
}

interface QuarterlyEvaluationFormProps {
  type: 'target' | 'score';
  monthlyData?: any[];
  scoreData?: any;
}

export const QuarterlyEvaluationForm: React.FC<QuarterlyEvaluationFormProps> = ({ 
  type, 
  monthlyData = [],
  scoreData 
}) => {
  const [quarterlyData, setQuarterlyData] = useState<Record<string, QuarterlyData>>({
    Q1: { quarter: 'Q1', evaluation: '', rtl: '', isCompleted: false },
    Q2: { quarter: 'Q2', evaluation: '', rtl: '', isCompleted: false },
    Q3: { quarter: 'Q3', evaluation: '', rtl: '', isCompleted: false },
    Q4: { quarter: 'Q4', evaluation: '', rtl: '', isCompleted: false },
  });

  const evaluationOptions = [
    { 
      value: 'tercapai', 
      label: 'Sudah Tercapai', 
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: CheckCircle 
    },
    { 
      value: 'sebagian_tercapai', 
      label: 'Sebagian Tercapai', 
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: AlertTriangle 
    },
    { 
      value: 'belum_tercapai', 
      label: 'Belum Tercapai', 
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: XCircle 
    },
  ];

  const getQuarterMonths = (quarter: string) => {
    switch (quarter) {
      case 'Q1': return [0, 1, 2]; // Jan, Feb, Mar
      case 'Q2': return [3, 4, 5]; // Apr, May, Jun
      case 'Q3': return [6, 7, 8]; // Jul, Aug, Sep
      case 'Q4': return [9, 10, 11]; // Oct, Nov, Dec
      default: return [];
    }
  };

  const calculateQuarterlyPercentage = (quarter: string) => {
    if (type !== 'target' || !monthlyData.length) return 0;
    
    const months = getQuarterMonths(quarter);
    const quarterData = months.map(monthIndex => monthlyData[monthIndex]).filter(Boolean);
    
    if (quarterData.length === 0) return 0;
    
    const totalTarget = quarterData.reduce((sum, month) => sum + (month.target || 0), 0);
    const totalAchievement = quarterData.reduce((sum, month) => sum + (month.achievement || 0), 0);
    
    return totalTarget > 0 ? Math.round((totalAchievement / totalTarget) * 100) : 0;
  };

  const isQuarterComplete = (quarter: string) => {
    if (type === 'score') {
      return scoreData && scoreData[quarter] && scoreData[quarter].score !== null;
    } else {
      const months = getQuarterMonths(quarter);
      const lastMonthIndex = months[months.length - 1];
      return monthlyData[lastMonthIndex] && monthlyData[lastMonthIndex].achievement !== null;
    }
  };

  const updateQuarterlyData = (quarter: string, field: keyof QuarterlyData, value: any) => {
    setQuarterlyData(prev => ({
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
    
    const IconComponent = option.icon;
    return (
      <Badge className={`${option.color} flex items-center gap-1`}>
        <IconComponent className="h-3 w-3" />
        {option.label}
      </Badge>
    );
  };

  const getQuarterTitle = (quarter: string) => {
    switch (quarter) {
      case 'Q1': return 'Triwulan I (Jan-Mar)';
      case 'Q2': return 'Triwulan II (Apr-Jun)';
      case 'Q3': return 'Triwulan III (Jul-Sep)';
      case 'Q4': return 'Triwulan IV (Okt-Des)';
      default: return quarter;
    }
  };

  return (
    <Card className="border-purple-200 bg-purple-50/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-900">
          <MessageSquare className="h-5 w-5" />
          Evaluasi & RTL Triwulanan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {Object.keys(quarterlyData).map(quarter => {
            const isComplete = isQuarterComplete(quarter);
            const percentage = type === 'target' ? calculateQuarterlyPercentage(quarter) : null;
            const score = type === 'score' && scoreData?.[quarter]?.score;
            
            return (
              <AccordionItem key={quarter} value={quarter}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{getQuarterTitle(quarter)}</span>
                      {isComplete && (
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          Data Tersedia
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {type === 'target' && percentage !== null && (
                        <span className="text-sm font-mono text-purple-700">
                          {percentage}%
                        </span>
                      )}
                      {type === 'score' && score !== null && (
                        <span className="text-sm font-mono text-purple-700">
                          Skor: {score}
                        </span>
                      )}
                      {quarterlyData[quarter].evaluation && 
                        getEvaluationBadge(quarterlyData[quarter].evaluation)
                      }
                    </div>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="space-y-4 pt-4">
                  {isComplete ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {type === 'target' ? 'Capaian Kumulatif' : 'Skor Aktual'}
                          </label>
                          <div className="p-3 bg-gray-50 rounded-lg border">
                            <span className="text-lg font-semibold text-purple-700">
                              {type === 'target' ? `${percentage}%` : `${score}/10`}
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status Evaluasi
                          </label>
                          <Select 
                            value={quarterlyData[quarter].evaluation} 
                            onValueChange={(value) => updateQuarterlyData(quarter, 'evaluation', value)}
                          >
                            <SelectTrigger className="focus:ring-purple-500 focus:border-purple-500">
                              <SelectValue placeholder="Pilih status evaluasi" />
                            </SelectTrigger>
                            <SelectContent>
                              {evaluationOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                  <div className="flex items-center gap-2">
                                    <option.icon className="h-4 w-4" />
                                    {option.label}
                                  </div>
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
                          value={quarterlyData[quarter].rtl}
                          onChange={(e) => updateQuarterlyData(quarter, 'rtl', e.target.value)}
                          placeholder={`Jelaskan rencana tindak lanjut untuk ${getQuarterTitle(quarter).toLowerCase()}...`}
                          className="min-h-[100px] focus:ring-purple-500 focus:border-purple-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Contoh: Fokus pada pendampingan di desa X & Y untuk meningkatkan cakupan program
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                      <p className="font-medium">Data Belum Tersedia</p>
                      <p className="text-sm">
                        Lengkapi data {type === 'target' ? 'bulanan' : 'skor'} terlebih dahulu untuk mengisi evaluasi triwulan ini
                      </p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
};
