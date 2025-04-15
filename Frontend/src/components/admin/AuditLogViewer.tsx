
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Activity, Info, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface LogEntry {
  id: string;
  timestamp: Date;
  user: string;
  userId: string;
  action: string;
  severity: 'info' | 'warning' | 'error' | 'success';
  details?: string;
  ipAddress?: string;
}

interface AuditLogViewerProps {
  logs: LogEntry[];
  isLoading?: boolean;
}

const AuditLogViewer = ({ logs, isLoading = false }: AuditLogViewerProps) => {
  const [filter, setFilter] = useState<'all' | 'info' | 'warning' | 'error' | 'success'>('all');
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | 'all'>('24h');

  // Filter logs by severity and time range
  const filteredLogs = logs.filter(log => {
    const severityMatch = filter === 'all' || log.severity === filter;
    
    if (timeRange === 'all') return severityMatch;
    
    const now = new Date();
    const logTime = new Date(log.timestamp);
    const diffHours = (now.getTime() - logTime.getTime()) / (1000 * 60 * 60);
    
    if (timeRange === '24h') return severityMatch && diffHours <= 24;
    if (timeRange === '7d') return severityMatch && diffHours <= 168; // 7 * 24
    if (timeRange === '30d') return severityMatch && diffHours <= 720; // 30 * 24
    
    return severityMatch;
  });

  const getSeverityIcon = (severity: LogEntry['severity']) => {
    switch (severity) {
      case 'info': return <Info className="h-4 w-4 text-blue-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };
  
  const getSeverityColor = (severity: LogEntry['severity']) => {
    switch (severity) {
      case 'info': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'warning': return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      case 'error': return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'success': return 'bg-green-100 text-green-800 hover:bg-green-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            size="sm"
            variant={filter === 'info' ? 'default' : 'outline'}
            onClick={() => setFilter('info')}
            className="flex items-center gap-1"
          >
            <Info className="h-4 w-4" />
            Info
          </Button>
          <Button
            size="sm"
            variant={filter === 'warning' ? 'default' : 'outline'}
            onClick={() => setFilter('warning')}
            className="flex items-center gap-1"
          >
            <AlertTriangle className="h-4 w-4" />
            Warning
          </Button>
          <Button
            size="sm"
            variant={filter === 'error' ? 'default' : 'outline'}
            onClick={() => setFilter('error')}
            className="flex items-center gap-1"
          >
            <AlertCircle className="h-4 w-4" />
            Error
          </Button>
          <Button
            size="sm"
            variant={filter === 'success' ? 'default' : 'outline'}
            onClick={() => setFilter('success')}
            className="flex items-center gap-1"
          >
            <CheckCircle className="h-4 w-4" />
            Success
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-md">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
              <span className="text-muted-foreground">Loading audit logs...</span>
            </div>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Activity className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No logs found for the selected filters</p>
          </div>
        ) : (
          <ScrollArea className="h-[500px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(log.timestamp).toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span>{log.user}</span>
                      </div>
                    </TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>
                      <Badge className={`flex w-fit items-center gap-1 ${getSeverityColor(log.severity)}`}>
                        {getSeverityIcon(log.severity)}
                        <span className="capitalize">{log.severity}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {log.details && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Info className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{log.details}</p>
                              {log.ipAddress && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  IP: {log.ipAddress}
                                </p>
                              )}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default AuditLogViewer;
