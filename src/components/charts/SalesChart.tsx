import RealTimeSalesChart from './RealTimeSalesChart'

export function SalesChart() {
  return (
    <RealTimeSalesChart 
      title="Sales summary"
      timeRange="7d"
      autoRefresh={true}
      refreshInterval={30000}
    />
  )
}