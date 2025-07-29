import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Progress } from '../ui/progress';
import { 
  Settings, 
  Play, 
  Pause, 
  Square,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  Database,
  Wifi,
  Brain,
  Shield,
  TrendingUp
} from 'lucide-react';

const ModuleManager = ({ moduleConfig, onConfigChange }) => {
  const [selectedModule, setSelectedModule] = useState(null);

  const getModuleIcon = (id) => {
    const iconMap = {
      'multi-asset-core': TrendingUp,
      'strategy-swarm': Brain,
      'onchain-integrator': Wifi,
      'guardian-angel': Shield,
      'data-retriever': Database,
      'websocket-hub': Zap,
      'strategy-importer': Settings,
      'mt4-mt5-bridge': Play,
      'ctrader-bridge': Play,
      'market-brain': Brain,
      'evolution-engine': Settings
    };
    return iconMap[id] || Settings;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'pending': return Clock;
      case 'error': return AlertCircle;
      default: return Square;
    }
  };

  const toggleModule = (moduleId) => {
    const updatedConfig = {
      ...moduleConfig,
      modules: moduleConfig.modules.map(module =>
        module.id === moduleId
          ? { ...module, enabled: !module.enabled }
          : module
      )
    };
    onConfigChange(updatedConfig);
  };

  const ModuleCard = ({ module }) => {
    const Icon = getModuleIcon(module.id);
    const StatusIcon = getStatusIcon(module.status);
    
    return (
      <Card 
        className={`bg-slate-800/50 border-slate-700 backdrop-blur-sm cursor-pointer transition-all duration-200 hover:bg-slate-800/70 ${
          selectedModule?.id === module.id ? 'ring-2 ring-cyan-400' : ''
        }`}
        onClick={() => setSelectedModule(module)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-slate-700/50 rounded-lg">
                <Icon className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <CardTitle className="text-lg">{module.name}</CardTitle>
                <p className="text-sm text-slate-400">{module.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <StatusIcon className={`w-4 h-4 ${getStatusColor(module.status)}`} />
              <Badge variant={module.status === 'active' ? 'default' : 'secondary'}>
                {module.status.toUpperCase()}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-400">Priority:</span>
              <Badge variant="outline" className="text-xs">
                P{module.priority}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-400">Enabled:</span>
              <Switch
                checked={module.enabled}
                onCheckedChange={() => toggleModule(module.id)}
                disabled={module.status === 'error'}
              />
            </div>
          </div>
          {module.metrics && (
            <div className="mt-3 flex flex-wrap gap-2">
              {module.metrics.map((metric, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {metric}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const ModuleDetails = ({ module }) => {
    if (!module) return null;

    const Icon = getModuleIcon(module.id);
    const StatusIcon = getStatusIcon(module.status);

    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-slate-700/50 rounded-lg">
                <Icon className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <CardTitle className="text-xl">{module.name}</CardTitle>
                <p className="text-slate-400">{module.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <StatusIcon className={`w-5 h-5 ${getStatusColor(module.status)}`} />
              <Badge variant={module.status === 'active' ? 'default' : 'secondary'}>
                {module.status.toUpperCase()}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Module Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Health</span>
                <span className="text-green-400">
                  {module.status === 'active' ? '100%' : '0%'}
                </span>
              </div>
              <Progress value={module.status === 'active' ? 100 : 0} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Load</span>
                <span className="text-cyan-400">
                  {module.enabled ? '67%' : '0%'}
                </span>
              </div>
              <Progress value={module.enabled ? 67 : 0} className="h-2" />
            </div>
          </div>

          {/* Module Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Configuration</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Priority Level</label>
                <select 
                  className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  value={module.priority}
                  onChange={(e) => {
                    const updatedConfig = {
                      ...moduleConfig,
                      modules: moduleConfig.modules.map(m =>
                        m.id === module.id
                          ? { ...m, priority: parseInt(e.target.value) }
                          : m
                      )
                    };
                    onConfigChange(updatedConfig);
                  }}
                >
                  <option value={1}>High (P1)</option>
                  <option value={2}>Medium (P2)</option>
                  <option value={3}>Low (P3)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Auto-restart</label>
                <Switch defaultChecked={module.enabled} />
              </div>
            </div>
          </div>

          {/* Module Metrics */}
          {module.metrics && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Metrics</h3>
              <div className="grid grid-cols-3 gap-4">
                {module.metrics.map((metric, idx) => (
                  <div key={idx} className="text-center p-3 bg-slate-700/50 rounded-lg">
                    <div className="text-sm text-slate-400">{metric}</div>
                    <div className="text-lg font-semibold text-cyan-400">
                      {module.status === 'active' ? Math.floor(Math.random() * 100) : 0}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Module Actions */}
          <div className="flex space-x-3">
            <Button 
              variant="default" 
              size="sm"
              disabled={module.status === 'active'}
              className="flex items-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Start</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              disabled={module.status !== 'active'}
              className="flex items-center space-x-2"
            >
              <Pause className="w-4 h-4" />
              <span>Stop</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>Configure</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const activeModules = moduleConfig.modules.filter(m => m.status === 'active').length;
  const totalModules = moduleConfig.modules.length;

  return (
    <div className="space-y-6">
      {/* Module Overview */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-cyan-400" />
            <span>Module System Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-slate-700/50 rounded-lg">
              <div className="text-2xl font-bold text-cyan-400">{activeModules}</div>
              <div className="text-sm text-slate-400">Active Modules</div>
            </div>
            <div className="text-center p-4 bg-slate-700/50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">
                {moduleConfig.modules.filter(m => m.status === 'pending').length}
              </div>
              <div className="text-sm text-slate-400">Pending</div>
            </div>
            <div className="text-center p-4 bg-slate-700/50 rounded-lg">
              <div className="text-2xl font-bold text-green-400">
                {moduleConfig.modules.filter(m => m.enabled).length}
              </div>
              <div className="text-sm text-slate-400">Enabled</div>
            </div>
            <div className="text-center p-4 bg-slate-700/50 rounded-lg">
              <div className="text-2xl font-bold text-teal-400">{totalModules}</div>
              <div className="text-sm text-slate-400">Total Modules</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Module Grid and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Module List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Available Modules</h2>
          <div className="space-y-4">
            {moduleConfig.modules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </div>

        {/* Module Details */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Module Details</h2>
          {selectedModule ? (
            <ModuleDetails module={selectedModule} />
          ) : (
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <Settings className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-400">Select a module to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModuleManager;