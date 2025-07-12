import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  Filter,
  Eye,
  MessageSquare,
  Calendar
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Validasi = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Mock data for validation items
  const validationItems = [
    {
      id: "val-1",
      puskesmas: "Puskesmas Kecamatan Utara",
      bundle: "Bundle PKP 2025",
      quarter: "Q1 2025",
      submittedAt: "2025-01-12 14:30",
      status: "pending",
      indicators: 12,
      completedIndicators: 12,
      reviewer: null,
      comments: []
    },
    {
      id: "val-2", 
      puskesmas: "Puskesmas Kecamatan Selatan",
      bundle: "Bundle PKP 2025",
      quarter: "Q1 2025", 
      submittedAt: "2025-01-11 09:15",
      status: "approved",
      indicators: 12,
      completedIndicators: 12,
      reviewer: "Dr. Ahmad",
      comments: ["Data sudah lengkap dan akurat"]
    },
    {
      id: "val-3",
      puskesmas: "Puskesmas Kecamatan Timur", 
      bundle: "Bundle PKP 2025",
      quarter: "Q1 2025",
      submittedAt: "2025-01-10 16:45",
      status: "revision",
      indicators: 12,
      completedIndicators: 10,
      reviewer: "Dr. Sari",
      comments: ["Perlu melengkapi data indikator imunisasi", "Dokumentasi kurang lengkap"]
    },
    {
      id: "val-4",
      puskesmas: "Puskesmas Kecamatan Barat",
      bundle: "Bundle PKP 2025", 
      quarter: "Q4 2024",
      submittedAt: "2024-12-28 11:20",
      status: "rejected",
      indicators: 12,
      completedIndicators: 8,
      reviewer: "Dr. Budi",
      comments: ["Data tidak konsisten dengan laporan sebelumnya", "Perlu verifikasi ulang"]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Menunggu</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Disetujui</Badge>;
      case 'revision':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Revisi</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Ditolak</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'revision':
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredItems = validationItems.filter(item => {
    const matchesSearch = item.puskesmas.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.bundle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id: string) => {
    toast({
      title: "Data Disetujui",
      description: "Data puskesmas telah disetujui dan akan masuk ke sistem rekap",
      duration: 3000,
    });
  };

  const handleReject = (id: string) => {
    toast({
      title: "Data Ditolak", 
      description: "Data puskesmas ditolak dan akan dikembalikan untuk perbaikan",
      duration: 3000,
    });
  };

  const handleRequestRevision = (id: string) => {
    toast({
      title: "Revisi Diminta",
      description: "Permintaan revisi telah dikirim ke puskesmas",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-2 rounded-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Validasi Data</h1>
              <p className="text-sm text-gray-600">Validasi dan persetujuan data puskesmas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Cari puskesmas atau bundle..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="pending">Menunggu</SelectItem>
                  <SelectItem value="approved">Disetujui</SelectItem>
                  <SelectItem value="revision">Revisi</SelectItem>
                  <SelectItem value="rejected">Ditolak</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Validation Items */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(item.status)}
                      <h3 className="font-semibold text-lg">{item.puskesmas}</h3>
                      {getStatusBadge(item.status)}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Bundle:</span> {item.bundle}
                      </div>
                      <div>
                        <span className="font-medium">Quarter:</span> {item.quarter}
                      </div>
                      <div>
                        <span className="font-medium">Indikator:</span> {item.completedIndicators}/{item.indicators}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{item.submittedAt}</span>
                      </div>
                    </div>

                    {item.reviewer && (
                      <div className="mt-2 text-sm">
                        <span className="font-medium text-gray-700">Reviewer:</span> {item.reviewer}
                      </div>
                    )}

                    {item.comments && item.comments.length > 0 && (
                      <div className="mt-3">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageSquare className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">Komentar:</span>
                        </div>
                        <div className="space-y-1">
                          {item.comments.map((comment, index) => (
                            <div key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                              {comment}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Detail
                    </Button>
                    
                    {item.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprove(item.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Setujui
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-orange-200 text-orange-600 hover:bg-orange-50"
                          onClick={() => handleRequestRevision(item.id)}
                        >
                          Revisi
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => handleReject(item.id)}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Tolak
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-500">
                <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Tidak ada data ditemukan</h3>
                <p>Coba ubah filter atau kata kunci pencarian</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Validasi;