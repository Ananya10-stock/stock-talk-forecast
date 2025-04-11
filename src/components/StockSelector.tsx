
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

// Mock stock symbols for demo
const POPULAR_STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'TSLA', name: 'Tesla, Inc.' },
  { symbol: 'META', name: 'Meta Platforms, Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
];

interface StockSelectorProps {
  onSelectStock: (stock: { symbol: string; name: string }) => void;
}

const StockSelector: React.FC<StockSelectorProps> = ({ onSelectStock }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStock, setSelectedStock] = useState<string>('');

  const handleStockSelect = (value: string) => {
    setSelectedStock(value);
    const stock = POPULAR_STOCKS.find(s => s.symbol === value);
    if (stock) {
      onSelectStock(stock);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would search an API for stock symbols
    console.log('Searching for:', searchQuery);
    // For now, just check if the query matches any of our mock stocks
    const matchedStock = POPULAR_STOCKS.find(
      stock => stock.symbol.toLowerCase() === searchQuery.toLowerCase() || 
              stock.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (matchedStock) {
      setSelectedStock(matchedStock.symbol);
      onSelectStock(matchedStock);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <form onSubmit={handleSearch} className="flex-1 flex">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for a stock symbol or company..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" className="ml-2">Search</Button>
        </form>
        
        <div className="sm:w-64">
          <Select value={selectedStock} onValueChange={handleStockSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select a stock" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Popular Stocks</SelectLabel>
                {POPULAR_STOCKS.map((stock) => (
                  <SelectItem key={stock.symbol} value={stock.symbol}>
                    {stock.symbol} - {stock.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default StockSelector;
