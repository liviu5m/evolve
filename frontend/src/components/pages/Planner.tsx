import React, { useEffect, useState } from "react";
import BodyLayout from "../layouts/BodyLayout";
import { WeeklyCalendar } from "../elements/WeeklyCalendar";
import { WorkoutCard } from "../elements/WorkoutCard";
import { useAppContext } from "@/lib/AppProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getWorkoutsByUser } from "@/api/workout";
import { getMealsByUserId } from "@/api/meal";
import type { Meal, MealLog, ProgressData, Workout } from "@/lib/Types";
import Loader from "../elements/Loader";
import { MealCard } from "../elements/MealCard";
import { getCurrentProgress, updateProgressData } from "@/api/dailyProgress";

const Planner = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { user } = useAppContext();
  const queryClient = useQueryClient();
  const [calories, setCalories] = useState(0);
  const { data: workouts, isPending: isWorkoutLoading } = useQuery({
    queryKey: ["workout-user"],
    queryFn: () => getWorkoutsByUser(user?.id || -1),
  });

  const { data: meals, isPending: isMealLoading } = useQuery({
    queryKey: ["meals-user"],
    queryFn: () => getMealsByUserId(user?.id || -1),
  });
  const { data: currentProgress, isPending: isProgressLoading } = useQuery({
    queryKey: ["progress-user"],
    queryFn: () => getCurrentProgress(user?.id || -1, selectedDate),
  });

  const { mutate: updateProgress } = useMutation({
    mutationKey: ["update-user-progress"],
    mutationFn: (data: ProgressData) =>
      updateProgressData(user?.id || -1, selectedDate, data),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["progress-user"] });
      const previousProgress = queryClient.getQueryData(["progress-user"]);
      queryClient.setQueryData(["progress-user"], (old: ProgressData) => ({
        ...old,
        ...newData,
      }));
      return { previousProgress };
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const dayName = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
  const dailyMeals = meals?.find((m: Meal) => m.day === dayName)?.meals || [];

  const totalKcal = dailyMeals.reduce(
    (acc: number, meal: MealLog) => acc + meal.calories,
    0
  );
  const consumedKcal = dailyMeals.reduce((acc: number, meal: MealLog) => {
    const mealKey = meal.mealType.toLowerCase() as keyof ProgressData;
    return currentProgress?.[mealKey] ? acc + meal.calories : acc;
  }, 0);

  useEffect(() => {
    setCalories(consumedKcal);
  }, [consumedKcal]);

  return isWorkoutLoading || isMealLoading || isProgressLoading ? (
    <Loader />
  ) : (
    <BodyLayout>
      <div className="space-y-8">
        <WeeklyCalendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
        <h1 className="my-8 text-lg font-bold">Today's Training</h1>
        <WorkoutCard
          currentProgress={currentProgress}
          updateProgress={updateProgress}
          workout={workouts.find(
            (workout: Workout) =>
              workout.day ==
              selectedDate.toLocaleDateString("en-US", { weekday: "long" })
          )}
        />
        <div className="flex items-center justify-between">
          <h1 className="mt-10 text-lg font-bold">Meals</h1>
          <h2 className="text-gray-400 text-sm">
            {calories}/{totalKcal} kcal
          </h2>
        </div>
        {meals
          .find(
            (meal: Meal) =>
              meal.day ==
              selectedDate.toLocaleDateString("en-US", { weekday: "long" })
          )
          .meals.map((meal: MealLog, i: number) => {
            return (
              <MealCard
                key={i}
                meal={meal}
                currentProgress={currentProgress}
                updateProgress={updateProgress}
                setCalories={setCalories}
                calories={calories}
              />
            );
          })}
      </div>
    </BodyLayout>
  );
};

export default Planner;
