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

const Profile = () => {
  const [date, setDate] = useState<Date>();

  return (
    <BodyLayout>
      <div className="flex items-center justify-center mt-20 flex-col gap-5">
        <h1 className="text-2xl font-semibold">Manage Your Profile</h1>
        <form className="mt-7 flex flex-col gap-5">
          <div className="relative">
            <User className="absolute top-1/2 -translate-y-1/2 left-2" />
            <input
              type="text"
              className="px-5 py-3 shadow border border-gray-300 rounded-lg outline-none pl-10 w-[500px]"
              placeholder="Name"
            />
          </div>
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!date}
                  className="px-5 py-5 shadow border border-gray-300 rounded-lg outline-none pl-10 w-[500px] flex justify-start"
                >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </PopoverContent>
            </Popover>
          </div>
          <div className="relative">
            <User className="absolute top-1/2 -translate-y-1/2 left-2" />
            <input
              type="text"
              className="px-5 py-3 shadow border border-gray-300 rounded-lg outline-none pl-10 w-[500px]"
              placeholder="Goal"
            />
          </div>
          <div className="relative">
            <User className="absolute top-1/2 -translate-y-1/2 left-2" />
            <input
              type="number"
              className="px-5 py-3 shadow border border-gray-300 rounded-lg outline-none pl-10 w-[500px]"
              placeholder="Height(cm)"
              step={0.01}
            />
          </div>
          <div className="relative">
            <User className="absolute top-1/2 -translate-y-1/2 left-2" />
            <input
              type="number"
              className="px-5 py-3 shadow border border-gray-300 rounded-lg outline-none pl-10 w-[500px]"
              placeholder="Weight(kg)"
              step={0.01}
            />
          </div>
          <div className="relative">
            <textarea
              className="px-5 py-3 shadow border border-gray-300 rounded-lg outline-none w-[500px] resize-none h-30"
              placeholder="Activity Level"
            ></textarea>
          </div>
          <div className="relative">
            <textarea
              className="px-5 py-3 shadow border border-gray-300 rounded-lg outline-none w-[500px] resize-none h-30"
              placeholder="Daily Restrictions"
            ></textarea>
          </div>
          <button className="text-white bg-[#FF6B6B] rounded-lg text-sm font-semibold w-full py-3 mt-2 cursor-pointer hover:scale-105 hover:bg-[#fc5d5d] mb-5">
            Save
          </button>
        </form>
      </div>
    </BodyLayout>
  );
};

export default Profile;
