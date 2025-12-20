import React from "react";
import { Dumbbell, Check, Clock, PlayCircle } from "lucide-react";
import type { ProgressData, Workout, WorkoutLog } from "@/lib/Types";
import { Card } from "./Card";

export function WorkoutCard({
  workout,
  updateProgress,
  currentProgress,
}: {
  workout: Workout;
  updateProgress: (e: ProgressData) => void;
  currentProgress: ProgressData;
}) {
  return (
    <div
      className={`border-l-4 bg-white rounded-xl shadow-sm border p-10 border-gray-100 overflow-hidden  ${
        currentProgress.workout
          ? "border-green-500 opacity-75"
          : "border-[#0F172A]"
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-[#0F172A]">
              {workout?.sessionLabel}
            </h3>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {workout?.totalTime} min
            </span>
          </div>
        </div>
        <button
          onClick={() => {
            updateProgress({ workout: !currentProgress.workout });
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
            currentProgress.workout
              ? "bg-green-100 text-green-700"
              : "bg-[#0F172A] text-white hover:bg-[#1E293B]"
          }`}
        >
          {currentProgress.workout ? (
            <>
              <Check className="w-4 h-4" /> Completed
            </>
          ) : (
            "Mark Complete"
          )}
        </button>
      </div>

      <div className="space-y-3">
        {workout?.logs.map((exercise, idx) => (
          <div
            key={exercise.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <span className="text-gray-400 font-bold w-4">{idx + 1}</span>
              <div>
                <p className="font-medium text-[#0F172A]">
                  {exercise.exerciseName}
                </p>
                <p className="text-xs text-gray-500">
                  {exercise.sets} sets × {exercise.reps} reps •{" "}
                  {exercise.restTime} rest
                </p>
              </div>
            </div>
            {/* {exercise.videoUrl && (
                <button className="text-gray-400 hover:text-[#FF6B6B]">
                  <PlayCircle className="w-5 h-5" />
                </button>
              )} */}
          </div>
        ))}
      </div>
    </div>
  );
}
