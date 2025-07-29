import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Shield, 
  AlertTriangle, 
  TrendingDown,
  TrendingUp,
  Activity,
  Target,
  Zap,
  BarChart3,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Settings
} from 'lucide-react';

const GuardianAngel = ({ data, systemStatus }) => {
  const [riskTolerance, setRiskTolerance] = useState(0.5);

  const RiskMetricCard = ({ title, value, threshold, unit = '', status }) => {
    const getStatusColor = () => {
      switch (status) {
        case 'safe': return 'text-green-400';
        case 'warning': return 'text-yellow-400';
        case 'danger': return 'text-red-400';
        default: return 'text-cyan-400';
      }
    };

    const getStatusIcon = () => {
      switch (status) {
        case 'safe': return CheckCircle;
        case 'warning': return AlertTriangle;
        case 'danger': return XCircle;
        default: return Activity;
      }
    };

    const StatusIcon = getStatusIcon();

    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">{title}</span>
            <StatusIcon className={`w-4 h-4 ${getStatusColor()}`} />
          </div>
          <div className={`text-2xl font-bold ${getStatusColor()}`}>
            {typeof value === 'number' ? value.toLocaleString() : value}{unit}
          </div>
          {threshold && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Threshold</span>
                <span>{threshold}{unit}</span>
              </div>
              <Progress 
                value={Math.min(Math.abs(value / threshold) * 100, 100)} 
                className="h-2"
              />
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const RiskShield = () => {
    const shieldLayers = [
      { name: 'Position Sizing', strength: 94, active: true },
      { name: 'Stop Loss', strength: 87, active: true },
      { name: 'Correlation Filter', strength: 76, active: true },
      { name: 'Volatility Guard', strength: 91, active: true },
      { name: 'Drawdown Protection', strength: 88, active: true }
    ];

    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span>Risk Shield Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {shieldLayers.map((layer, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${layer.active ? 'bg-green-400' : 'bg-gray-400'} animate-pulse`} />
                  <span className="text-sm">{layer.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-slate-600 rounded-full h-2">
                    <div 
                      className="bg-cyan-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${layer.strength}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-cyan-400">{layer.strength}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const VaRAnalysis = () => {
    const varMetrics = [
      { period: '1 Day', value: data.var95, confidence: 95 },
      { period: '1 Week', value: data.var95 * 2.65, confidence: 95 },
      { period: '1 Month', value: data.var95 * 5.48, confidence: 95 },
      { period: '3 Months', value: data.var95 * 9.49, confidence: 95 }
    ];

    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <span>Value at Risk (VaR) Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {varMetrics.map((metric, idx) => (
              <div key={idx} className="text-center p-3 bg-slate-700/50 rounded-lg">
                <div className="text-sm text-slate-400">{metric.period}</div>
                <div className="text-lg font-bold text-red-400">
                  ${Math.abs(metric.value).toLocaleString()}
                </div>
                <div className="text-xs text-slate-400">{metric.confidence}% Confidence</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const PositionSizing = () => {
    const positions = [
      { symbol: 'EUR/USD', size: 0.03, risk: 0.12, kelly: 0.28 },
      { symbol: 'BTC/USD', size: 0.02, risk: 0.08, kelly: 0.24 },
      { symbol: 'GOLD', size: 0.01, risk: 0.05, kelly: 0.15 },
      { symbol: 'SPX500', size: 0.025, risk: 0.10, kelly: 0.22 }
    ];

    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-cyan-400" />
            <span>Position Sizing Matrix</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {positions.map((position, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="font-medium">{position.symbol}</span>
                  <Badge variant="outline" className="text-xs">
                    {(position.size * 100).toFixed(1)}% Size
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="text-red-400">
                    Risk: {(position.risk * 100).toFixed(1)}%
                  </div>
                  <div className="text-green-400">
                    Kelly: {(position.kelly * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const AlertsPanel = () => {
    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <span>Active Risk Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.alerts.map((alert, idx) => (
              <div key={idx} className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  alert.type === 'WARNING' ? 'bg-yellow-400' : 'bg-cyan-400'
                }`} />
                <div className="flex-1">
                  <div className="text-sm font-medium">{alert.message}</div>
                  <div className="text-xs text-slate-400">
                    {alert.timestamp.toLocaleTimeString()}
                  </div>
                </div>
                <Badge variant={alert.type === 'WARNING' ? 'destructive' : 'default'}>
                  {alert.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const RiskControls = () => {
    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-cyan-400" />
            <span>Risk Controls</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Risk Tolerance</span>
              <span className="text-sm text-cyan-400">{(riskTolerance * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={riskTolerance}
              onChange={(e) => setRiskTolerance(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Max Daily Loss</label>
              <input
                type="number"
                className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                placeholder="5000"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Max Drawdown</label>
              <input
                type="number"
                className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                placeholder="10"
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <Button variant="default" size="sm" className="flex-1">
              Apply Settings
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              Reset to Default
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Risk Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <RiskMetricCard
          title="Daily P&L"
          value={data.dailyPnL}
          threshold={50000}
          unit="$"
          status={data.dailyPnL > 0 ? 'safe' : 'warning'}
        />
        <RiskMetricCard
          title="Drawdown"
          value={data.drawdown}
          threshold={-5}
          unit="%"
          status={data.drawdown > -3 ? 'safe' : data.drawdown > -5 ? 'warning' : 'danger'}
        />
        <RiskMetricCard
          title="Sharpe Ratio"
          value={data.sharpeRatio}
          threshold={2.0}
          status={data.sharpeRatio > 2 ? 'safe' : data.sharpeRatio > 1 ? 'warning' : 'danger'}
        />
        <RiskMetricCard
          title="Risk Score"
          value={data.riskScore}
          threshold={0.5}
          status={data.riskScore < 0.3 ? 'safe' : data.riskScore < 0.5 ? 'warning' : 'danger'}
        />
        <RiskMetricCard
          title="Active Trades"
          value={data.activeTrades}
          threshold={30}
          status={data.activeTrades < 25 ? 'safe' : 'warning'}
        />
      </div>

      {/* Detailed Risk Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RiskShield />
        <VaRAnalysis />
      </div>

      {/* Risk Management Tabs */}
      <Tabs defaultValue="positions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-slate-700">
          <TabsTrigger value="positions" className="flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>Positions</span>
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Alerts</span>
          </TabsTrigger>
          <TabsTrigger value="controls" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Controls</span>
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Analysis</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="positions" className="space-y-6">
          <PositionSizing />
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <AlertsPanel />
        </TabsContent>

        <TabsContent value="controls" className="space-y-6">
          <RiskControls />
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-cyan-400" />
                <span>Risk Analysis Dashboard</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Portfolio Health</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Diversification</span>
                      <span className="text-green-400">Good</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Correlation Risk</span>
                      <span className="text-yellow-400">Medium</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Volatility Exposure</span>
                      <span className="text-green-400">Low</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Performance Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Win Rate</span>
                      <span className="text-green-400">{data.winRate.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Win</span>
                      <span className="text-green-400">${data.avgWin.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Loss</span>
                      <span className="text-red-400">${Math.abs(data.avgLoss).toFixed(2)}</span>
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

export default GuardianAngel;