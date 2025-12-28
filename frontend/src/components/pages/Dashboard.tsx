import { ChevronRight, Dumbbell, Flame, Utensils } from "lucide-react";
import BodyLayout from "../layouts/BodyLayout";
import { Card } from "../elements/Card";
import { ProgressBar } from "../elements/ProgressBar";
import { Link } from "react-router-dom";
import { useCurrentStreak } from "@/hooks/useCurrentStreak";
import Loader from "../elements/Loader";
import { usePlannerData } from "@/hooks/usePlannerData";
import { WorkoutCard } from "../elements/WorkoutCard";
import { MealCard } from "../elements/MealCard";
import type { MealLog, ProgressData } from "@/lib/Types";
import { useMemo } from "react";
import { motion } from "framer-motion";

const today = new Date();

const Dashboard = () => {
  const { currentStreak, isLoading } = useCurrentStreak();
  const {
    consumedKcal,
    totalKcal,
    currentProgress,
    dailyWorkout,
    dailyMeals,
    isLoading: isLoadingPlanner,
  } = usePlannerData(today);

  const allTasks = useMemo(() => {
    return [
      ...(dailyWorkout
        ? [
            {
              ...dailyWorkout,
              type: "Workout",
              isCompleted: !!currentProgress?.workout,
              id: `workout-${dailyWorkout.id}`,
            },
          ]
        : []),
      ...dailyMeals.map((meal: MealLog) => ({
        ...meal,
        type: meal.mealType,
        isCompleted:
          !!currentProgress?.[
            meal.mealType.toLowerCase() as keyof ProgressData
          ],
      })),
    ];
  }, [dailyWorkout, dailyMeals, currentProgress]);

  const upNext = useMemo(() => {
    return allTasks.filter((task) => !task.isCompleted).slice(0, 3);
  }, [allTasks]);
  return isLoading || isLoadingPlanner ? (
    <Loader />
  ) : (
    <BodyLayout>
      <div className="p-10">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#0F172A]">
                Good Morning, Liviu! 👋
              </h2>
              <p className="text-gray-500">Ready to crush your goals today?</p>
            </div>
            <div className="flex gap-4">
              <Card className="px-4 py-2 flex items-center gap-3 bg-orange-50 border-orange-100">
                <div className="p-2 bg-orange-100 rounded-full text-orange-600">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Streak</p>
                  <p className="font-bold text-[#0F172A]">
                    {currentStreak} Days
                  </p>
                </div>
              </Card>
            </div>
          </div>
          {
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-green-100 rounded-lg text-green-600">
                      <Utensils className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-500">
                      {consumedKcal} / {totalKcal} kcal
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2">
                    Nutrition
                  </h3>
                  <ProgressBar
                    progress={(consumedKcal / totalKcal) * 100}
                    color="#10B981"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    {totalKcal - consumedKcal} kcal remaining
                  </p>
                </Card>

                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      <Dumbbell className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-500">
                      {currentProgress.workout ? (
                        <span className="bg-green-500/75 px-3 py-2 rounded-lg font-semibold text-gray-100">
                          Done
                        </span>
                      ) : (
                        "Pending"
                      )}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2">
                    Workout
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                    {dailyWorkout.sessionLabel}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{dailyWorkout.totalTime} min</span>
                    <span>•</span>
                    <span>{dailyWorkout.day}</span>
                  </div>
                </Card>

                <Card className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white border-none">
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold mb-1">Weekly Goal</h3>
                      <p className="text-blue-200 text-sm">Lose 0.5kg</p>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-blue-200">Progress</span>
                        <span className="font-bold">80%</span>
                      </div>
                      <div className="w-full bg-blue-900/50 rounded-full h-2">
                        <div className="bg-[#FF6B6B] h-2 rounded-full w-[80%]" />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#0F172A]">Up Next</h3>
                  <Link
                    to="/planner"
                    className="text-sm font-medium text-[#FF6B6B] hover:text-[#ff5252] flex items-center"
                  >
                    View Full Schedule <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>

                <div className="space-y-4">
                  {upNext.length > 0 ? (
                    upNext.map((item, idx) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        {item.type == "Workout" ? (
                          <WorkoutCard
                            currentProgress={currentProgress}
                            workout={dailyWorkout}
                            selectedDate={today}
                          />
                        ) : (
                          <MealCard
                            key={idx}
                            meal={item}
                            currentProgress={currentProgress}
                            selectedDate={today}
                          />
                        )}
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm italic">
                      All caught up for today! 🎉
                    </p>
                  )}
                </div>
              </div>
            </>
          }
        </div>
      </div>
    </BodyLayout>
  );
};

export default Dashboard;
