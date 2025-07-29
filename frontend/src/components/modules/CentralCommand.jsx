import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Target,
  Zap,
  Shield,
  BarChart3,
  LineChart,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const CentralCommand = ({ data, systemStatus }) => {
  const { performance, riskMetrics, strategies, marketConditions } = data;

  const MetricCard = ({ title, value, change, icon: Icon, suffix = '', color = 'text-cyan-400' }) => (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400 mb-1">{title}</p>
            <p className={`text-2xl font-bold ${color}`}>
              {typeof value === 'number' ? value.toLocaleString() : value}{suffix}
            </p>
            {change && (
              <div className="flex items-center mt-1">
                {change > 0 ? (
                  <ArrowUp className="w-4 h-4 text-green-400 mr-1" />
                ) : (
                  <ArrowDown className="w-4 h-4 text-red-400 mr-1" />
                )}
                <span className={`text-sm ${change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {Math.abs(change).toFixed(2)}%
                </span>
              </div>
            )}
          </div>
          <div className="p-3 bg-slate-700/50 rounded-lg">
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const SystemHealthCard = () => (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-cyan-400" />
          <span>System Health</span>
          <Badge variant={systemStatus === 'active' ? 'default' : 'destructive'}>
            {systemStatus.toUpperCase()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Core Engine</span>
            <span className="text-green-400">100%</span>
          </div>
          <Progress value={100} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Strategy Swarm</span>
            <span className="text-cyan-400">94%</span>
          </div>
          <Progress value={94} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Risk Manager</span>
            <span className="text-teal-400">98%</span>
          </div>
          <Progress value={98} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Data Streams</span>
            <span className="text-green-400">97%</span>
          </div>
          <Progress value={97} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );

  const MarketConditionsCard = () => (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          <span>Market Conditions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-slate-700/50 rounded-lg">
            <div className="text-sm text-slate-400">Regime</div>
            <div className="text-lg font-semibold text-cyan-400">
              {marketConditions.currentRegime.replace('_', ' ')}
            </div>
          </div>
          <div className="text-center p-3 bg-slate-700/50 rounded-lg">
            <div className="text-sm text-slate-400">Sentiment</div>
            <div className="text-lg font-semibold text-green-400">
              {marketConditions.sentiment}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          {marketConditions.conditions.map((condition, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
              <span className="text-sm">{condition.name}</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-slate-600 rounded-full h-2">
                  <div 
                    className="bg-cyan-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${condition.suitability * 100}%` }}
                  />
                </div>
                <Badge variant={condition.active ? 'default' : 'secondary'} className="text-xs">
                  {condition.active ? 'ON' : 'OFF'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <MetricCard
          title="Daily P&L"
          value={riskMetrics.dailyPnL}
          change={2.34}
          icon={DollarSign}
          suffix="$"
          color="text-green-400"
        />
        <MetricCard
          title="Total P&L"
          value={performance.totalPnL}
          change={1.89}
          icon={TrendingUp}
          suffix="$"
          color="text-cyan-400"
        />
        <MetricCard
          title="Sharpe Ratio"
          value={riskMetrics.sharpeRatio}
          change={0.12}
          icon={Target}
          color="text-teal-400"
        />
        <MetricCard
          title="Max Drawdown"
          value={riskMetrics.maxDrawdown}
          change={-0.3}
          icon={TrendingDown}
          suffix="%"
          color="text-red-400"
        />
        <MetricCard
          title="Active Trades"
          value={riskMetrics.activeTrades}
          icon={Activity}
          color="text-yellow-400"
        />
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SystemHealthCard />
        <MarketConditionsCard />
        
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              <span>Live Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                <div className="text-sm text-slate-400">Win Rate</div>
                <div className="text-2xl font-bold text-green-400">
                  {strategies.winRate.toFixed(1)}%
                </div>
              </div>
              <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                <div className="text-sm text-slate-400">Strategies</div>
                <div className="text-2xl font-bold text-cyan-400">
                  {strategies.active}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Daily Trades</span>
                <span className="text-cyan-400">{riskMetrics.dailyTrades}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Monthly Return</span>
                <span className="text-green-400">{performance.monthlyReturn}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Annualized Return</span>
                <span className="text-teal-400">{performance.annualizedReturn}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Alerts */}
      {riskMetrics.alerts.length > 0 && (
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-yellow-400" />
              <span>Risk Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {riskMetrics.alerts.map((alert, idx) => (
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
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CentralCommand;