import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Activity, 
  TrendingUp, 
  Shield, 
  Zap, 
  Brain,
  Settings,
  Play,
  Pause,
  BarChart3,
  LineChart,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';
import { mockMarketData, generateRealtimeData, mockModuleConfig } from '../mock/mock';
import MultiAssetCore from './modules/MultiAssetCore';
import StrategySwarm from './modules/StrategySwarm';
import OnChainIntegrator from './modules/OnChainIntegrator';
import GuardianAngel from './modules/GuardianAngel';
import CentralCommand from './modules/CentralCommand';
import ModuleManager from './modules/ModuleManager';

const Dashboard = () => {
  const [marketData, setMarketData] = useState(mockMarketData);
  const [moduleConfig, setModuleConfig] = useState(mockModuleConfig);
  const [systemStatus, setSystemStatus] = useState('active');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update real-time data every 2 seconds
    const dataInterval = setInterval(() => {
      setMarketData(generateRealtimeData());
    }, 2000);

    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(dataInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const handleSystemToggle = () => {
    setSystemStatus(prev => prev === 'active' ? 'paused' : 'active');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Matrix Background Effect */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]"></div>
      </div>

      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-slate-900" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                    QUANTUM TRADE MATRIX
                  </h1>
                  <p className="text-sm text-slate-400">Tactical Order Core (T.O.C.)</p>
                </div>
              </div>
              <div className={`w-3 h-3 rounded-full ${getStatusColor(systemStatus)} animate-pulse`}></div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-slate-400">System Time</div>
                <div className="text-sm font-mono text-cyan-400">
                  {currentTime.toLocaleTimeString()}
                </div>
              </div>
              <Button 
                variant={systemStatus === 'active' ? 'destructive' : 'default'}
                size="sm"
                onClick={handleSystemToggle}
                className="flex items-center space-x-2"
              >
                {systemStatus === 'active' ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause System</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Resume System</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800 border-slate-700">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="assets" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Assets</span>
            </TabsTrigger>
            <TabsTrigger value="strategies" className="flex items-center space-x-2">
              <Brain className="w-4 h-4" />
              <span>Strategies</span>
            </TabsTrigger>
            <TabsTrigger value="signals" className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Signals</span>
            </TabsTrigger>
            <TabsTrigger value="risk" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Risk</span>
            </TabsTrigger>
            <TabsTrigger value="modules" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Modules</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <CentralCommand 
              data={marketData} 
              systemStatus={systemStatus}
            />
          </TabsContent>

          <TabsContent value="assets" className="space-y-6">
            <MultiAssetCore 
              data={marketData.assets} 
              systemStatus={systemStatus}
            />
          </TabsContent>

          <TabsContent value="strategies" className="space-y-6">
            <StrategySwarm 
              data={marketData.strategies} 
              systemStatus={systemStatus}
            />
          </TabsContent>

          <TabsContent value="signals" className="space-y-6">
            <OnChainIntegrator 
              data={marketData.onChainSignals} 
              systemStatus={systemStatus}
            />
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <GuardianAngel 
              data={marketData.riskMetrics} 
              systemStatus={systemStatus}
            />
          </TabsContent>

          <TabsContent value="modules" className="space-y-6">
            <ModuleManager 
              moduleConfig={moduleConfig}
              onConfigChange={setModuleConfig}
            />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-400">
              Quantum Trade Matrix © 2025 - All systems operational
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-400 border-green-400">
                <CheckCircle className="w-3 h-3 mr-1" />
                Live
              </Badge>
              <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                <Clock className="w-3 h-3 mr-1" />
                Real-time
              </Badge>
              <Badge variant="outline" className="text-teal-400 border-teal-400">
                <Target className="w-3 h-3 mr-1" />
                Adaptive
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;