import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Eye,
  MessageSquare,
  Calendar,
  ChevronDown
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Validasi = () => {
  const [puskesmasFilter, setPuskesmasFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [indicatorFilter, setIndicatorFilter] = useState("all");
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const [previewIndicator, setPreviewIndicator] = useState<any | null>(null);

  // Mock data for validation items
  const validationItems = [
    {
      id: "val-1",
      puskesmas: "Puskesmas Kecamatan Utara",
      bundle: "Bundle PKP 2025",
      quarter: "Q1 2025",
      submittedAt: "2025-01-12 14:30",
      indicators: [
        { id: "ind-1-1", name: "Cakupan Imunisasi Dasar", value: "95%", status: "pending", comment: null, reviewer: null, data: { target: "90%", realisasi: "85%", catatan: "Data bulan Januari belum masuk.", evaluasi: "Realisasi masih di bawah target.", analisa: "Kurangnya sosialisasi di beberapa posyandu.", rtl: "Akan dilakukan sweeping imunisasi di akhir bulan.", monthlyData: [{month: "Januari", target: "90%", realisasi: "80%"}, {month: "Februari", target: "90%", realisasi: "85%"}, {month: "Maret", target: "90%", realisasi: "90%"}] } },
        { id: "ind-1-2", name: "Kepatuhan ANC", value: "88%", status: "pending", comment: null, reviewer: null, data: { target: "95%", realisasi: "88%", catatan: "", evaluasi: "Belum mencapai target.", analisa: "Beberapa ibu hamil tidak datang pada jadwal yang ditentukan.", rtl: "Kunjungan rumah oleh bidan desa.", monthlyData: [{month: "Januari", target: "95%", realisasi: "85%"}, {month: "Februari", target: "95%", realisasi: "90%"}, {month: "Maret", target: "95%", realisasi: "89%"}] } },
        { id: "ind-1-3", name: "Penemuan Kasus TB", value: "12 kasus", status: "pending", comment: null, reviewer: null, data: { target: "10 kasus", realisasi: "12 kasus", catatan: "Melebihi target.", evaluasi: "Sudah baik.", analisa: "Peningkatan skrining di populasi berisiko.", rtl: "Pertahankan program yang sudah berjalan.", monthlyData: [{month: "Januari", target: "3", realisasi: "4"}, {month: "Februari", target: "3", realisasi: "5"}, {month: "Maret", target: "4", realisasi: "3"}] } },
      ],
      reviewer: null,
      comments: []
    },
    {
      id: "val-2",
      puskesmas: "Puskesmas Kecamatan Selatan",
      bundle: "Bundle PKP 2025",
      quarter: "Q1 2025",
      submittedAt: "2025-01-11 09:15",
      indicators: [
        { id: "ind-2-1", name: "Cakupan Imunisasi Dasar", value: "98%", status: "approved", comment: "Sesuai target", reviewer: "Dr. Ahmad" },
        { id: "ind-2-2", name: "Kepatuhan ANC", value: "92%", status: "approved", comment: "Data valid", reviewer: "Dr. Ahmad" },
        { id: "ind-2-3", name: "Penemuan Kasus TB", value: "15 kasus", status: "approved", comment: "Lengkap", reviewer: "Dr. Ahmad" },
      ],
      reviewer: "Dr. Ahmad",
      comments: ["Data sudah lengkap dan akurat"]
    },
    {
      id: "val-3",
      puskesmas: "Puskesmas Kecamatan Timur",
      bundle: "Bundle PKP 2025",
      quarter: "Q1 2025",
      submittedAt: "2025-01-10 16:45",
      indicators: [
        { id: "ind-3-1", name: "Cakupan Imunisasi Dasar", value: "75%", status: "revision", comment: "Nilai terlalu rendah, mohon verifikasi kembali", reviewer: "Dr. Sari" },
        { id: "ind-3-2", name: "Kepatuhan ANC", value: "91%", status: "approved", comment: "OK", reviewer: "Dr. Ahmad" },
        { id: "ind-3-3", name: "Penemuan Kasus TB", value: "9 kasus", status: "revision", comment: "Lampirkan bukti pendukung", reviewer: "Dr. Sari" },
      ],
      reviewer: "Dr. Sari",
      comments: ["Perlu melengkapi data indikator imunisasi", "Dokumentasi kurang lengkap"]
    },
    {
      id: "val-4",
      puskesmas: "Puskesmas Kecamatan Barat",
      bundle: "Bundle PKP 2025",
      quarter: "Q4 2024",
      submittedAt: "2024-12-28 11:20",
      indicators: [
         { id: "ind-4-1", name: "Cakupan Imunisasi Dasar", value: "Error", status: "rejected", comment: "Data tidak valid", reviewer: "Dr. Budi" },
         { id: "ind-4-2", name: "Kepatuhan ANC", value: "Error", status: "rejected", comment: "Data tidak sesuai format", reviewer: "Dr. Budi" },
         { id: "ind-4-3", name: "Penemuan Kasus TB", value: "Error", status: "rejected", comment: "Tidak ada data", reviewer: "Dr. Budi" },
      ],
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

  const getBundleStatus = (indicators: any[]): 'approved' | 'revision' | 'rejected' | 'pending' => {
    const statuses = indicators.map(i => i.status);
    if (statuses.includes('rejected')) return 'rejected';
    if (statuses.includes('revision')) return 'revision';
    if (statuses.includes('pending')) return 'pending';
    return 'approved';
  };

  const puskesmasNames = [...new Set(validationItems.map(item => item.puskesmas))];
  const years = [...new Set(validationItems.map(item => item.quarter.split(" ")[1]))];
  const indicatorNames = [...new Set(validationItems.flatMap(item => item.indicators.map(i => i.name)))];

  const filteredItems = validationItems.map(item => ({
    ...item,
    status: getBundleStatus(item.indicators)
  })).filter(item => {
    const matchesPuskesmas = puskesmasFilter === "all" || item.puskesmas === puskesmasFilter;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesYear = yearFilter === "all" || item.quarter.endsWith(yearFilter);
    const matchesIndicator = indicatorFilter === "all" || item.indicators.some(i => i.name === indicatorFilter);
    return matchesPuskesmas && matchesStatus && matchesYear && matchesIndicator;
  });

  const handleIndicatorAction = (bundleId: string, indicatorId: string, newStatus: 'approved' | 'revision' | 'rejected') => {
    // In a real app, you'd update the state here.
    // For now, we'll just show a toast.
    
    let title = '';
    let description = '';

    switch (newStatus) {
      case 'approved':
        title = 'Indikator Disetujui';
        description = `Indikator ${indicatorId} pada bundle ${bundleId} telah disetujui.`;
        break;
      case 'revision':
        title = 'Revisi Diminta untuk Indikator';
        description = `Permintaan revisi untuk indikator ${indicatorId} pada bundle ${bundleId} telah dikirim.`;
        break;
      case 'rejected':
        title = 'Indikator Ditolak';
        description = `Indikator ${indicatorId} pada bundle ${bundleId} telah ditolak.`;
        break;
    }

    toast({
      title: title,
      description: description,
      duration: 3000,
    });
  };

  return (
    <Dialog onOpenChange={(open) => !open && setPreviewIndicator(null)}>
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
                  <Select value={puskesmasFilter} onValueChange={setPuskesmasFilter}>
                    <SelectTrigger className="w-full">
                      <Search className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter Puskesmas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Puskesmas</SelectItem>
                      {puskesmasNames.map(name => <SelectItem key={name} value={name}>{name}</SelectItem>)}
                    </SelectContent>
                  </Select>
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
                <Select value={yearFilter} onValueChange={setYearFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter Tahun" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Tahun</SelectItem>
                    {years.map(year => <SelectItem key={year} value={year}>{year}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={indicatorFilter} onValueChange={setIndicatorFilter}>
                  <SelectTrigger className="w-full sm:w-64">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter Indikator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Indikator</SelectItem>
                    {indicatorNames.map(name => <SelectItem key={name} value={name}>{name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Validation Items */}
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <Collapsible
                key={item.id}
                open={openItemId === item.id}
                onOpenChange={() => setOpenItemId(prevId => prevId === item.id ? null : item.id)}
                className="space-y-2"
              >
                <Card className="hover:shadow-md transition-shadow">
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
                            <span className="font-medium">Indikator:</span> {item.indicators.length}
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
                        <CollapsibleTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            {openItemId === item.id ? 'Tutup Detail' : 'Lihat Detail'}
                            <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${openItemId === item.id ? 'rotate-180' : ''}`} />
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                    </div>
                  </CardContent>
                  <CollapsibleContent className="p-0">
                    <div className="border-t">
                      <div className="p-4 bg-gray-50/50">
                        <h4 className="font-semibold">Detail Indikator</h4>
                      </div>
                      <div className="p-4">
                        <table className="w-full text-sm">
                          <thead className="border-b">
                            <tr className="text-left text-gray-600">
                              <th className="p-2">Indikator</th>
                              <th className="p-2">Nilai</th>
                              <th className="p-2">Status</th>
                              <th className="p-2">Komentar</th>
                              <th className="p-2">Reviewer</th>
                              <th className="p-2 text-center">Pratinjau</th>
                              <th className="p-2 text-right">Aksi</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.indicators.map(indicator => (
                              <tr key={indicator.id} className="border-b last:border-none">
                                <td className="p-2">{indicator.name}</td>
                                <td className="p-2">{indicator.value}</td>
                                <td className="p-2">{getStatusBadge(indicator.status)}</td>
                                <td className="p-2">{indicator.comment || "-"}</td>
                                <td className="p-2">{indicator.reviewer || "-"}</td>
                                <td className="p-2 text-center">
                                  <DialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setPreviewIndicator(indicator)}>
                                      <Eye className="h-4 w-4 text-blue-600" />
                                    </Button>
                                  </DialogTrigger>
                                </td>
                                <td className="p-2 text-right">
                                  <div className="flex gap-1 justify-end">
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleIndicatorAction(item.id, indicator.id, 'approved')}>
                                      <CheckCircle className="h-4 w-4 text-green-600" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleIndicatorAction(item.id, indicator.id, 'revision')}>
                                      <Clock className="h-4 w-4 text-orange-600" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleIndicatorAction(item.id, indicator.id, 'rejected')}>
                                      <XCircle className="h-4 w-4 text-red-600" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pratinjau Data Indikator</DialogTitle>
        </DialogHeader>
        {previewIndicator && (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">{previewIndicator.name}</h4>
              <p className="text-sm text-gray-500">Data yang diinput oleh Puskesmas</p>
            </div>
            
            <div className="col-span-2 border-t my-2"></div>

            <h5 className="font-semibold text-sm mb-2">Capaian Bulanan</h5>
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 text-left font-medium">Bulan</th>
                  <th className="p-2 text-left font-medium">Target</th>
                  <th className="p-2 text-left font-medium">Realisasi</th>
                </tr>
              </thead>
              <tbody>
                {previewIndicator.data.monthlyData.map((monthly: any) => (
                  <tr key={monthly.month} className="border-b">
                    <td className="p-2">{monthly.month}</td>
                    <td className="p-2">{monthly.target}</td>
                    <td className="p-2">{monthly.realisasi}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="col-span-2 border-t my-2"></div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
              <div className="font-medium text-gray-500">Evaluasi</div>
              <div>{previewIndicator.data.evaluasi || "-"}</div>
              <div className="font-medium text-gray-500">Analisa</div>
              <div>{previewIndicator.data.analisa || "-"}</div>
              <div className="font-medium text-gray-500">Rencana Tindak Lanjut</div>
              <div>{previewIndicator.data.rtl || "-"}</div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Validasi;