import { useEffect, useMemo, useState } from "react";
import BodyLayout from "../layouts/BodyLayout";
import { Card } from "../elements/Card";
import { Calendar, TrendingDown, Trophy } from "lucide-react";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getWeightProgress,
  getWorkoutsDoneByUserId,
  setWeightProgress,
} from "@/api/dailyProgress";
import { useAppContext } from "@/lib/AppProvider";
import Box from "@mui/material/Box";
import { LineChart } from "@mui/x-charts/LineChart";
import type { WeightResponse } from "@/lib/Types";
import { format, parseISO } from "date-fns";
import Loader from "../elements/Loader";
import { useCurrentStreak } from "@/hooks/useCurrentStreak";
import { usePlannerData } from "@/hooks/usePlannerData";
const today = new Date();

const Progress = () => {
  const { currentStreak, isLoading } = useCurrentStreak();
  const queryClient = useQueryClient();
  const [chartType, setChartType] = useState("Last Month");
  const { user } = useAppContext();
  const [weight, setWeight] = useState<string>("");
  const { data: workoutsDone, isLoading: isWorkoutDoneLoading } = useQuery({
    queryKey: ["workouts-done"],
    queryFn: () => getWorkoutsDoneByUserId(user?.id || -1),
  });
  const { dailyWorkout } = usePlannerData(today);

  const { data: weightProgress, isLoading: isWeightProgressLoading } = useQuery(
    {
      queryKey: ["weight-progress", chartType],
      queryFn: () => getWeightProgress(chartType, user?.id || -1),
      placeholderData: keepPreviousData,
    }
  );
  const { mutate: updateWeight } = useMutation({
    mutationKey: ["set-weight"],
    mutationFn: () => setWeightProgress(weight, user?.id || -1, today),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["weight-progress", chartType],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const formattedProgressData = useMemo(() => {
    return (
      weightProgress
        ?.filter((data: WeightResponse) => data.weight != null)
        .map((item: WeightResponse) => ({
          ...item,
          day: format(parseISO(item.day), "d MMMM"),
        })) || []
    );
  }, [weightProgress]);

  useEffect(() => {
    const todayISO = today.toISOString().split("T")[0];
    const todayData = weightProgress?.find(
      (p: WeightResponse) => p.day === todayISO
    );

    if (todayData) {
      setWeight(todayData.weight);
    }
  }, [weightProgress, today]);

  const margin = { right: 24 };

  return isWorkoutDoneLoading || isWeightProgressLoading || isLoading ? (
    <Loader />
  ) : (
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
                {formattedProgressData.length > 0 &&
                formattedProgressData[formattedProgressData.length - 1].weight -
                  formattedProgressData[0].weight >
                  0
                  ? "+"
                  : ""}
                {formattedProgressData.length > 0
                  ? formattedProgressData[formattedProgressData.length - 1]
                      .weight - formattedProgressData[0].weight
                  : 0}{" "}
                kg
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
              <p className="text-2xl font-bold text-[#0F172A]">
                {currentStreak} Days
              </p>
            </div>
          </Card>
        </div>
        <div>
          <ul className="flex items-center gap-3">
            <li
              className={`px-2 py-1 rounded-lg border-gray-400 border text-sm w-fit shadow cursor-pointer ${
                chartType == "Last Month"
                  ? "bg-gray-400 text-white"
                  : "text-gray-700 bg-white"
              }`}
              onClick={() => setChartType("Last Month")}
            >
              Last Month
            </li>
            <li
              className={`px-2 py-1 rounded-lg border-gray-400 border text-sm w-fit shadow cursor-pointer ${
                chartType == "All Time"
                  ? "bg-gray-400 text-white"
                  : "text-gray-700 bg-white"
              }`}
              onClick={() => setChartType("All Time")}
            >
              All Time
            </li>
          </ul>
        </div>
        <Box sx={{ width: "100%", height: 300 }}>
          <LineChart
            series={[
              {
                data: formattedProgressData.map(
                  (data: WeightResponse) => data.weight
                ),
                label: "Weight",
              },
            ]}
            xAxis={[
              {
                scaleType: "point",
                data: formattedProgressData.map(
                  (data: WeightResponse) => data.day
                ),
              },
            ]}
            yAxis={[{ width: 50 }]}
            margin={margin}
          />
        </Box>
        {dailyWorkout ? (
          <Card>
            <h3 className="text-lg font-bold text-[#0F172A] mb-4">
              Log Progress ({today.toISOString().split("T")[0]})
            </h3>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                updateWeight();
              }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Weight (kg)
                </label>
                <input
                  type="number"
                  className="w-full outline-0 border px-4 py-2 border-gray-200 rounded-lg shadow text-sm"
                  placeholder="78.5"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <button className="w-full bg-[#0F172A] text-white py-2 rounded-lg font-medium hover:bg-[#1E293B] transition-colors">
                Save Entry
              </button>
            </form>
          </Card>
        ) : (
          <p className="text-center text-xl font-semibold text-blue-400">
            Complete your profile and generate your customized fitness program !
          </p>
        )}
      </div>
    </BodyLayout>
  );
};

export default Progress;
