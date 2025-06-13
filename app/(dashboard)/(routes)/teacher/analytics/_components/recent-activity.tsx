import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { format } from "date-fns";

interface ActivityItem {
  id: string;
  userId: string;
  userName: string;
  action: string;
  courseTitle?: string;
  timestamp: Date;
}

interface RecentActivityProps {
  data: ActivityItem[];
  className?: string;
}

export const RecentActivity = ({ data, className }: RecentActivityProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-blue-600">Recent Activity</CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((activity) => (
            <div key={activity.id} className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.userName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.action}{" "}
                  {activity.courseTitle && (
                    <span className="font-medium">"{activity.courseTitle}"</span>
                  )}
                </p>
              </div>
              <div className="ml-auto text-sm text-muted-foreground">
                {format(new Date(activity.timestamp), "MMM d, h:mm a")}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};