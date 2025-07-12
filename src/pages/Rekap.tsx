import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  Download, 
  FileSpreadsheet, 
  FileText,
  Calendar,
  BarChart3,
  PieChart,
  Building2
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Rekap = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedQuarter, setSelectedQuarter] = useState("all");
  const [selectedBundle, setSelectedBundle] = useState("all");

  // Mock data for reports
  const summaryData = {
    totalPuskesmas: 24,
    completedEvaluations: 18,
    averageScore: 8.2,
    topPerformer: "Puskesmas Kec. Utara"
  };

  const quarterlyData = [
    { quarter: "Q1 2025", completed: 8, avgScore: 8.1, topScore: 9.5, lowScore: 6.8 },
    { quarter: "Q4 2024", completed: 24, avgScore: 8.3, topScore: 9.8, lowScore: 7.2 },
    { quarter: "Q3 2024", completed: 22, avgScore: 8.0, topScore: 9.4, lowScore: 6.5 },
    { quarter: "Q2 2024", completed: 20, avgScore: 7.8, topScore: 9.2, lowScore: 6.3 }
  ];

  const clusterPerformance = [
    { name: "Upaya Kesehatan Masyarakat", avgScore: 8.5, puskesmasCount: 24, color: "bg-blue-500" },
    { name: "Upaya Kesehatan Perorangan", avgScore: 8.1, puskesmasCount: 24, color: "bg-green-500" },
    { name: "Manajemen Puskesmas", avgScore: 7.9, puskesmasCount: 24, color: "bg-purple-500" },
    { name: "Mutu Pelayanan", avgScore: 8.3, puskesmasCount: 24, color: "bg-orange-500" }
  ];

  const topPuskesmas = [
    { name: "Puskesmas Kec. Utara", score: 9.5, rank: 1 },
    { name: "Puskesmas Kec. Selatan", score: 9.2, rank: 2 },
    { name: "Puskesmas Kec. Timur", score: 9.0, rank: 3 },
    { name: "Puskesmas Kec. Barat", score: 8.8, rank: 4 },
    { name: "Puskesmas Kec. Tengah", score: 8.6, rank: 5 }
  ];

  const handleExportExcel = () => {
    toast({
      title: "Export Excel",
      description: "Laporan rekap sedang diunduh dalam format Excel",
      duration: 3000,
    });
  };

  const handleExportPDF = () => {
    toast({
      title: "Export PDF", 
      description: "Laporan rekap sedang diunduh dalam format PDF",
      duration: 3000,
    });
  };

  const years = ["2024", "2025", "2026"];
  const quarters = [
    { value: "all", label: "Semua Quarter" },
    { value: "Q1", label: "Quarter 1" },
    { value: "Q2", label: "Quarter 2" },
    { value: "Q3", label: "Quarter 3" },
    { value: "Q4", label: "Quarter 4" }
  ];
  const bundles = [
    { value: "all", label: "Semua Bundle" },
    { value: "bundle-2025", label: "Bundle PKP 2025" },
    { value: "bundle-2024", label: "Bundle PKP 2024" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Rekap & Laporan</h1>
                <p className="text-sm text-gray-600">Analisis dan laporan kinerja puskesmas</p>
              </div>
            </div>

            {/* Export Buttons */}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleExportExcel}
                className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
              >
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export Excel
              </Button>
              <Button 
                variant="outline" 
                onClick={handleExportPDF}
                className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
              >
                <FileText className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Pilih Tahun" />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedQuarter} onValueChange={setSelectedQuarter}>
                <SelectTrigger>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Pilih Quarter" />
                </SelectTrigger>
                <SelectContent>
                  {quarters.map(quarter => (
                    <SelectItem key={quarter.value} value={quarter.value}>
                      {quarter.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedBundle} onValueChange={setSelectedBundle}>
                <SelectTrigger>
                  <FileText className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Pilih Bundle" />
                </SelectTrigger>
                <SelectContent>
                  {bundles.map(bundle => (
                    <SelectItem key={bundle.value} value={bundle.value}>
                      {bundle.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Puskesmas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.totalPuskesmas}</div>
              <div className="flex items-center gap-1 mt-1">
                <Building2 className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Terdaftar</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Evaluasi Selesai</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.completedEvaluations}</div>
              <div className="text-xs text-muted-foreground">
                {Math.round((summaryData.completedEvaluations / summaryData.totalPuskesmas) * 100)}% dari target
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Rata-rata Skor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryData.averageScore}</div>
              <div className="flex items-center gap-1 mt-1">
                <Badge className="bg-green-100 text-green-800 text-xs">Baik</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-bold truncate">{summaryData.topPerformer}</div>
              <div className="text-xs text-muted-foreground">Skor tertinggi</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          {/* Quarterly Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Tren per Quarter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quarterlyData.map((quarter, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{quarter.quarter}</div>
                      <div className="text-sm text-gray-600">
                        {quarter.completed} puskesmas selesai
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{quarter.avgScore}</div>
                      <div className="text-xs text-gray-500">
                        Range: {quarter.lowScore} - {quarter.topScore}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cluster Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Performa per Klaster
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clusterPerformance.map((cluster, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${cluster.color}`} />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{cluster.name}</div>
                      <div className="text-xs text-gray-500">
                        {cluster.puskesmasCount} puskesmas
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{cluster.avgScore}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Top 5 Puskesmas Terbaik
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {topPuskesmas.map((puskesmas, index) => (
                <div key={index} className="text-center p-4 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg">
                  <div className="text-2xl font-bold mb-1">#{puskesmas.rank}</div>
                  <div className="font-medium text-sm mb-2 truncate">{puskesmas.name}</div>
                  <Badge className={`${
                    index === 0 ? 'bg-yellow-100 text-yellow-800' :
                    index === 1 ? 'bg-gray-100 text-gray-800' :
                    index === 2 ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {puskesmas.score}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Rekap;