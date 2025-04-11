
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PredictionTableProps {
  predictedData: any[];
  isLoading?: boolean;
}

const PredictionTable: React.FC<PredictionTableProps> = ({ predictedData, isLoading = false }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Price Predictions</CardTitle>
          <CardDescription>Loading predicted stock prices...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse-gentle h-40 flex items-center justify-center">
            Loading prediction data...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (predictedData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Price Predictions</CardTitle>
          <CardDescription>Generate predictions to see detailed results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No prediction data available. Select a stock and generate predictions.
          </div>
        </CardContent>
      </Card>
    );
  }

  // For each row, calculate if the price is higher or lower than the previous day
  const dataWithChanges = predictedData.map((day, index) => {
    const prevDay = index > 0 ? predictedData[index - 1] : null;
    const closeChange = prevDay 
      ? Number(day.predictedClose) - Number(prevDay.predictedClose) 
      : 0;
    const openChange = prevDay 
      ? Number(day.predictedOpen) - Number(prevDay.predictedOpen) 
      : 0;
    
    return {
      ...day,
      closeChange,
      closeChangePercent: prevDay 
        ? (closeChange / Number(prevDay.predictedClose)) * 100 
        : 0,
      openChange,
      openChangePercent: prevDay 
        ? (openChange / Number(prevDay.predictedOpen)) * 100 
        : 0
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Predictions</CardTitle>
        <CardDescription>Detailed day-by-day price forecasts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Open Price</TableHead>
                <TableHead>Close Price</TableHead>
                <TableHead className="text-right">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataWithChanges.map((day, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{day.date}</TableCell>
                  <TableCell>${Number(day.predictedOpen).toFixed(2)}</TableCell>
                  <TableCell>${Number(day.predictedClose).toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                      <span 
                        className={cn(
                          "inline-flex items-center gap-1",
                          day.closeChangePercent > 0 ? "text-finance-positive" : 
                          day.closeChangePercent < 0 ? "text-finance-negative" : 
                          "text-muted-foreground"
                        )}
                      >
                        {day.closeChangePercent > 0 ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : day.closeChangePercent < 0 ? (
                          <ArrowDownRight className="h-4 w-4" />
                        ) : null}
                        {Math.abs(day.closeChangePercent).toFixed(2)}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionTable;
