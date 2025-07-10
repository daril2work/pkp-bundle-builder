
import React from 'react';
import { ScoreReferenceGuide } from './ScoreReferenceGuide';
import { QuarterlyScoreInputTabs } from './QuarterlyScoreInputTabs';
import { QuarterlyEvaluationTabs } from './QuarterlyEvaluationTabs';

interface ScoreIndicatorFormProps {
  indicator: any;
  scoreData: {
    score0: string;
    score4: string;
    score7: string;
    score10: string;
  };
}

export const ScoreIndicatorForm: React.FC<ScoreIndicatorFormProps> = ({ 
  indicator, 
  scoreData 
}) => {
  return (
    <div className="space-y-6">
      <ScoreReferenceGuide scoreData={scoreData} />
      <QuarterlyScoreInputTabs scoreData={scoreData} />
      <QuarterlyEvaluationTabs type="score" />
    </div>
  );
};
