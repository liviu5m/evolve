import React, { useState } from "react";
import BodyLayout from "../layouts/BodyLayout";
import { WeeklyCalendar } from "../elements/WeeklyCalendar";
import { WorkoutCard } from "../elements/WorkoutCard";
import { useAppContext } from "@/lib/AppProvider";
import { useQuery } from "@tanstack/react-query";
import { getWorkoutsByUser } from "@/api/workout";
import { getMealsByUserId } from "@/api/meal";

const Planner = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { user } = useAppContext();
  const { data: workouts } = useQuery({
    queryKey: ["workout-user"],
    queryFn: () => getWorkoutsByUser(user?.id || -1),
  });

  const { data: meals } = useQuery({
    queryKey: ["meals-user"],
    queryFn: () => getMealsByUserId(user?.id || -1),
  });

  console.log("Workouts: " , workouts);
  console.log("Meals: " ,meals);
  

  return (
    <BodyLayout>
      <div className="space-y-8">
        <WeeklyCalendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
        <h1 className="my-8 text-lg font-bold">Today's Training</h1>
        {/* <WorkoutCard /> */}
      </div>
    </BodyLayout>
  );
};

export default Planner;
