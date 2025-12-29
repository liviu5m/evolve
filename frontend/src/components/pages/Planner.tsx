import { useState } from "react";
import BodyLayout from "../layouts/BodyLayout";
import { WeeklyCalendar } from "../elements/WeeklyCalendar";
import { WorkoutCard } from "../elements/WorkoutCard";
import { useMutation } from "@tanstack/react-query";
import { regenerateMealFunction } from "@/api/meal";
import type { Meal, MealLog } from "@/lib/Types";
import Loader from "../elements/Loader";
import { MealCard } from "../elements/MealCard";
import { usePlannerData } from "@/hooks/usePlannerData";

const Planner = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const {
    user,
    meals,
    currentProgress,
    dayName,
    dailyMeals,
    totalKcal,
    consumedKcal,
    isLoading,
    queryClient,
    dailyWorkout,
    updateProgress,
  } = usePlannerData(selectedDate);

  const { mutate: regenerateMealMutate } = useMutation({
    mutationKey: ["regenerate-meal", selectedDate],
    mutationFn: (mealKey: string) =>
      regenerateMealFunction(
        mealKey,
        meals?.find((m: Meal) => m.day === dayName).id,
        user?.id || -1
      ),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["meals-user"],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const regenerateMeal = (mealKey: string) => {
    regenerateMealMutate(mealKey);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <BodyLayout>
      {dailyWorkout ? (
        <div className="space-y-8">
          <WeeklyCalendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
          <h1 className="my-8 text-lg font-bold">Today's Training</h1>
          <WorkoutCard
            currentProgress={currentProgress}
            updateProgress={updateProgress}
            workout={dailyWorkout}
            selectedDate={selectedDate}
          />
          <div className="flex items-center justify-between">
            <h1 className="mt-10 text-lg font-bold">Meals</h1>
            <h2 className="text-gray-400 text-sm">
              {consumedKcal}/{totalKcal} kcal
            </h2>
          </div>
          {dailyMeals.map((meal: MealLog, i: number) => {
            return (
              <MealCard
                key={i}
                meal={meal}
                currentProgress={currentProgress}
                updateProgress={updateProgress}
                regenerateMeal={regenerateMeal}
                selectedDate={selectedDate}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-center text-xl font-semibold text-blue-400">
          Complete your profile and generate your customized fitness program !
        </p>
      )}
    </BodyLayout>
  );
};

export default Planner;
