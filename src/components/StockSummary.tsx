
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, TrendingUp, BarChart2, Clock, Target } from 'lucide-react';

interface StockSummaryProps {
  stockInfo: {
    symbol: string;
    name: string;
    currentPrice?: number;
    predictionDays: number;
    predictedHighest?: number;
    predictedLowest?: number;
    predictedAccuracy?: number;
  };
}

const StockSummary: React.FC<StockSummaryProps> = ({ stockInfo }) => {
  const isPredictionAvailable = stockInfo.predictedHighest !== undefined;
  const priceChange = isPredictionAvailable && stockInfo.currentPrice 
    ? stockInfo.predictedHighest - stockInfo.currentPrice 
    : 0;
  const priceChangePercent = isPredictionAvailable && stockInfo.currentPrice 
    ? (priceChange / stockInfo.currentPrice) * 100 
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{stockInfo.symbol} Summary</span>
          {isPredictionAvailable && (
            <span className={`inline-flex items-center gap-1 text-sm ${priceChangePercent >= 0 ? 'text-finance-positive' : 'text-finance-negative'}`}>
              {priceChangePercent >= 0 ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4" />
              )}
              {Math.abs(priceChangePercent).toFixed(2)}%
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xl font-semibold mb-4">{stockInfo.name}</div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="financial-stat">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="financial-stat-label">Current Price</span>
            </div>
            <div className="financial-stat-value">
              {stockInfo.currentPrice 
                ? `$${stockInfo.currentPrice.toFixed(2)}` 
                : 'N/A'}
            </div>
          </div>

          <div className="financial-stat">
            <div className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
              <span className="financial-stat-label">Predicted High</span>
            </div>
            <div className="financial-stat-value">
              {stockInfo.predictedHighest 
                ? `$${stockInfo.predictedHighest.toFixed(2)}` 
                : 'N/A'}
            </div>
          </div>

          <div className="financial-stat">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <span className="financial-stat-label">Predicted Low</span>
            </div>
            <div className="financial-stat-value">
              {stockInfo.predictedLowest 
                ? `$${stockInfo.predictedLowest.toFixed(2)}` 
                : 'N/A'}
            </div>
          </div>

          <div className="financial-stat">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="financial-stat-label">Prediction Timeframe</span>
            </div>
            <div className="financial-stat-value">
              {stockInfo.predictionDays} days
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockSummary;
