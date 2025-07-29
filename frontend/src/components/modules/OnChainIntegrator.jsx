import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Wifi, 
  Activity, 
  TrendingUp,
  TrendingDown,
  AlertCircle,
  DollarSign,
  Zap,
  Database,
  Globe,
  ArrowUp,
  ArrowDown,
  Eye,
  Waves,
  BarChart3
} from 'lucide-react';

const OnChainIntegrator = ({ data, systemStatus }) => {
  const [selectedSignal, setSelectedSignal] = useState(null);

  const WhaleActivityCard = ({ activity }) => {
    const isPositive = activity.action === 'BUY';
    
    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-sm">{activity.wallet}</span>
            </div>
            <Badge variant={isPositive ? 'default' : 'destructive'}>
              {activity.action}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <div className="text-sm text-slate-400">Asset</div>
              <div className="font-semibold text-cyan-400">{activity.asset}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400">Amount</div>
              <div className="font-semibold text-white">
                {activity.amount.toLocaleString()}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-sm text-slate-400">Confidence</div>
              <div className="w-16 bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-green-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${activity.confidence * 100}%` }}
                />
              </div>
            </div>
            <div className="text-xs text-slate-400">
              {new Date(activity.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const FundingRateCard = ({ rate }) => {
    const isPositive = rate.rate > 0;
    
    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold">{rate.exchange}</span>
            </div>
            <Badge variant={isPositive ? 'default' : 'destructive'}>
              {rate.pair}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <div className="text-2xl font-bold text-cyan-400">
              {(rate.rate * 100).toFixed(4)}%
            </div>
            <div className={`flex items-center space-x-1 ${
              rate.trend === 'INCREASING' ? 'text-green-400' : 
              rate.trend === 'DECREASING' ? 'text-red-400' : 'text-yellow-400'
            }`}>
              {rate.trend === 'INCREASING' ? <ArrowUp className="w-4 h-4" /> : 
               rate.trend === 'DECREASING' ? <ArrowDown className="w-4 h-4" /> : 
               <Waves className="w-4 h-4" />}
              <span className="text-sm">{rate.trend}</span>
            </div>
          </div>
          
          <div className="text-xs text-slate-400">
            Updated: {new Date(rate.timestamp).toLocaleTimeString()}
          </div>
        </CardContent>
      </Card>
    );
  };

  const GlassnodeMetrics = () => {
    const metrics = [
      { name: 'Network Value', value: data.glassnode.networkValue, unit: '$', format: 'currency' },
      { name: 'Active Addresses', value: data.glassnode.activeAddresses, unit: '', format: 'number' },
      { name: 'Exchange Outflow', value: data.glassnode.exchangeOutflow, unit: 'BTC', format: 'number' },
      { name: 'MVRV Ratio', value: data.glassnode.mvrv, unit: '', format: 'decimal' },
      { name: 'Fear & Greed', value: data.glassnode.fear_greed, unit: '', format: 'percent' }
    ];

    const formatValue = (value, format) => {
      switch (format) {
        case 'currency':
          return `$${(value / 1e12).toFixed(2)}T`;
        case 'number':
          return value.toLocaleString();
        case 'decimal':
          return value.toFixed(2);
        case 'percent':
          return `${value}/100`;
        default:
          return value;
      }
    };

    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <span>Glassnode Metrics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.map((metric, idx) => (
              <div key={idx} className="text-center p-3 bg-slate-700/50 rounded-lg">
                <div className="text-sm text-slate-400">{metric.name}</div>
                <div className="text-lg font-bold text-cyan-400">
                  {formatValue(metric.value, metric.format)}
                  {metric.unit && <span className="text-sm ml-1">{metric.unit}</span>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const SignalStrength = () => {
    const signals = [
      { name: 'Whale Activity', strength: 87, trend: 'bullish' },
      { name: 'Funding Rates', strength: 65, trend: 'neutral' },
      { name: 'On-Chain Volume', strength: 73, trend: 'bullish' },
      { name: 'Network Health', strength: 91, trend: 'bullish' },
      { name: 'DeFi Flows', strength: 58, trend: 'bearish' }
    ];

    const getTrendColor = (trend) => {
      switch (trend) {
        case 'bullish': return 'text-green-400';
        case 'bearish': return 'text-red-400';
        default: return 'text-yellow-400';
      }
    };

    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            <span>Signal Strength</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {signals.map((signal, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${getTrendColor(signal.trend).replace('text-', 'bg-')}`} />
                  <span className="text-sm">{signal.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-slate-600 rounded-full h-2">
                    <div 
                      className="bg-cyan-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${signal.strength}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-cyan-400">{signal.strength}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const DataStreamStatus = () => {
    const streams = [
      { name: 'Ethereum Mainnet', status: 'active', latency: 120, throughput: 1250 },
      { name: 'Binance Smart Chain', status: 'active', latency: 85, throughput: 890 },
      { name: 'Polygon', status: 'active', latency: 95, throughput: 1100 },
      { name: 'Arbitrum', status: 'warning', latency: 340, throughput: 450 },
      { name: 'Optimism', status: 'active', latency: 110, throughput: 780 }
    ];

    const getStatusColor = (status) => {
      switch (status) {
        case 'active': return 'bg-green-400';
        case 'warning': return 'bg-yellow-400';
        case 'error': return 'bg-red-400';
        default: return 'bg-gray-400';
      }
    };

    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-cyan-400" />
            <span>Data Stream Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {streams.map((stream, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(stream.status)} animate-pulse`} />
                  <span className="text-sm">{stream.name}</span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-slate-400">
                  <span>{stream.latency}ms</span>
                  <span>{stream.throughput} tx/s</span>
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
      {/* Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SignalStrength />
        <DataStreamStatus />
      </div>

      {/* Detailed Analysis */}
      <Tabs defaultValue="whale" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-slate-700">
          <TabsTrigger value="whale" className="flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>Whale Activity</span>
          </TabsTrigger>
          <TabsTrigger value="funding" className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4" />
            <span>Funding Rates</span>
          </TabsTrigger>
          <TabsTrigger value="glassnode" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Glassnode</span>
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4" />
            <span>Alerts</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="whale" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-cyan-400" />
                  <span>Whale Movement Tracker</span>
                </span>
                <Badge variant="outline">
                  {data.whaleActivity.length} Active
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.whaleActivity.map((activity, idx) => (
                  <WhaleActivityCard key={idx} activity={activity} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funding" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-cyan-400" />
                <span>Funding Rate Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.fundingRates.map((rate, idx) => (
                  <FundingRateCard key={idx} rate={rate} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="glassnode" className="space-y-6">
          <GlassnodeMetrics />
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-cyan-400" />
                <span>On-Chain Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                  <div>
                    <div className="font-medium">Large ETH Whale Movement</div>
                    <div className="text-sm text-slate-400">
                      15,420 ETH moved from Binance to unknown wallet
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-green-400/10 border border-green-400/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="font-medium">Funding Rate Divergence</div>
                    <div className="text-sm text-slate-400">
                      BTC funding rates turning negative across multiple exchanges
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-cyan-400/10 border border-cyan-400/20 rounded-lg">
                  <Wifi className="w-5 h-5 text-cyan-400" />
                  <div>
                    <div className="font-medium">Network Activity Spike</div>
                    <div className="text-sm text-slate-400">
                      Ethereum network activity up 47% in the last hour
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OnChainIntegrator;