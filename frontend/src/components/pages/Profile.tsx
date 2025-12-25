import BodyLayout from "../layouts/BodyLayout";
import { User } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import type { UserUpdateData, Workout } from "@/lib/Types";
import { useAppContext } from "@/lib/AppProvider";
import { useMutation } from "@tanstack/react-query";
import { generateFitnessPlan, updateUserData } from "@/api/user";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { usePlannerData } from "@/hooks/usePlannerData";
import Loader from "../elements/Loader";

const today = new Date();

const Profile = () => {
  const { user, setUser } = useAppContext();
  const [data, setData] = useState<UserUpdateData>({
    fullName: user?.fullName || "",
    birthDate: user?.birthDate || "",
    goal: user?.goal || "",
    height: String(user?.height) || undefined,
    weight: String(user?.weight) || undefined,
    activityLevel: user?.activityLevel || "",
    dailyRestrictions: user?.dailyRestrictions || "",
    gym: user?.gym || false,
    calisthenics: user?.calisthenics || false,
  });
  const navigate = useNavigate();
  const { workouts, isLoading } = usePlannerData(today);

  const { mutate: updateUser } = useMutation({
    mutationKey: ["update-user-data"],
    mutationFn: () => updateUserData(data, user?.id || -1),
    onSuccess: (data) => {
      console.log(data);
      setUser(data);
      toast("Profile Updated successfully !");
    },
    onError: (err) => {
      console.log(err);
      toast("Something went wrong");
    },
  });

  const { mutate: generateCustomPlan, isPending } = useMutation({
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

  return isLoading ? (
    <Loader />
  ) : (
    <BodyLayout>
      <div className="flex justify-center gap-30 mt-20">
        <div className="flex items-center justify-center flex-col gap-5">
          <h1 className="text-2xl font-semibold">Manage Your Profile</h1>
          <form
            className="mt-7 flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              updateUser();
            }}
          >
            <div className="relative">
              <User className="absolute top-1/2 -translate-y-1/2 left-2" />
              <input
                type="text"
                className="px-5 py-3 shadow border border-gray-300 rounded-lg outline-none pl-10 w-[500px]"
                placeholder="Full Name"
                value={data.fullName}
                onChange={(e) => setData({ ...data, fullName: e.target.value })}
              />
            </div>
            <div className="relative">
              <User className="absolute top-1/2 -translate-y-1/2 left-2" />
              <input
                type="date"
                className="px-5 py-3 shadow border border-gray-300 rounded-lg outline-none pl-10 w-[500px]"
                placeholder="Full Name"
                value={data.birthDate}
                onChange={(e) =>
                  setData({ ...data, birthDate: e.target.value })
                }
              />
            </div>
            <div className="relative">
              <User className="absolute top-1/2 -translate-y-1/2 left-2" />
              <input
                type="text"
                className="px-5 py-3 shadow border border-gray-300 rounded-lg outline-none pl-10 w-[500px]"
                placeholder="Goal"
                value={data.goal}
                onChange={(e) => setData({ ...data, goal: e.target.value })}
              />
            </div>
            <div className="relative">
              <User className="absolute top-1/2 -translate-y-1/2 left-2" />
              <input
                type="number"
                className="px-5 py-3 shadow border border-gray-300 rounded-lg outline-none pl-10 w-[500px]"
                placeholder="Height(cm)"
                step={0.01}
                value={data.height}
                onChange={(e) => setData({ ...data, height: e.target.value })}
              />
            </div>
            <div className="relative">
              <User className="absolute top-1/2 -translate-y-1/2 left-2" />
              <input
                type="number"
                className="px-5 py-3 shadow border border-gray-300 rounded-lg outline-none pl-10 w-[500px]"
                placeholder="Weight(kg)"
                step={0.01}
                value={data.weight}
                onChange={(e) => setData({ ...data, weight: e.target.value })}
              />
            </div>
            <div className="relative">
              <textarea
                className="px-5 py-3 shadow border border-gray-300 rounded-lg outline-none w-[500px] resize-none h-30"
                placeholder="Activity Level"
                value={data.activityLevel}
                onChange={(e) =>
                  setData({ ...data, activityLevel: e.target.value })
                }
              ></textarea>
            </div>
            <div className="relative">
              <textarea
                className="px-5 py-3 shadow border border-gray-300 rounded-lg outline-none w-[500px] resize-none h-30"
                placeholder="Daily Restrictions"
                value={data.dailyRestrictions}
                onChange={(e) =>
                  setData({ ...data, dailyRestrictions: e.target.value })
                }
              ></textarea>
            </div>
            <div className="gap-6 mb-4 flex items-center gap-5">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={data.calisthenics || false}
                  onChange={(e) =>
                    setData({ ...data, calisthenics: e.target.checked })
                  }
                />
                <span className="text-gray-700 font-medium">Calisthenics</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={data.gym || false}
                  onChange={(e) => setData({ ...data, gym: e.target.checked })}
                />
                <span className="text-gray-700 font-medium">Gym</span>
              </label>
            </div>
            <button className="text-white bg-[#FF6B6B] rounded-lg text-sm font-semibold w-full py-3 mt-2 cursor-pointer hover:scale-105 hover:bg-[#fc5d5d] mb-5">
              Save
            </button>
          </form>

          <ToastContainer />
        </div>
        <div className="">
          <h1 className="text-center text-lg font-semibold mb-5">
            Your Current Split
          </h1>
          <ul>
            {workouts.map((workout: Workout) => {
              return <li>{workout.sessionLabel}</li>;
            })}
          </ul>
          <button
            className="bg-blue-400 text-white text-xl font-semibold px-10 py-5 rounded-lg cursor-pointer hover:scale-105 shadow h-fit mt-10 flex items-center justify-center gap-5"
            onClick={() => generatePlan()}
          >
            {workouts
              ? isPending
                ? "Regenerating"
                : "Regenerate"
              : isPending
              ? "Generating"
              : "Generate"}{" "}
            My Custom Plan{" "}
            {isPending && (
              <div className="w-5 h-5 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
            )}
          </button>
        </div>
      </div>
    </BodyLayout>
  );
};

export default Profile;
