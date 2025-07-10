
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, TrendingUp, Calendar, Target as TargetIcon } from "lucide-react";
import { QuarterlyEvaluationForm } from "./QuarterlyEvaluationForm";

interface MonthlyData {
  month: string;
  target: number | null;
  achievement: number | null;
  percentage: number;
  status: string;
}

interface TargetIndicatorFormProps {
  indicator: any;
  targetData: {
    unit: string;
    formula: string;
  };
}

export const TargetIndicatorForm: React.FC<TargetIndicatorFormProps> = ({ 
  indicator, 
  targetData 
}) => {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>(
    Array.from({ length: 12 }, (_, i) => ({
      month: new Date(2025, i, 1).toLocaleDateString('id-ID', { month: 'long' }),
      target: null,
      achievement: null,
      percentage: 0,
      status: 'empty'
    }))
  );

  const updateMonthlyData = (monthIndex: number, field: 'target' | 'achievement', value: number) => {
    setMonthlyData(prev => {
      const newData = [...prev];
      newData[monthIndex] = {
        ...newData[monthIndex],
        [field]: value
      };
      
      // Calculate percentage
      if (newData[monthIndex].target && newData[monthIndex].achievement) {
        const percentage = Math.round((newData[monthIndex].achievement! / newData[monthIndex].target!) * 100);
        newData[monthIndex].percentage = percentage;
        newData[monthIndex].status = percentage >= 100 ? 'achieved' : percentage >= 75 ? 'partial' : 'not_achieved';
      }
      
      return newData;
    });
  };

  const getStatusBadge = (status: string, percentage: number) => {
    if (status === 'empty') return <Badge variant="outline">Belum Diisi</Badge>;
    if (status === 'achieved') return <Badge className="bg-green-100 text-green-800 border-green-200">Tercapai ({percentage}%)</Badge>;
    if (status === 'partial') return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Sebagian ({percentage}%)</Badge>;
    return <Badge className="bg-red-100 text-red-800 border-red-200">Belum Tercapai ({percentage}%)</Badge>;
  };

  const filledMonths = monthlyData.filter(m => m.target !== null && m.achievement !== null).length;
  const averagePercentage = filledMonths > 0 
    ? Math.round(monthlyData.reduce((sum, m) => sum + m.percentage, 0) / filledMonths) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Monthly Input */}
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-900">
            <Calendar className="h-5 w-5" />
            Input Data Bulanan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-purple-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-700">{filledMonths}/12</div>
                <div className="text-sm text-purple-600">Bulan Terisi</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-700">{averagePercentage}%</div>
                <div className="text-sm text-purple-600">Rata-rata Capaian</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-700">{targetData.unit}</div>
                <div className="text-sm text-purple-600">Satuan</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {monthlyData.map((data, index) => (
                <Card key={index} className="border-purple-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-purple-800">
                      {data.month}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Target
                      </label>
                      <Input
                        type="number"
                        value={data.target || ''}
                        onChange={(e) => updateMonthlyData(index, 'target', parseInt(e.target.value) || 0)}
                        placeholder="0"
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Capaian
                      </label>
                      <Input
                        type="number"
                        value={data.achievement || ''}
                        onChange={(e) => updateMonthlyData(index, 'achievement', parseInt(e.target.value) || 0)}
                        placeholder="0"
                        className="h-8 text-sm"
                      />
                    </div>
                    <div className="pt-1">
                      {getStatusBadge(data.status, data.percentage)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Upload */}
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-900">
            <Upload className="h-5 w-5" />
            Dokumen Pendukung
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Klik untuk upload atau drag & drop file
            </p>
            <p className="text-xs text-gray-500">
              PDF, DOC, XLS (Maks. 5MB)
            </p>
            <Button variant="outline" size="sm" className="mt-3">
              Pilih File
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Historical Data */}
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-900">
            <TrendingUp className="h-5 w-5" />
            Riwayat Capaian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bulan</TableHead>
                <TableHead className="text-right">Target</TableHead>
                <TableHead className="text-right">Capaian</TableHead>
                <TableHead className="text-right">%</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyData.slice(0, 6).map((data, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{data.month}</TableCell>
                  <TableCell className="text-right">{data.target || '-'}</TableCell>
                  <TableCell className="text-right">{data.achievement || '-'}</TableCell>
                  <TableCell className="text-right font-mono">
                    {data.percentage > 0 ? `${data.percentage}%` : '-'}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(data.status, data.percentage)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quarterly Evaluation */}
      <QuarterlyEvaluationForm 
        type="target" 
        monthlyData={monthlyData}
      />
    </div>
  );
};
