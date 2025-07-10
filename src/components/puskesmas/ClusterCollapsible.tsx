
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Folder, FolderOpen } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { PuskesmasIndicatorCard } from "./PuskesmasIndicatorCard";

interface Indicator {
  id: string;
  name: string;
  type: 'target' | 'score';
  description: string;
  status: string;
  targetData?: {
    unit: string;
    formula: string;
  };
  scoreData?: {
    score0: string;
    score4: string;
    score7: string;
    score10: string;
  };
}

interface Cluster {
  id: string;
  name: string;
  indicators: Indicator[];
}

interface ClusterCollapsibleProps {
  cluster: Cluster;
  getStatusBadge: (status: string) => React.ReactNode;
}

export const ClusterCollapsible: React.FC<ClusterCollapsibleProps> = ({ 
  cluster, 
  getStatusBadge 
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const filledCount = cluster.indicators.filter(ind => ind.status === 'filled').length;
  const totalCount = cluster.indicators.length;

  return (
    <Card className="border-purple-200 shadow-sm overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-purple-50/50 transition-colors border-b border-purple-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isOpen ? (
                  <FolderOpen className="h-5 w-5 text-purple-600" />
                ) : (
                  <Folder className="h-5 w-5 text-purple-600" />
                )}
                <div>
                  <h3 className="font-semibold text-lg text-purple-900">{cluster.name}</h3>
                  <p className="text-sm text-purple-700">
                    {filledCount} dari {totalCount} indikator telah diisi
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(filledCount / totalCount) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-purple-700">
                    {Math.round((filledCount / totalCount) * 100)}%
                  </span>
                </div>
                {isOpen ? (
                  <ChevronDown className="h-5 w-5 text-purple-600" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-purple-600" />
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="p-0">
            <div className="space-y-4 p-6">
              {cluster.indicators.map((indicator) => (
                <PuskesmasIndicatorCard
                  key={indicator.id}
                  indicator={indicator}
                  getStatusBadge={getStatusBadge}
                />
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
