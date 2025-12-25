import { getCurrentStreak } from "@/api/dailyProgress";
import { useAppContext } from "@/lib/AppProvider";
import { useQuery } from "@tanstack/react-query";

export const useCurrentStreak = () => {
  const { user } = useAppContext();
  const { data: currentStreak, isLoading: isCurrentStreakLoading } = useQuery({
    queryKey: ["current-streak"],
    queryFn: () => getCurrentStreak(user?.id || -1),
  });
  return {
    currentStreak,
    isLoading: isCurrentStreakLoading,
  };
};
