
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface RewardPointsProps {
  rewardPoints: number;
  useRewardPoints: boolean;
  toggleRewardPoints: () => void;
}

const RewardPoints = ({ 
  rewardPoints, 
  useRewardPoints, 
  toggleRewardPoints 
}: RewardPointsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reward Points</CardTitle>
        <CardDescription>Use your reward points for a discount</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Available Points: {rewardPoints}</p>
              <p className="text-sm text-muted-foreground">
                Maximum discount: ${(rewardPoints * 0.01).toFixed(2)} (30% of order)
              </p>
            </div>
            <Button 
              variant={useRewardPoints ? "default" : "outline"} 
              size="sm"
              onClick={toggleRewardPoints}
            >
              {useRewardPoints ? "Applied" : "Apply Points"}
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>0 points</span>
              <span>{rewardPoints} points</span>
            </div>
            <Progress value={(rewardPoints / 1000) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground text-center">
              {1000 - rewardPoints} more points until next tier (1000 points)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RewardPoints;
