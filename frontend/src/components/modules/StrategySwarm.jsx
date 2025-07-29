import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Brain, 
  Zap, 
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  Shuffle,
  Plus,
  Minus,
  ArrowRight,
  Code,
  Dna,
  Clock,
  Trophy,
  AlertCircle
} from 'lucide-react';

const StrategySwarm = ({ data, systemStatus }) => {
  const [selectedStrategy, setSelectedStrategy] = useState(null);

  const StrategyCard = ({ strategy }) => {
    const isTop = strategy.winRate > 80;
    
    return (
      <Card 
        className={`bg-slate-800/50 border-slate-700 backdrop-blur-sm cursor-pointer transition-all duration-200 hover:bg-slate-800/70 ${
          selectedStrategy?.id === strategy.id ? 'ring-2 ring-cyan-400' : ''
        } ${isTop ? 'border-green-400/50' : ''}`}
        onClick={() => setSelectedStrategy(strategy)}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="font-semibold text-white">{strategy.name}</div>
              {isTop && <Trophy className="w-4 h-4 text-yellow-400" />}
            </div>
            <Badge variant="outline" className="text-xs">
              {strategy.id}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div className="text-center p-2 bg-slate-700/50 rounded">
              <div className="text-sm text-slate-400">Win Rate</div>
              <div className="text-lg font-bold text-green-400">
                {strategy.winRate.toFixed(1)}%
              </div>
            </div>
            <div className="text-center p-2 bg-slate-700/50 rounded">
              <div className="text-sm text-slate-400">P&L</div>
              <div className="text-lg font-bold text-cyan-400">
                ${strategy.pnl.toLocaleString()}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>Trades: {strategy.trades}</span>
            <span>Genes: {strategy.genes}</span>
          </div>
          
          <div className="mt-2 w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-green-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${strategy.winRate}%` }}
            />
          </div>
        </CardContent>
      </Card>
    );
  };

  const EvolutionTimeline = () => {
    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Dna className="w-5 h-5 text-cyan-400" />
            <span>Evolution Timeline</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.recentEvolution.map((event, idx) => (
              <div key={idx} className="flex items-center space-x-4 p-3 bg-slate-700/50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className={`w-3 h-3 rounded-full ${
                    event.action === 'MUTATION' ? 'bg-yellow-400' :
                    event.action === 'CROSSOVER' ? 'bg-green-400' :
                    event.action === 'ELIMINATION' ? 'bg-red-400' :
                    'bg-cyan-400'
                  }`}></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {event.action}
                    </Badge>
                    <span className="text-sm font-medium">{event.strategy}</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{event.details}</div>
                </div>
                <div className="text-xs text-slate-400">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const StrategyDetails = ({ strategy }) => {
    if (!strategy) return null;

    const geneticProfile = [
      { gene: 'Risk Tolerance', value: 0.34, optimal: 0.40 },
      { gene: 'Position Size', value: 0.78, optimal: 0.75 },
      { gene: 'Entry Signal', value: 0.92, optimal: 0.85 },
      { gene: 'Exit Signal', value: 0.67, optimal: 0.70 },
      { gene: 'Time Filter', value: 0.56, optimal: 0.60 },
      { gene: 'Volatility Filter', value: 0.83, optimal: 0.80 }
    ];

    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code className="w-5 h-5 text-cyan-400" />
            <span>{strategy.name}</span>
            <Badge variant="outline">{strategy.id}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-3 bg-slate-700/50 rounded-lg">
              <div className="text-sm text-slate-400">Win Rate</div>
              <div className="text-2xl font-bold text-green-400">
                {strategy.winRate.toFixed(1)}%
              </div>
            </div>
            <div className="text-center p-3 bg-slate-700/50 rounded-lg">
              <div className="text-sm text-slate-400">Total Trades</div>
              <div className="text-2xl font-bold text-cyan-400">
                {strategy.trades}
              </div>
            </div>
            <div className="text-center p-3 bg-slate-700/50 rounded-lg">
              <div className="text-sm text-slate-400">P&L</div>
              <div className="text-2xl font-bold text-teal-400">
                ${strategy.pnl.toLocaleString()}
              </div>
            </div>
            <div className="text-center p-3 bg-slate-700/50 rounded-lg">
              <div className="text-sm text-slate-400">Genes</div>
              <div className="text-2xl font-bold text-yellow-400">
                {strategy.genes}
              </div>
            </div>
          </div>

          {/* Genetic Profile */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Genetic Profile</h3>
            <div className="space-y-3">
              {geneticProfile.map((gene, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{gene.gene}</span>
                    <span className="text-cyan-400">{gene.value.toFixed(2)}</span>
                  </div>
                  <div className="relative">
                    <Progress value={gene.value * 100} className="h-2" />
                    <div 
                      className="absolute top-0 w-1 h-2 bg-yellow-400 rounded"
                      style={{ left: `${gene.optimal * 100}%` }}
                      title={`Optimal: ${gene.optimal.toFixed(2)}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategy Actions */}
          <div className="flex space-x-3">
            <Button variant="default" size="sm" className="flex items-center space-x-2">
              <Shuffle className="w-4 h-4" />
              <span>Mutate</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Clone</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <Minus className="w-4 h-4" />
              <span>Eliminate</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const SwarmMetrics = () => {
    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <span>Swarm Intelligence</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Active Strategies</span>
                <span className="text-lg font-bold text-cyan-400">{data.active}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Win Rate</span>
                <span className="text-lg font-bold text-green-400">{data.winRate.toFixed(1)}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Evolution Cycles</span>
                <span className="text-lg font-bold text-yellow-400">{data.evolutionCycles}/hr</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Mutation Rate</span>
                <span className="text-lg font-bold text-teal-400">{data.mutationRate.toFixed(1)}%</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                <div className="text-sm text-slate-400">Collective Intelligence</div>
                <div className="text-2xl font-bold text-cyan-400">94.7%</div>
                <Progress value={94.7} className="h-2 mt-2" />
              </div>
              <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                <div className="text-sm text-slate-400">Adaptation Speed</div>
                <div className="text-2xl font-bold text-teal-400">8.3ms</div>
                <Progress value={83} className="h-2 mt-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Swarm Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SwarmMetrics />
        <EvolutionTimeline />
      </div>

      {/* Strategy Management */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800 border-slate-700">
          <TabsTrigger value="active" className="flex items-center space-x-2">
            <Brain className="w-4 h-4" />
            <span>Active Strategies</span>
          </TabsTrigger>
          <TabsTrigger value="details" className="flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>Strategy Details</span>
          </TabsTrigger>
          <TabsTrigger value="evolution" className="flex items-center space-x-2">
            <Dna className="w-4 h-4" />
            <span>Evolution Lab</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-cyan-400" />
                  <span>Top Performing Strategies</span>
                </span>
                <Badge variant="outline">
                  {data.topPerformers.length} Active
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.topPerformers.map((strategy) => (
                  <StrategyCard key={strategy.id} strategy={strategy} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Select Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.topPerformers.map((strategy) => (
                    <div
                      key={strategy.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedStrategy?.id === strategy.id
                          ? 'bg-cyan-400/20 border border-cyan-400'
                          : 'bg-slate-700/50 hover:bg-slate-700/70'
                      }`}
                      onClick={() => setSelectedStrategy(strategy)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{strategy.name}</span>
                        <ArrowRight className="w-4 h-4 text-cyan-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {selectedStrategy ? (
              <StrategyDetails strategy={selectedStrategy} />
            ) : (
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <Brain className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-400">Select a strategy to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="evolution" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Dna className="w-5 h-5 text-cyan-400" />
                <span>Evolution Laboratory</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="flex items-center space-x-2 p-6 h-auto">
                  <Plus className="w-5 h-5" />
                  <span>Create New Strategy</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2 p-6 h-auto">
                  <Shuffle className="w-5 h-5" />
                  <span>Force Evolution</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2 p-6 h-auto">
                  <Target className="w-5 h-5" />
                  <span>Optimize Swarm</span>
                </Button>
              </div>
              
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium">Evolution Status</span>
                </div>
                <p className="text-sm text-slate-400">
                  Next evolution cycle in 23 minutes. Current generation: 147. 
                  Performance threshold: 70% win rate.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StrategySwarm;