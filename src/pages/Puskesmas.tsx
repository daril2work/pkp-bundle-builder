
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Building2, FileText, Send } from "lucide-react";
import { PuskesmasIndicatorCard } from "@/components/puskesmas/PuskesmasIndicatorCard";
import { ClusterCollapsible } from "@/components/puskesmas/ClusterCollapsible";
import { DashboardSkeleton } from "@/components/puskesmas/DashboardSkeleton";

// Mock data - in real app this would come from API
const mockBundle = {
  id: "bundle-2025",
  name: "Bundle PKP 2025",
  year: "2025",
  status: "active",
  clusters: [
    {
      id: "cluster-1",
      name: "Upaya Kesehatan Masyarakat",
      indicators: [
        {
          id: "ind-1",
          name: "Cakupan Imunisasi Dasar Lengkap",
          type: "target" as const,
          description: "Persentase anak usia 12-23 bulan yang mendapat imunisasi dasar lengkap",
          status: "filled",
          targetData: {
            unit: "%",
            formula: "(Jumlah anak 12-23 bulan dengan imunisasi lengkap / Total anak 12-23 bulan) x 100%"
          }
        },
        {
          id: "ind-2", 
          name: "Kualitas Pelayanan Puskesmas",
          type: "score" as const,
          description: "Penilaian kualitas pelayanan berdasarkan standar akreditasi puskesmas",
          status: "partial",
          scoreData: {
            score0: "Tidak ada sistem manajemen mutu",
            score4: "Sistem manajemen mutu minimal",
            score7: "Sistem manajemen mutu baik",
            score10: "Sistem manajemen mutu excellent"
          }
        }
      ]
    },
    {
      id: "cluster-2",
      name: "Upaya Kesehatan Perorangan",
      indicators: [
        {
          id: "ind-3",
          name: "Angka Kematian Ibu",
          type: "target" as const,
          description: "Jumlah kematian ibu per 100.000 kelahiran hidup",
          status: "empty",
          targetData: {
            unit: "per 100.000 KH",
            formula: "(Jumlah kematian ibu / Jumlah kelahiran hidup) x 100.000"
          }
        }
      ]
    }
  ]
};

export default function Puskesmas() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedQuarter, setSelectedQuarter] = useState("q1");
  const [selectedCluster, setSelectedCluster] = useState("all");
  const [bundleData, setBundleData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBundleData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setBundleData(mockBundle);
      setIsLoading(false);
    };

    fetchBundleData();
  }, [selectedYear]);
  
  const years = ["2024", "2025", "2026"];
  const quarters = [
    { id: "q1", name: "Quarter 1" },
    { id: "q2", name: "Quarter 2" },
    { id: "q3", name: "Quarter 3" },
    { id: "q4", name: "Quarter 4" },
  ];
  const clusters = [
    { id: "all", name: "Semua Klaster" },
    ...(bundleData ? bundleData.clusters.map(c => ({ id: c.id, name: c.name })) : [])
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'filled':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Sudah Diisi</Badge>;
      case 'partial':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Sebagian Diisi</Badge>;
      case 'empty':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Belum Diisi</Badge>;
      case 'revision':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Perlu Revisi</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!bundleData) {
    return <div>Error: Data tidak ditemukan.</div>;
  }

  const filteredClusters = selectedCluster === "all"
    ? bundleData.clusters
    : bundleData.clusters.filter(c => c.id === selectedCluster);

  const totalIndicators = bundleData.clusters.reduce((sum, cluster) => sum + cluster.indicators.length, 0);
  const filledIndicators = bundleData.clusters.reduce((sum, cluster) =>
    sum + cluster.indicators.filter(ind => ind.status === 'filled').length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 space-y-6">
        
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Puskesmas Kecamatan Utara</h1>
                <p className="text-sm text-gray-600">Dashboard Penilaian Bundle PKP</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-full sm:w-32">
                  <CalendarDays className="h-4 w-4" />
                  <SelectValue placeholder="Tahun" />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedQuarter} onValueChange={setSelectedQuarter}>
                <SelectTrigger className="w-full sm:w-36">
                  <CalendarDays className="h-4 w-4" />
                  <SelectValue placeholder="Quarter" />
                </SelectTrigger>
                <SelectContent>
                  {quarters.map(q => (
                    <SelectItem key={q.id} value={q.id}>{q.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedCluster} onValueChange={setSelectedCluster}>
                <SelectTrigger className="w-full sm:w-48">
                  <FileText className="h-4 w-4" />
                  <SelectValue placeholder="Pilih Klaster" />
                </SelectTrigger>
                <SelectContent>
                  {clusters.map(cluster => (
                    <SelectItem key={cluster.id} value={cluster.id}>{cluster.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Bundle Info Summary */}
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-semibold text-purple-900">{bundleData.name}</h3>
                <p className="text-sm text-purple-700">
                  Progress: {filledIndicators} dari {totalIndicators} indikator telah diisi
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(filledIndicators / totalIndicators) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-purple-700">
                  {Math.round((filledIndicators / totalIndicators) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Indicators by Cluster */}
        <div className="space-y-4">
          {filteredClusters.map((cluster) => (
            <ClusterCollapsible 
              key={cluster.id}
              cluster={cluster}
              getStatusBadge={getStatusBadge}
            />
          ))}
        </div>

        {/* Submit Section */}
        <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-semibold text-purple-900">Kirim ke Dinkes</h3>
                <p className="text-sm text-purple-700">
                  Pastikan semua data telah diisi dengan benar sebelum mengirim
                </p>
              </div>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                disabled={filledIndicators < totalIndicators}
              >
                <Send className="h-4 w-4 mr-2" />
                Kirim ke Dinkes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
