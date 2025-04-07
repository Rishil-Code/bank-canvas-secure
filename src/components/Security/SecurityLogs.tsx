
import { useState, useEffect } from "react";
import { mockAuthApi, mockSecurityApi, SecurityLog } from "@/utils/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AlertTriangleIcon, 
  CheckCircleIcon, 
  Loader2, 
  LogInIcon, 
  LogOutIcon, 
  ShieldIcon, 
  UserPlusIcon, 
  XCircleIcon,
  SendIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SecurityLogs = () => {
  const [logs, setLogs] = useState<SecurityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      setIsLoading(true);
      try {
        const user = await mockAuthApi.getCurrentUser();
        if (user) {
          const securityLogs = await mockSecurityApi.getSecurityLogs(user.id);
          setLogs(securityLogs);
        }
      } catch (error) {
        console.error("Error fetching security logs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  }

  const getActivityIcon = (log: SecurityLog) => {
    switch (log.activityType) {
      case 'login':
        return <LogInIcon className="h-5 w-5 text-green-500" />;
      case 'login_failed':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'logout':
        return <LogOutIcon className="h-5 w-5 text-blue-500" />;
      case 'signup':
        return <UserPlusIcon className="h-5 w-5 text-purple-500" />;
      case 'transfer':
        return <SendIcon className="h-5 w-5 text-blue-500" />;
      case 'suspicious':
        return <AlertTriangleIcon className="h-5 w-5 text-amber-500" />;
      default:
        return <ShieldIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'low':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Low</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Medium</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldIcon className="h-5 w-5" />
          Security Monitoring
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 text-bank-600 animate-spin" />
          </div>
        ) : logs.length > 0 ? (
          <div className="space-y-4">
            {logs.map((log) => (
              <div 
                key={log.id} 
                className={`p-4 border rounded-lg hover:bg-muted/30 transition-colors ${
                  log.severity === 'high' ? "border-red-300 bg-red-50" : 
                  log.severity === 'medium' ? "border-amber-200" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {getActivityIcon(log)}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="font-medium">{log.description}</h3>
                      <div className="flex items-center gap-2">
                        {getSeverityBadge(log.severity)}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <div>IP: {log.ipAddress}</div>
                      <div>{formatDate(log.timestamp)}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No security logs found
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SecurityLogs;
