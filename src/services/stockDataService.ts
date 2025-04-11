
// This is a mock service that simulates API calls to get stock data

// Generate historical data (past 30 days)
export const fetchHistoricalData = async (symbol: string): Promise<any[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Generate mock historical data
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 30);

  const data = [];
  let currentDate = new Date(startDate);
  
  // Create a base price that's somewhat realistic
  const basePrice = symbol === 'AAPL' ? 180 :
                   symbol === 'MSFT' ? 330 :
                   symbol === 'GOOGL' ? 140 :
                   symbol === 'AMZN' ? 160 :
                   symbol === 'TSLA' ? 220 :
                   symbol === 'META' ? 470 :
                   symbol === 'NVDA' ? 800 :
                   symbol === 'JPM' ? 190 : 100;
  
  let price = basePrice;
  let volatility = basePrice * 0.02; // 2% of base price for volatility

  while (currentDate <= endDate) {
    // Don't include weekends in our data
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      // Random price fluctuation
      const change = (Math.random() - 0.5) * volatility;
      price = Math.max(price + change, price * 0.9); // Ensure price doesn't go too low
      
      // Generate open, high, low, close prices
      const open = price;
      const close = open + (Math.random() - 0.5) * (volatility * 0.5);
      const high = Math.max(open, close) + Math.random() * (volatility * 0.3);
      const low = Math.min(open, close) - Math.random() * (volatility * 0.3);
      
      data.push({
        date: currentDate.toISOString().split('T')[0],
        open: open.toFixed(2),
        high: high.toFixed(2),
        low: low.toFixed(2),
        close: close.toFixed(2),
        volume: Math.floor(Math.random() * 10000000) + 1000000
      });
      
      price = close; // Next day starts at previous close
    }
    
    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

// Generate prediction data
export const generatePredictions = async (
  symbol: string, 
  days: number, 
  historicalData: any[]
): Promise<any[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  if (!historicalData || historicalData.length === 0) {
    return [];
  }

  const predictions = [];
  const lastDataPoint = historicalData[historicalData.length - 1];
  let lastClose = parseFloat(lastDataPoint.close);
  let lastOpen = parseFloat(lastDataPoint.open);
  
  // Use the volatility from historical data to make predictions more realistic
  const priceChanges = historicalData.slice(1).map((data, i) => {
    return Math.abs(parseFloat(data.close) - parseFloat(historicalData[i].close));
  });
  
  const avgVolatility = priceChanges.reduce((sum, change) => sum + change, 0) / priceChanges.length;
  const trend = determineStockTrend(historicalData);
  
  // Start date for predictions is the day after the last historical date
  const startDate = new Date(lastDataPoint.date);
  startDate.setDate(startDate.getDate() + 1);
  
  let currentDate = new Date(startDate);
  
  for (let i = 0; i < days; i++) {
    // Skip weekends
    while (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Calculate predicted values with some randomness but following the trend
    const trendFactor = trend === 'up' ? 0.6 : trend === 'down' ? -0.6 : 0;
    const randomFactor = Math.random() - 0.5;
    
    // Predicted close combines trend and randomness
    const predictedClose = lastClose * (1 + (trendFactor * 0.01) + (randomFactor * 0.02));
    
    // Predicted open is based on the previous close with some noise
    const predictedOpen = lastClose * (1 + (Math.random() - 0.5) * 0.01);
    
    predictions.push({
      date: currentDate.toISOString().split('T')[0],
      predictedOpen: predictedOpen.toFixed(2),
      predictedClose: predictedClose.toFixed(2),
      predictedHigh: Math.max(predictedOpen, predictedClose) * (1 + Math.random() * 0.01).toFixed(2),
      predictedLow: Math.min(predictedOpen, predictedClose) * (1 - Math.random() * 0.01).toFixed(2),
    });
    
    // Update for next iteration
    lastClose = predictedClose;
    lastOpen = predictedOpen;
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return predictions;
};

// Helper function to determine stock trend from historical data
const determineStockTrend = (historicalData: any[]): 'up' | 'down' | 'neutral' => {
  if (historicalData.length < 5) return 'neutral';
  
  const recentData = historicalData.slice(-5);
  const firstClose = parseFloat(recentData[0].close);
  const lastClose = parseFloat(recentData[recentData.length - 1].close);
  
  const percentChange = ((lastClose - firstClose) / firstClose) * 100;
  
  if (percentChange > 1) return 'up';
  if (percentChange < -1) return 'down';
  return 'neutral';
};

// Get current price
export const fetchCurrentPrice = async (symbol: string): Promise<number> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, this would fetch the current price from a real stock API
  // For demo purposes, we'll generate a realistic price
  const basePrice = symbol === 'AAPL' ? 180 :
                   symbol === 'MSFT' ? 330 :
                   symbol === 'GOOGL' ? 140 :
                   symbol === 'AMZN' ? 160 :
                   symbol === 'TSLA' ? 220 :
                   symbol === 'META' ? 470 :
                   symbol === 'NVDA' ? 800 :
                   symbol === 'JPM' ? 190 : 100;
  
  // Add a small random fluctuation
  const fluctuation = (Math.random() - 0.5) * (basePrice * 0.01);
  return basePrice + fluctuation;
};

// Get prediction accuracy (mock implementation)
export const calculatePredictionAccuracy = async (): Promise<number> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, this would compare previous predictions with actual outcomes
  // For demo purposes, generate a realistic accuracy percentage
  return 70 + Math.random() * 20; // Between 70% and 90%
};
