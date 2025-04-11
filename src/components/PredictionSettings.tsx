
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Wand2 } from 'lucide-react';

interface PredictionSettingsProps {
  daysToPredict: number;
  onDaysChange: (days: number) => void;
  onPredict: () => void;
}

const PredictionSettings: React.FC<PredictionSettingsProps> = ({
  daysToPredict,
  onDaysChange,
  onPredict
}) => {
  return (
    <div className="space-y-6 p-4 border rounded-lg bg-card">
      <div>
        <h3 className="text-lg font-medium">Prediction Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure how far into the future you want to predict stock prices.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Days to Predict: {daysToPredict}
          </label>
          <Slider
            defaultValue={[daysToPredict]}
            max={30}
            min={1}
            step={1}
            onValueChange={(value) => onDaysChange(value[0])}
          />
          <span className="flex justify-between text-xs text-muted-foreground">
            <span>1 day</span>
            <span>30 days</span>
          </span>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Prediction Model
          </label>
          <Select defaultValue="ml">
            <SelectTrigger>
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ml">Machine Learning Model</SelectItem>
              <SelectItem value="stat">Statistical Analysis</SelectItem>
              <SelectItem value="hybrid">Hybrid Approach</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={onPredict} 
          className="w-full"
        >
          <Wand2 className="mr-2 h-4 w-4" />
          Generate Predictions
        </Button>
      </div>
    </div>
  );
};

export default PredictionSettings;
