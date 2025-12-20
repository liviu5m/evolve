import { ChevronRight, Dumbbell, Flame, Utensils } from "lucide-react";
import BodyLayout from "../layouts/BodyLayout";
import { Card } from "../elements/Card";
import { ProgressBar } from "../elements/ProgressBar";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getWorkoutsByUser } from "@/api/workout";
import { useAppContext } from "@/lib/AppProvider";
import { toast, ToastContainer } from "react-toastify";
import { generateFitnessPlan } from "@/api/user";

const Dashboard = () => {
  const { user } = useAppContext();
  const { data: workout } = useQuery({
    queryKey: ["workout-user"],
    queryFn: () => getWorkoutsByUser(user?.id || -1),
  });
  const navigate = useNavigate();

  const { mutate: generateCustomPlan } = useMutation({
    mutationKey: ["generate-plan"],
    mutationFn: () => generateFitnessPlan(user),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const generatePlan = () => {
    if (!user?.goal || !user.height || !user.weight) {
      toast(
        "Complete your profile data to be able to generate a custom fitness plan."
      );
      navigate("/profile");
    }
    generateCustomPlan();
  };

  return (
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
                  <p className="font-bold text-[#0F172A]">12 Days</p>
                </div>
              </Card>
            </div>
          </div>
          {1 ? (
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-400 text-white text-xl font-semibold px-10 py-5 rounded-lg cursor-pointer hover:scale-105 shadow"
                onClick={() => generatePlan()}
              >
                Generate My Custom Plan
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-green-100 rounded-lg text-green-600">
                      <Utensils className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-500">
                      {/* {todayPlan.caloriesConsumed} / {todayPlan.caloriesTarget} kcal */}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2">
                    Nutrition
                  </h3>
                  <ProgressBar
                    progress={
                      // (todayPlan.caloriesConsumed / todayPlan.caloriesTarget) * 100
                      50
                    }
                    color="#10B981"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    {/* {todayPlan.caloriesTarget - todayPlan.caloriesConsumed} kcal */}
                    remaining
                  </p>
                </Card>

                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      <Dumbbell className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-500">
                      {/* {todayPlan.workout?.completed ? "Done" : "Pending"} */}
                      Done
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2">
                    Workout
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                    {/* {todayPlan.workout?.name || "Rest Day"} */}
                    Leg Day
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>60 min</span>
                    <span>•</span>
                    <span>Work</span>
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
                  {/* {todayPlan.meals.slice(0, 2).map((meal, idx) => (
                <motion.div
                  key={meal.id}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: idx * 0.1,
                  }}
                >
                  <Card className="flex items-center p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0 mr-4 overflow-hidden">
                      <img
                        src={`https://source.unsplash.com/random/200x200?food,${meal.type}`}
                        alt={meal.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-bold text-[#FF6B6B] uppercase tracking-wider">
                            {meal.type} • {meal.time}
                          </span>
                          <h4 className="font-bold text-[#0F172A]">
                            {meal.name}
                          </h4>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-gray-900">
                            {meal.calories}
                          </span>
                          <span className="text-xs text-gray-500 block">
                            kcal
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))} */}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </BodyLayout>
  );
};

export default Dashboard;
