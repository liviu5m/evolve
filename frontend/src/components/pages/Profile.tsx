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
import type { UserUpdateData } from "@/lib/Types";
import { useAppContext } from "@/lib/AppProvider";
import { useMutation } from "@tanstack/react-query";
import { updateUserData } from "@/api/user";
import { toast, ToastContainer } from "react-toastify";

const Profile = () => {
  const { user, setUser } = useAppContext();
  const [data, setData] = useState<UserUpdateData>({
    fullName: user?.fullName || "",
    birthDate: user?.birthDate || undefined,
    goal: user?.goal || "",
    height: String(user?.height) || undefined,
    weight: String(user?.weight) || undefined,
    activityLevel: user?.activityLevel || "",
    dailyRestrictions: user?.dailyRestrictions || "",
  });

  const handleDateSelect = (newDate: Date | undefined) => {
    setData((prevData) => ({
      ...prevData,
      birthDate: newDate || undefined,
    }));
  };

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

  return (
    <BodyLayout>
      <div className="flex items-center justify-center mt-20 flex-col gap-5">
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
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!data.birthDate}
                  className="px-5 py-5 shadow border border-gray-300 rounded-lg outline-none pl-10 w-[500px] flex justify-start"
                >
                  <CalendarIcon />
                  {data.birthDate ? (
                    format(data.birthDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={data.birthDate}
                  onSelect={handleDateSelect}
                />
              </PopoverContent>
            </Popover>
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
          <button className="text-white bg-[#FF6B6B] rounded-lg text-sm font-semibold w-full py-3 mt-2 cursor-pointer hover:scale-105 hover:bg-[#fc5d5d] mb-5">
            Save
          </button>
        </form>
        <ToastContainer />
      </div>
    </BodyLayout>
  );
};

export default Profile;
