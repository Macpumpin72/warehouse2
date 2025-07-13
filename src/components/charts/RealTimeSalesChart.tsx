import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  alpha
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import {
  TrendingUp,
  MoreVert,
  Refresh,
  Download,
  Fullscreen
} from '@mui/icons-material';

interface SalesDataPoint {
  time: string;
  sales: number;
  revenue: number;
  timestamp: number;
}

interface RealTimeSalesChartProps {
  title?: string;
  timeRange?: '1h' | '24h' | '7d' | '30d';
  autoRefresh?: boolean;
  refreshInterval?: number;
}

const RealTimeSalesChart: React.FC<RealTimeSalesChartProps> = ({
  title = "Sales summary",
  timeRange = '7d',
  autoRefresh = true,
  refreshInterval = 30000 // 30 seconds
}) => {
  const theme = useTheme();
  const [salesData, setSalesData] = useState<SalesDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Initialize with sample data
  const generateInitialData = (): SalesDataPoint[] => {
    const now = new Date();
    const data: SalesDataPoint[] = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      const baseRevenue = 400000 + Math.random() * 200000;
      data.push({
        time: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        sales: Math.floor(baseRevenue / 1000),
        revenue: baseRevenue,
        timestamp: date.getTime()
      });
    }
    
    return data;
  };

  // Simulate real-time data updates
  const generateNewDataPoint = (): SalesDataPoint => {
    const now = new Date();
    const baseRevenue = 400000 + Math.random() * 200000;
    
    return {
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      sales: Math.floor(baseRevenue / 1000),
      revenue: baseRevenue,
      timestamp: now.getTime()
    };
  };

  // Initialize data on component mount
  useEffect(() => {
    setSalesData(generateInitialData());
  }, []);

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        setSalesData(prevData => {
          const newData = [...prevData];
          
          // Add new data point
          const newPoint = generateNewDataPoint();
          newData.push(newPoint);
          
          // Keep only last 20 points for real-time view
          if (newData.length > 20) {
            newData.shift();
          }
          
          return newData;
        });
        
        setLastUpdate(new Date());
        setIsLoading(false);
      }, 500);
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSalesData(generateInitialData());
      setLastUpdate(new Date());
      setIsLoading(false);
    }, 500);
    handleMenuClose();
  };

  const handleDownload = () => {
    // Simulate download
    const dataStr = JSON.stringify(salesData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sales-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    handleMenuClose();
  };

  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const avgRevenue = salesData.length > 0 ? totalRevenue / salesData.length : 0;
  const growth = salesData.length > 1 
    ? ((salesData[salesData.length - 1].revenue - salesData[0].revenue) / salesData[0].revenue) * 100 
    : 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            p: 2,
            boxShadow: theme.shadows[4]
          }}
        >
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {label}
          </Typography>
          {payload.map((entry: any, index: number) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: entry.color
                }}
              />
              <Typography variant="body2" fontWeight="medium">
                Revenue: {formatCurrency(entry.value)}
              </Typography>
            </Box>
          ))}
        </Box>
      );
    }
    return null;
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        transition: 'box-shadow 0.2s ease-in-out',
        '&:hover': {
          boxShadow: theme.shadows[4]
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h6" fontWeight="600" gutterBottom>
              {title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip 
                label="Last 7 days" 
                size="small" 
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
              {growth > 0 && (
                <Chip
                  icon={<TrendingUp sx={{ fontSize: '0.875rem' }} />}
                  label={`+${growth.toFixed(1)}%`}
                  size="small"
                  color="success"
                  sx={{ fontSize: '0.75rem' }}
                />
              )}
            </Box>
          </Box>
          
          <IconButton 
            size="small" 
            onClick={handleMenuClick}
            sx={{ color: 'text.secondary' }}
          >
            <MoreVert />
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleRefresh}>
              <Refresh sx={{ mr: 1, fontSize: '1rem' }} />
              Refresh
            </MenuItem>
            <MenuItem onClick={handleDownload}>
              <Download sx={{ mr: 1, fontSize: '1rem' }} />
              Download
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Fullscreen sx={{ mr: 1, fontSize: '1rem' }} />
              Fullscreen
            </MenuItem>
          </Menu>
        </Box>

        {/* Total Sales Display */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: theme.palette.primary.main
              }}
            />
            <Typography variant="body2" color="text.secondary" fontWeight="medium">
              Total sales
            </Typography>
          </Box>
          <Typography 
            variant="h4" 
            fontWeight="700"
            sx={{ 
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}
          >
            {formatCurrency(totalRevenue)}
          </Typography>
          
          {/* Real-time indicator */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: autoRefresh ? '#4caf50' : '#9e9e9e',
                animation: autoRefresh ? 'pulse 2s infinite' : 'none',
                '@keyframes pulse': {
                  '0%': { opacity: 1 },
                  '50%': { opacity: 0.5 },
                  '100%': { opacity: 1 }
                }
              }}
            />
            <Typography variant="caption" color="text.secondary">
              {autoRefresh ? 'Live' : 'Static'} • Updated {lastUpdate.toLocaleTimeString()}
            </Typography>
          </Box>
        </Box>

        {/* Chart */}
        <Box sx={{ height: 280, width: '100%', position: 'relative' }}>
          {isLoading && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: alpha(theme.palette.background.paper, 0.8),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
                borderRadius: 1
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Updating...
              </Typography>
            </Box>
          )}
          
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={theme.palette.divider}
                opacity={0.3}
              />
              
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ 
                  fontSize: 12, 
                  fill: theme.palette.text.secondary 
                }}
              />
              
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ 
                  fontSize: 12, 
                  fill: theme.palette.text.secondary 
                }}
                tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}K`}
              />
              
              <Tooltip content={<CustomTooltip />} />
              
              <Area
                type="monotone"
                dataKey="revenue"
                stroke={theme.palette.primary.main}
                strokeWidth={3}
                fill="url(#salesGradient)"
                dot={{ 
                  fill: theme.palette.primary.main, 
                  strokeWidth: 2, 
                  stroke: theme.palette.background.paper,
                  r: 4
                }}
                activeDot={{ 
                  r: 6, 
                  fill: theme.palette.primary.main,
                  stroke: theme.palette.background.paper,
                  strokeWidth: 2
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>

        {/* Summary Stats */}
        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: 2, 
            pt: 2, 
            borderTop: `1px solid ${theme.palette.divider}`,
            mt: 2
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Avg Daily
            </Typography>
            <Typography variant="body2" fontWeight="600">
              {formatCurrency(avgRevenue)}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Peak Day
            </Typography>
            <Typography variant="body2" fontWeight="600">
              {formatCurrency(Math.max(...salesData.map(d => d.revenue)))}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RealTimeSalesChart;