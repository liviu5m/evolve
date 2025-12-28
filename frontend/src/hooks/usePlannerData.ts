import { getCurrentProgress, updateProgressData } from "@/api/dailyProgress";
import { getMealsByUserId } from "@/api/meal";
import { getWorkoutsByUser } from "@/api/workout";
import { useAppContext } from "@/lib/AppProvider";
import type { Meal, MealLog, ProgressData, Workout } from "@/lib/Types";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const usePlannerData = (selectedDate: Date) => {
  const { user } = useAppContext();
  const queryClient = useQueryClient();

  const { data: workouts, isPending: isWorkoutLoading } = useQuery({
    queryKey: ["workout-user"],
    queryFn: () => getWorkoutsByUser(user?.id || -1),
  });

  const { data: meals, isPending: isMealLoading } = useQuery({
    queryKey: ["meals-user"],
    queryFn: () => getMealsByUserId(user?.id || -1),
  });
  const { data: currentProgress, isPending: isProgressLoading } = useQuery({
    queryKey: ["progress-user", selectedDate],
    queryFn: () => getCurrentProgress(user?.id || -1, selectedDate),
    placeholderData: keepPreviousData,
  });

  const dayName = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
  console.log();
  const dailyMeals = meals?.find((m: Meal) => m.day === dayName)?.meals || [];

  const totalKcal = dailyMeals.reduce(
    (acc: number, meal: MealLog) => acc + meal.calories,
    0
  );

  const consumedKcal = dailyMeals.reduce((acc: number, meal: MealLog) => {
    const mealKey = meal.mealType.toLowerCase() as keyof ProgressData;
    return currentProgress?.[mealKey] ? acc + meal.calories : acc;
  }, 0);

  const dailyWorkout = workouts?.find(
    (workout: Workout) =>
      workout.day ==
      selectedDate.toLocaleDateString("en-US", { weekday: "long" })
  );

  const { mutate: updateProgress } = useMutation({
    mutationFn: (data: ProgressData) =>
      updateProgressData(user?.id || -1, selectedDate, data),

    onMutate: async (newData) => {
      const queryKey = ["progress-user", selectedDate];

      await queryClient.cancelQueries({ queryKey });

      const previousProgress = queryClient.getQueryData<ProgressData>(queryKey);

      queryClient.setQueryData(queryKey, newData);

      return { previousProgress, queryKey };
    },

    onError: (err, newData, context) => {
      console.log(newData);
      if (context?.queryKey) {
        queryClient.setQueryData(context.queryKey, context.previousProgress);
      }
      console.error("Mutation failed:", err);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["progress-user", selectedDate],
      });
    },
  });

  return {
    user,
    workouts,
    meals,
    currentProgress,
    dayName,
    dailyMeals,
    totalKcal,
    consumedKcal,
    queryClient,
    dailyWorkout,
    updateProgress,
    isLoading: isProgressLoading || isWorkoutLoading || isMealLoading,
  };
};
