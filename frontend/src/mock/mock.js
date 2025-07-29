// Mock data for Quantum Trade Matrix
export const mockMarketData = {
  assets: {
    forex: [
      { symbol: 'EUR/USD', price: 1.0847, change: 0.0023, changePercent: 0.21, volume: 2.3e9 },
      { symbol: 'GBP/USD', price: 1.2634, change: -0.0045, changePercent: -0.35, volume: 1.8e9 },
      { symbol: 'USD/JPY', price: 149.23, change: 0.78, changePercent: 0.53, volume: 1.9e9 },
      { symbol: 'AUD/USD', price: 0.6789, change: 0.0012, changePercent: 0.18, volume: 1.2e9 },
      { symbol: 'USD/CAD', price: 1.3456, change: -0.0089, changePercent: -0.66, volume: 1.1e9 },
      { symbol: 'USD/CHF', price: 0.8923, change: 0.0034, changePercent: 0.38, volume: 0.9e9 },
      { symbol: 'NZD/USD', price: 0.6123, change: -0.0023, changePercent: -0.37, volume: 0.8e9 }
    ],
    crypto: [
      { symbol: 'BTC/USD', price: 67834.56, change: 1234.78, changePercent: 1.86, volume: 28.5e9 },
      { symbol: 'ETH/USD', price: 3456.78, change: -89.34, changePercent: -2.52, volume: 15.2e9 },
      { symbol: 'SOL/USD', price: 189.45, change: 8.92, changePercent: 4.94, volume: 3.8e9 },
      { symbol: 'ADA/USD', price: 0.4567, change: 0.0234, changePercent: 5.41, volume: 1.2e9 },
      { symbol: 'DOT/USD', price: 6.789, change: -0.345, changePercent: -4.83, volume: 0.9e9 }
    ],
    indices: [
      { symbol: 'SPX500', price: 5247.89, change: 23.45, changePercent: 0.45, volume: 4.2e9 },
      { symbol: 'NASDAQ', price: 16789.34, change: -67.23, changePercent: -0.40, volume: 3.8e9 },
      { symbol: 'DAX40', price: 17823.45, change: 156.78, changePercent: 0.89, volume: 2.1e9 },
      { symbol: 'FTSE100', price: 7894.56, change: -23.45, changePercent: -0.30, volume: 1.9e9 },
      { symbol: 'NIKKEI', price: 38456.78, change: 234.56, changePercent: 0.61, volume: 2.3e9 }
    ],
    commodities: [
      { symbol: 'GOLD', price: 2034.56, change: 12.34, changePercent: 0.61, volume: 1.8e9 },
      { symbol: 'SILVER', price: 23.45, change: -0.78, changePercent: -3.21, volume: 0.9e9 },
      { symbol: 'CRUDE', price: 78.92, change: 2.34, changePercent: 3.06, volume: 2.1e9 },
      { symbol: 'NATGAS', price: 2.89, change: -0.12, changePercent: -3.98, volume: 1.2e9 }
    ]
  },
  strategies: {
    active: 147,
    winRate: 73.4,
    evolutionCycles: 12,
    mutationRate: 8.5,
    topPerformers: [
      { id: 'STR_001', name: 'Quantum Scalper Alpha', winRate: 84.2, trades: 234, pnl: 15420.56, genes: 23 },
      { id: 'STR_002', name: 'Volatility Hunter', winRate: 78.9, trades: 189, pnl: 12890.34, genes: 19 },
      { id: 'STR_003', name: 'Trend Fusion Pro', winRate: 82.1, trades: 156, pnl: 18945.78, genes: 27 },
      { id: 'STR_004', name: 'Mean Reversion X', winRate: 76.5, trades: 203, pnl: 11234.89, genes: 21 },
      { id: 'STR_005', name: 'Breakout Predator', winRate: 79.8, trades: 167, pnl: 14567.23, genes: 25 }
    ],
    recentEvolution: [
      { timestamp: new Date(Date.now() - 300000), action: 'MUTATION', strategy: 'STR_001', details: 'Risk parameter optimized' },
      { timestamp: new Date(Date.now() - 600000), action: 'CROSSOVER', strategy: 'STR_NEW_001', details: 'Combined STR_002 + STR_003' },
      { timestamp: new Date(Date.now() - 900000), action: 'ELIMINATION', strategy: 'STR_089', details: 'Performance below threshold' },
      { timestamp: new Date(Date.now() - 1200000), action: 'SPAWN', strategy: 'STR_NEW_002', details: 'Generated from top performer' }
    ]
  },
  onChainSignals: {
    whaleActivity: [
      { wallet: '0x742d...a4b8', asset: 'ETH', amount: 15420.56, action: 'BUY', confidence: 0.89, timestamp: new Date() },
      { wallet: '0x1a2b...c3d4', asset: 'BTC', amount: 234.78, action: 'SELL', confidence: 0.76, timestamp: new Date(Date.now() - 300000) },
      { wallet: '0x5e6f...g7h8', asset: 'SOL', amount: 8945.23, action: 'BUY', confidence: 0.92, timestamp: new Date(Date.now() - 600000) }
    ],
    fundingRates: [
      { exchange: 'Binance', pair: 'BTC/USDT', rate: 0.0045, trend: 'INCREASING', timestamp: new Date() },
      { exchange: 'Bybit', pair: 'ETH/USDT', rate: -0.0023, trend: 'DECREASING', timestamp: new Date() },
      { exchange: 'OKX', pair: 'SOL/USDT', rate: 0.0089, trend: 'STABLE', timestamp: new Date() }
    ],
    glassnode: {
      networkValue: 1.2e12,
      activeAddresses: 945234,
      exchangeOutflow: 23456.78,
      mvrv: 2.34,
      fear_greed: 67
    }
  },
  riskMetrics: {
    dailyPnL: 47832.56,
    drawdown: -4.2,
    sharpeRatio: 2.87,
    maxDrawdown: -8.9,
    winRate: 73.4,
    avgWin: 450.23,
    avgLoss: -234.56,
    activeTrades: 23,
    dailyTrades: 189,
    riskScore: 0.34,
    kelly: 0.28,
    var95: -12345.67,
    alerts: [
      { type: 'WARNING', message: 'Drawdown approaching 5% threshold', timestamp: new Date() },
      { type: 'INFO', message: 'New strategy STR_NEW_001 showing strong performance', timestamp: new Date(Date.now() - 300000) }
    ]
  },
  performance: {
    totalPnL: 284567.89,
    monthlyReturn: 12.4,
    annualizedReturn: 34.7,
    totalTrades: 15678,
    profitableTrades: 11508,
    volumeTraded: 45.6e9,
    bestStrategy: 'STR_001',
    worstStrategy: 'STR_089',
    avgHoldTime: 4.2,
    maxConsecutiveWins: 23,
    maxConsecutiveLosses: 8
  },
  marketConditions: {
    currentRegime: 'TRENDING_BULL',
    volatility: 'MEDIUM',
    sentiment: 'BULLISH',
    conditions: [
      { name: 'Trend Following', suitability: 0.89, active: true },
      { name: 'Mean Reversion', suitability: 0.34, active: false },
      { name: 'Breakout', suitability: 0.76, active: true },
      { name: 'Counter Trend', suitability: 0.23, active: false }
    ]
  }
};

// Mock real-time data generators
export const generateRealtimeData = () => {
  const data = JSON.parse(JSON.stringify(mockMarketData));
  
  // Update prices with small random changes
  Object.keys(data.assets).forEach(assetType => {
    data.assets[assetType].forEach(asset => {
      const change = (Math.random() - 0.5) * 0.02;
      asset.price = asset.price * (1 + change);
      asset.change = asset.price * change;
      asset.changePercent = change * 100;
    });
  });
  
  // Update performance metrics
  data.performance.totalPnL += (Math.random() - 0.4) * 1000;
  data.riskMetrics.dailyPnL += (Math.random() - 0.4) * 500;
  data.riskMetrics.activeTrades = Math.floor(15 + Math.random() * 20);
  
  // Update strategy metrics
  data.strategies.active = Math.floor(140 + Math.random() * 20);
  data.strategies.winRate = 70 + Math.random() * 10;
  
  return data;
};

export const mockModuleConfig = {
  modules: [
    {
      id: 'multi-asset-core',
      name: 'Multi-Asset Adaptive Core',
      status: 'active',
      description: '24/7 market simulation across all asset classes',
      metrics: ['Volume', 'Volatility', 'Liquidity', 'Correlation'],
      enabled: true,
      priority: 1
    },
    {
      id: 'strategy-swarm',
      name: 'Sentient Strategy Swarm',
      status: 'active',
      description: 'Self-evolving trading strategies with genetic algorithms',
      metrics: ['Active Strategies', 'Win Rate', 'Evolution Cycles'],
      enabled: true,
      priority: 1
    },
    {
      id: 'onchain-integrator',
      name: 'On-Chain Signal Integrator',
      status: 'active',
      description: 'Real-time blockchain data analysis and whale tracking',
      metrics: ['Whale Activity', 'Funding Rates', 'Network Health'],
      enabled: true,
      priority: 2
    },
    {
      id: 'guardian-angel',
      name: 'Guardian Angel Risk Manager',
      status: 'active',
      description: 'AI-powered risk management and drawdown protection',
      metrics: ['Risk Score', 'Drawdown', 'VaR', 'Kelly Criterion'],
      enabled: true,
      priority: 1
    },
    {
      id: 'data-retriever',
      name: 'Data Retrieval Engine',
      status: 'pending',
      description: 'Multi-source data aggregation and normalization',
      metrics: ['Sources', 'Latency', 'Quality'],
      enabled: false,
      priority: 3
    },
    {
      id: 'websocket-hub',
      name: 'WebSocket Connection Hub',
      status: 'pending',
      description: 'Real-time market data streaming and connection management',
      metrics: ['Connections', 'Latency', 'Uptime'],
      enabled: false,
      priority: 2
    },
    {
      id: 'strategy-importer',
      name: 'Strategy Importer (SQL)',
      status: 'pending',
      description: 'Import and convert strategies from SQL databases',
      metrics: ['Imported', 'Converted', 'Active'],
      enabled: false,
      priority: 3
    },
    {
      id: 'mt4-mt5-bridge',
      name: 'MetaTrader Bridge',
      status: 'pending',
      description: 'Execution layer for MT4/MT5 platforms',
      metrics: ['Connections', 'Latency', 'Orders'],
      enabled: false,
      priority: 2
    },
    {
      id: 'ctrader-bridge',
      name: 'cTrader Bridge',
      status: 'pending',
      description: 'Execution layer for cTrader platform',
      metrics: ['Connections', 'Latency', 'Orders'],
      enabled: false,
      priority: 2
    },
    {
      id: 'market-brain',
      name: 'Market Condition Brain',
      status: 'pending',
      description: 'AI system for market regime detection and strategy selection',
      metrics: ['Regime Accuracy', 'Predictions', 'Confidence'],
      enabled: false,
      priority: 1
    },
    {
      id: 'evolution-engine',
      name: 'Evolution Engine',
      status: 'pending',
      description: 'Advanced genetic algorithms for strategy evolution',
      metrics: ['Generations', 'Mutations', 'Fitness'],
      enabled: false,
      priority: 1
    }
  ]
};