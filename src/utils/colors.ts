export const getSeverityColor = (severity: number): string => {
  if (severity <= 3) return '#fbbf24'; // yellow-400
  if (severity <= 6) return '#f97316'; // orange-500
  return '#ef4444'; // red-500
};

export const getSeverityLabel = (severity: number): string => {
  if (severity <= 3) return 'Mild';
  if (severity <= 6) return 'Moderate';
  return 'Severe';
};

export const formatRegionName = (region: string): string => {
  return region.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};
