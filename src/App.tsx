
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import BundleBuilder from "./pages/BundleBuilder";
import Puskesmas from "./pages/Puskesmas";
import Validasi from "./pages/Validasi";
import Rekap from "./pages/Rekap";
import Pengaturan from "./pages/Pengaturan";
import NotFound from "./pages/NotFound";
import Navigation from "./components/layout/Navigation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bundle" element={<BundleBuilder />} />
            <Route path="/puskesmas" element={<Puskesmas />} />
            <Route path="/validasi" element={<Validasi />} />
            <Route path="/rekap" element={<Rekap />} />
            <Route path="/pengaturan" element={<Pengaturan />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
