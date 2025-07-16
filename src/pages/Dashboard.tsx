import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Building2, FileCheck, TrendingUp, Calendar, Users, AlertCircle, CheckCircle2 } from "lucide-react";
const Dashboard = () => {
  // Mock data for demonstration
  const summaryStats = {
    totalBundles: 3,
    totalPuskesmas: 24,
    completedEvaluations: 18,
    pendingValidations: 6
  };
  const recentActivities = [{
    id: 1,
    action: "Bundle PKP 2025 dibuat",
    time: "2 jam yang lalu",
    status: "success"
  }, {
    id: 2,
    action: "Puskesmas Kec. Utara mengirim data Q1",
    time: "4 jam yang lalu",
    status: "info"
  }, {
    id: 3,
    action: "Validasi data Puskesmas Kec. Selatan",
    time: "1 hari yang lalu",
    status: "pending"
  }, {
    id: 4,
    action: "Laporan rekap Q4 2024 selesai",
    time: "2 hari yang lalu",
    status: "success"
  }];
  const quarterlyProgress = [{
    quarter: "Q1 2025",
    completed: 8,
    total: 24,
    percentage: 33
  }, {
    quarter: "Q4 2024",
    completed: 24,
    total: 24,
    percentage: 100
  }, {
    quarter: "Q3 2024",
    completed: 22,
    total: 24,
    percentage: 92
  }, {
    quarter: "Q2 2024",
    completed: 20,
    total: 24,
    percentage: 83
  }];
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard PKP</h1>
              <p className="text-sm text-gray-600">Sistem Penilaian Kinerja Puskesmas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bundle</CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryStats.totalBundles}</div>
              <p className="text-xs text-muted-foreground">Bundle aktif</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Puskesmas</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryStats.totalPuskesmas}</div>
              <p className="text-xs text-muted-foreground">Terdaftar dalam sistem</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Evaluasi Selesai</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryStats.completedEvaluations}</div>
              <p className="text-xs text-muted-foreground">
                dari {summaryStats.totalPuskesmas} puskesmas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Perlu Validasi</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryStats.pendingValidations}</div>
              <p className="text-xs text-muted-foreground">Menunggu persetujuan</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Quarterly Progress */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Progress Evaluasi per Quarter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quarterlyProgress.map((quarter, index) => <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{quarter.quarter}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300" style={{
                        width: `${quarter.percentage}%`
                      }} />
                        </div>
                        <span className="text-sm font-medium min-w-[3rem]">
                          {quarter.completed}/{quarter.total}
                        </span>
                        <Badge variant={quarter.percentage === 100 ? "default" : "secondary"}>
                          {quarter.percentage}%
                        </Badge>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Aktivitas Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map(activity => <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50">
                    <div className={`w-2 h-2 rounded-full mt-2 ${activity.status === 'success' ? 'bg-green-500' : activity.status === 'info' ? 'bg-blue-500' : 'bg-yellow-500'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-blue-50 border-blue-200">
                <FileCheck className="h-6 w-6 text-blue-600" />
                <span className="text-sm">Buat Bundle Baru</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-purple-50 border-purple-200">
                <Building2 className="h-6 w-6 text-purple-600" />
                <span className="text-sm">Lihat Puskesmas</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-green-50 border-green-200">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                <span className="text-sm">Validasi Data</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-orange-50 border-orange-200">
                <TrendingUp className="h-6 w-6 text-orange-600" />
                <span className="text-sm">Lihat Rekap</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default Dashboard;