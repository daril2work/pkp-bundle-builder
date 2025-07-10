
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, TrendingUp, Calendar } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface MonthlyData {
  month: string;
  target: number;
  sasaran: number;
  capaian: number;
  percentage: number;
  status: 'tercapai' | 'belum_tercapai';
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
  const [currentMonth, setCurrentMonth] = useState('januari');
  const [monthlyInputs, setMonthlyInputs] = useState({
    target: '',
    sasaran: '', 
    capaian: ''
  });

  // Mock historical data
  const historicalData: MonthlyData[] = [
    { month: 'Jan', target: 80, sasaran: 1000, capaian: 750, percentage: 75, status: 'belum_tercapai' },
    { month: 'Feb', target: 80, sasaran: 1000, capaian: 820, percentage: 82, status: 'tercapai' },
    { month: 'Mar', target: 80, sasaran: 1000, capaian: 780, percentage: 78, status: 'belum_tercapai' },
    { month: 'Apr', target: 80, sasaran: 1000, capaian: 850, percentage: 85, status: 'tercapai' },
  ];

  const months = [
    'januari', 'februari', 'maret', 'april', 'mei', 'juni',
    'juli', 'agustus', 'september', 'oktober', 'november', 'desember'
  ];

  const calculatePercentage = () => {
    const target = parseFloat(monthlyInputs.target) || 0;
    const sasaran = parseFloat(monthlyInputs.sasaran) || 0;
    const capaian = parseFloat(monthlyInputs.capaian) || 0;
    
    if (sasaran === 0) return 0;
    return (capaian / sasaran) * 100;
  };

  const percentage = calculatePercentage();
  const isAchieved = percentage >= parseFloat(monthlyInputs.target);

  const chartConfig = {
    capaian: {
      label: "Capaian",
      color: "#8b5cf6",
    },
    target: {
      label: "Target",
      color: "#06b6d4",
    },
  };

  return (
    <div className="space-y-6">
      {/* Monthly Input Form */}
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-900">
            <Calendar className="h-5 w-5" />
            Input Data Bulanan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bulan
              </label>
              <select 
                value={currentMonth}
                onChange={(e) => setCurrentMonth(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {months.map(month => (
                  <option key={month} value={month}>
                    {month.charAt(0).toUpperCase() + month.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target (%)
              </label>
              <Input
                type="number"
                value={monthlyInputs.target}
                onChange={(e) => setMonthlyInputs(prev => ({ ...prev, target: e.target.value }))}
                placeholder="80"
                className="focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sasaran
              </label>
              <Input
                type="number"
                value={monthlyInputs.sasaran}
                onChange={(e) => setMonthlyInputs(prev => ({ ...prev, sasaran: e.target.value }))}
                placeholder="1000"
                className="focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capaian
              </label>
              <Input
                type="number"
                value={monthlyInputs.capaian}
                onChange={(e) => setMonthlyInputs(prev => ({ ...prev, capaian: e.target.value }))}
                placeholder="850"
                className="focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>

          {/* Auto Calculation */}
          {monthlyInputs.target && monthlyInputs.sasaran && monthlyInputs.capaian && (
            <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Persentase Capaian:</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {percentage.toFixed(1)}%
                  </p>
                </div>
                <div className="text-right">
                  <Badge 
                    className={`${isAchieved 
                      ? 'bg-green-100 text-green-800 border-green-200' 
                      : 'bg-red-100 text-red-800 border-red-200'
                    }`}
                  >
                    {isAchieved ? 'Tercapai' : 'Belum Tercapai'}
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Dokumen Pendukung (Max 5MB)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                Drag & drop file atau <span className="text-purple-600 cursor-pointer">browse</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">PDF, DOC, XLS (max 5MB)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historical Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* History Table */}
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
                  <TableHead>Target</TableHead>
                  <TableHead>Capaian</TableHead>
                  <TableHead>%</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historicalData.map((data) => (
                  <TableRow key={data.month}>
                    <TableCell className="font-medium">{data.month}</TableCell>
                    <TableCell>{data.target}%</TableCell>
                    <TableCell>{data.capaian}</TableCell>
                    <TableCell>{data.percentage}%</TableCell>
                    <TableCell>
                      <Badge 
                        className={`${data.status === 'tercapai'
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : 'bg-red-100 text-red-800 border-red-200'
                        }`}
                      >
                        {data.status === 'tercapai' ? 'Tercapai' : 'Belum'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Mini Chart */}
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-900">Grafik Capaian</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={historicalData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="percentage" fill="var(--color-capaian)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
