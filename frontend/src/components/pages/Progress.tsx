import React, { useState } from "react";
import BodyLayout from "../layouts/BodyLayout";
import { Card } from "../elements/Card";
import { Calendar, TrendingDown, Trophy } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentStreak, getWorkoutsDoneByUserId } from "@/api/dailyProgress";
import { useAppContext } from "@/lib/AppProvider";

const Progress = () => {
  const { user } = useAppContext();
  const { data: workoutsDone } = useQuery({
    queryKey: ["workouts-done"],
    queryFn: () => getWorkoutsDoneByUserId(user?.id || -1),
  });
  const { data: currentStreak } = useQuery({
    queryKey: ["current-streak"],
    queryFn: () => getCurrentStreak(user?.id || -1),
  });

  return (
    <BodyLayout>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full text-blue-600">
              <TrendingDown className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Change</p>
              <p className="text-2xl font-bold text-[#0F172A]">
                {1 > 0 ? "+" : ""}
                {1} kg
              </p>
            </div>
          </Card>

          <Card className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full text-green-600">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Workouts Done</p>
              <p className="text-2xl font-bold text-[#0F172A]">
                {workoutsDone}
              </p>
            </div>
          </Card>

          <Card className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-full text-orange-600">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Current Streak</p>
              <p className="text-2xl font-bold text-[#0F172A]">{currentStreak} Days</p>
            </div>
          </Card>
        </div>
      </div>
    </BodyLayout>
  );
};

export default Progress;
