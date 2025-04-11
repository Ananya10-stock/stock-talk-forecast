
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StockChartProps {
  historicalData: any[];
  predictedData: any[];
  stockSymbol: string;
  isLoading?: boolean;
}

const StockChart: React.FC<StockChartProps> = ({
  historicalData,
  predictedData,
  stockSymbol,
  isLoading = false
}) => {
  // Combine historical and predicted data
  const combinedData = [
    ...historicalData,
    ...predictedData
  ];

  // Find the highest and lowest price points for y-axis domain
  const allPrices = combinedData.flatMap(item => [
    Number(item.close),
    Number(item.open)
  ]);
  
  const minPrice = Math.min(...allPrices) * 0.95; // 5% lower than the lowest
  const maxPrice = Math.max(...allPrices) * 1.05; // 5% higher than the highest

  // Find the index where predictions start
  const predictionStartIndex = historicalData.length > 0 ? historicalData.length - 1 : 0;

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Loading Chart...</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="stock-chart-container flex items-center justify-center">
          <div className="animate-pulse-gentle">Loading historical and predicted data...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{stockSymbol} Stock Price Prediction</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="stock-chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={combinedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis 
              domain={[minPrice, maxPrice]} 
              tickFormatter={(value) => `$${value.toFixed(2)}`}
            />
            <Tooltip 
              formatter={(value) => [`$${Number(value).toFixed(2)}`, undefined]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend />
            
            {/* Historical Closing Price */}
            <Line
              type="monotone"
              dataKey="close"
              name="Historical Close"
              stroke="#1976D2"
              strokeWidth={2}
              dot={{ r: 1 }}
              activeDot={{ r: 5 }}
              isAnimationActive={true}
            />
            
            {/* Historical Opening Price */}
            <Line
              type="monotone"
              dataKey="open"
              name="Historical Open"
              stroke="#388E3C"
              strokeWidth={2}
              dot={{ r: 1 }}
              activeDot={{ r: 5 }}
              isAnimationActive={true}
            />
            
            {/* Predicted Closing Price */}
            <Line
              type="monotone"
              dataKey="predictedClose"
              name="Predicted Close"
              stroke="#7B1FA2"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
            />
            
            {/* Predicted Opening Price */}
            <Line
              type="monotone"
              dataKey="predictedOpen"
              name="Predicted Open"
              stroke="#F57C00"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
            />
            
            {/* Vertical line where predictions start */}
            <ReferenceLine
              x={combinedData[predictionStartIndex]?.date}
              stroke="#FF5252"
              strokeWidth={2}
              label="Prediction Start"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StockChart;
