import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUp, 
  ArrowDown,
  Activity,
  DollarSign,
  BarChart3,
  Zap,
  Globe,
  Bitcoin,
  Banknote,
  Coins
} from 'lucide-react';

const MultiAssetCore = ({ data, systemStatus }) => {
  const [selectedAsset, setSelectedAsset] = useState('forex');

  const getAssetIcon = (type) => {
    const iconMap = {
      forex: Globe,
      crypto: Bitcoin,
      indices: BarChart3,
      commodities: Coins
    };
    return iconMap[type] || Activity;
  };

  const AssetCard = ({ asset }) => {
    const isPositive = asset.change > 0;
    
    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold text-white">{asset.symbol}</div>
            <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              <span className="text-sm">{Math.abs(asset.changePercent).toFixed(2)}%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-cyan-400 mb-1">
            {asset.price.toLocaleString()}
          </div>
          <div className="text-sm text-slate-400 mb-2">
            Vol: {(asset.volume / 1e9).toFixed(1)}B
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-cyan-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(Math.abs(asset.changePercent) * 10, 100)}%` }}
            />
          </div>
        </CardContent>
      </Card>
    );
  };

  const AssetTypeOverview = ({ type, assets }) => {
    const Icon = getAssetIcon(type);
    const totalVolume = assets.reduce((sum, asset) => sum + asset.volume, 0);
    const avgChange = assets.reduce((sum, asset) => sum + asset.changePercent, 0) / assets.length;
    const positiveAssets = assets.filter(asset => asset.change > 0).length;
    
    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon className="w-5 h-5 text-cyan-400" />
            <span>{type.toUpperCase()}</span>
            <Badge variant="outline" className="ml-auto">
              {assets.length} Assets
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-slate-700/50 rounded-lg">
              <div className="text-sm text-slate-400">Total Volume</div>
              <div className="text-lg font-semibold text-cyan-400">
                ${(totalVolume / 1e9).toFixed(1)}B
              </div>
            </div>
            <div className="text-center p-3 bg-slate-700/50 rounded-lg">
              <div className="text-sm text-slate-400">Avg Change</div>
              <div className={`text-lg font-semibold ${avgChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {avgChange >= 0 ? '+' : ''}{avgChange.toFixed(2)}%
              </div>
            </div>
            <div className="text-center p-3 bg-slate-700/50 rounded-lg">
              <div className="text-sm text-slate-400">Positive</div>
              <div className="text-lg font-semibold text-teal-400">
                {positiveAssets}/{assets.length}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assets.map((asset, idx) => (
              <AssetCard key={idx} asset={asset} />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const MarketHeatmap = () => {
    const allAssets = [
      ...data.forex.map(a => ({ ...a, type: 'forex' })),
      ...data.crypto.map(a => ({ ...a, type: 'crypto' })),
      ...data.indices.map(a => ({ ...a, type: 'indices' })),
      ...data.commodities.map(a => ({ ...a, type: 'commodities' }))
    ];

    const getHeatColor = (change) => {
      if (change > 2) return 'bg-green-600';
      if (change > 0) return 'bg-green-500';
      if (change > -2) return 'bg-red-500';
      return 'bg-red-600';
    };

    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <span>Market Heatmap</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-8 gap-2">
            {allAssets.map((asset, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg ${getHeatColor(asset.changePercent)} transition-all duration-200 hover:scale-105 cursor-pointer`}
                title={`${asset.symbol}: ${asset.changePercent.toFixed(2)}%`}
              >
                <div className="text-white text-xs font-medium text-center">
                  {asset.symbol.split('/')[0]}
                </div>
                <div className="text-white text-xs text-center mt-1">
                  {asset.changePercent.toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const CorrelationMatrix = () => {
    const correlations = [
      { pair: 'EUR/USD - GBP/USD', correlation: 0.82 },
      { pair: 'BTC/USD - ETH/USD', correlation: 0.76 },
      { pair: 'GOLD - DXY', correlation: -0.68 },
      { pair: 'SPX500 - NASDAQ', correlation: 0.91 },
      { pair: 'CRUDE - CAD', correlation: 0.54 }
    ];

    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            <span>Cross-Asset Correlations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {correlations.map((corr, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div className="text-sm">{corr.pair}</div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-slate-600 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        corr.correlation > 0 ? 'bg-green-400' : 'bg-red-400'
                      }`}
                      style={{ width: `${Math.abs(corr.correlation) * 100}%` }}
                    />
                  </div>
                  <div className={`text-sm font-medium ${
                    corr.correlation > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {corr.correlation.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MarketHeatmap />
        <CorrelationMatrix />
      </div>

      {/* Asset Type Tabs */}
      <Tabs value={selectedAsset} onValueChange={setSelectedAsset}>
        <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-slate-700">
          <TabsTrigger value="forex" className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span>Forex</span>
          </TabsTrigger>
          <TabsTrigger value="crypto" className="flex items-center space-x-2">
            <Bitcoin className="w-4 h-4" />
            <span>Crypto</span>
          </TabsTrigger>
          <TabsTrigger value="indices" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Indices</span>
          </TabsTrigger>
          <TabsTrigger value="commodities" className="flex items-center space-x-2">
            <Coins className="w-4 h-4" />
            <span>Commodities</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="forex" className="space-y-6">
          <AssetTypeOverview type="forex" assets={data.forex} />
        </TabsContent>

        <TabsContent value="crypto" className="space-y-6">
          <AssetTypeOverview type="crypto" assets={data.crypto} />
        </TabsContent>

        <TabsContent value="indices" className="space-y-6">
          <AssetTypeOverview type="indices" assets={data.indices} />
        </TabsContent>

        <TabsContent value="commodities" className="space-y-6">
          <AssetTypeOverview type="commodities" assets={data.commodities} />
        </TabsContent>
      </Tabs>

      {/* Real-time Feed */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <span>Real-time Price Feed</span>
            <Badge variant={systemStatus === 'active' ? 'default' : 'destructive'}>
              {systemStatus === 'active' ? 'LIVE' : 'PAUSED'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...data.forex.slice(0, 2), ...data.crypto.slice(0, 2)].map((asset, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div>
                  <div className="font-medium text-white">{asset.symbol}</div>
                  <div className="text-sm text-slate-400">
                    {asset.price.toLocaleString()}
                  </div>
                </div>
                <div className={`text-right ${asset.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  <div className="text-sm font-medium">
                    {asset.change > 0 ? '+' : ''}{asset.changePercent.toFixed(2)}%
                  </div>
                  <div className="text-xs">
                    {asset.change > 0 ? '+' : ''}{asset.change.toFixed(4)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiAssetCore;