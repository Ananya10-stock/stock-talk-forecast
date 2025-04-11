
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import StockSelector from '@/components/StockSelector';
import PredictionSettings from '@/components/PredictionSettings';
import StockChart from '@/components/StockChart';
import StockSummary from '@/components/StockSummary';
import PredictionTable from '@/components/PredictionTable';
import { useToast } from '@/components/ui/use-toast';
import { 
  fetchHistoricalData, 
  generatePredictions, 
  fetchCurrentPrice,
  calculatePredictionAccuracy
} from '@/services/stockDataService';

const Predictions = () => {
  const { toast } = useToast();
  
  // State variables
  const [selectedStock, setSelectedStock] = useState<{ symbol: string; name: string } | null>(null);
  const [daysToPredict, setDaysToPredict] = useState<number>(7);
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [predictedData, setPredictedData] = useState<any[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number | undefined>(undefined);
  const [predictionAccuracy, setPredictionAccuracy] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState({
    historical: false,
    predictions: false,
    currentPrice: false
  });

  // Fetch historical data when stock is selected
  useEffect(() => {
    if (selectedStock) {
      const fetchData = async () => {
        setLoading(prev => ({ ...prev, historical: true }));
        try {
          const data = await fetchHistoricalData(selectedStock.symbol);
          setHistoricalData(data);
          
          // Also fetch current price
          setLoading(prev => ({ ...prev, currentPrice: true }));
          const price = await fetchCurrentPrice(selectedStock.symbol);
          setCurrentPrice(price);
          
          toast({
            title: "Stock data loaded",
            description: `Historical data for ${selectedStock.symbol} has been loaded successfully.`,
          });
        } catch (error) {
          console.error('Error fetching historical data:', error);
          toast({
            title: "Error",
            description: "Failed to load historical stock data. Please try again.",
            variant: "destructive",
          });
        } finally {
          setLoading(prev => ({ ...prev, historical: false, currentPrice: false }));
        }
      };
      
      fetchData();
    } else {
      // Reset data if no stock is selected
      setHistoricalData([]);
      setPredictedData([]);
      setCurrentPrice(undefined);
    }
  }, [selectedStock, toast]);

  // Handle stock selection
  const handleSelectStock = (stock: { symbol: string; name: string }) => {
    setSelectedStock(stock);
    setPredictedData([]); // Clear previous predictions
  };

  // Handle days to predict change
  const handleDaysChange = (days: number) => {
    setDaysToPredict(days);
  };

  // Generate predictions
  const handleGeneratePredictions = async () => {
    if (!selectedStock || historicalData.length === 0) {
      toast({
        title: "Selection Required",
        description: "Please select a stock first before generating predictions.",
        variant: "destructive",
      });
      return;
    }

    setLoading(prev => ({ ...prev, predictions: true }));
    try {
      // Generate predictions based on historical data
      const predictions = await generatePredictions(
        selectedStock.symbol,
        daysToPredict,
        historicalData
      );
      setPredictedData(predictions);
      
      // Calculate prediction accuracy
      const accuracy = await calculatePredictionAccuracy();
      setPredictionAccuracy(accuracy);
      
      toast({
        title: "Predictions Generated",
        description: `${daysToPredict} day price forecast for ${selectedStock.symbol} is ready.`,
      });
    } catch (error) {
      console.error('Error generating predictions:', error);
      toast({
        title: "Error",
        description: "Failed to generate predictions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, predictions: false }));
    }
  };

  // Calculate summary information for the StockSummary component
  const stockSummaryInfo = {
    symbol: selectedStock?.symbol || '',
    name: selectedStock?.name || '',
    currentPrice: currentPrice,
    predictionDays: daysToPredict,
    predictedHighest: predictedData.length > 0 
      ? Math.max(...predictedData.map(d => parseFloat(d.predictedClose))) 
      : undefined,
    predictedLowest: predictedData.length > 0 
      ? Math.min(...predictedData.map(d => parseFloat(d.predictedClose))) 
      : undefined,
    predictedAccuracy: predictionAccuracy
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container py-8">
        <h1 className="text-2xl font-bold mb-6">Stock Price Predictions</h1>

        <div className="grid gap-6 md:grid-cols-12">
          {/* Stock selection and settings */}
          <div className="md:col-span-8">
            <StockSelector onSelectStock={handleSelectStock} />
          </div>
          <div className="md:col-span-4">
            <PredictionSettings
              daysToPredict={daysToPredict}
              onDaysChange={handleDaysChange}
              onPredict={handleGeneratePredictions}
            />
          </div>
        </div>

        {/* Stock summary */}
        <div className="mt-8">
          <StockSummary stockInfo={stockSummaryInfo} />
        </div>

        {/* Charts and predictions */}
        <div className="mt-8 grid gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <StockChart 
              historicalData={historicalData}
              predictedData={predictedData}
              stockSymbol={selectedStock?.symbol || ''}
              isLoading={loading.historical || loading.predictions}
            />
          </div>
          <div className="md:col-span-5">
            <PredictionTable 
              predictedData={predictedData}
              isLoading={loading.predictions}
            />
          </div>
        </div>
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © 2025 Stock Talk. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="/about" className="text-sm text-gray-500 hover:underline">About</a>
            <a href="/predictions" className="text-sm text-gray-500 hover:underline">Predictions</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Predictions;
