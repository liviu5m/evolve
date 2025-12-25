import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Check, RefreshCw, Clock } from "lucide-react";
import type { MealLog, ProgressData } from "@/lib/Types";
import { Card } from "./Card";
import { isPast, isSameDay } from "date-fns";

export function MealCard({
  meal,
  updateProgress,
  currentProgress,
  regenerateMeal,
  selectedDate,
}: {
  meal: MealLog;
  updateProgress?: (e: ProgressData) => void;
  currentProgress: ProgressData;
  regenerateMeal?: (e: string) => void;
  selectedDate: Date;
}) {
  console.log(meal);

  let today = new Date();
  const mealKey = meal.mealType.toLowerCase() as keyof ProgressData;
  return (
    <Card className={`transition-all ${0 ? "opacity-75 bg-gray-50" : ""}`}>
      <div className="flex gap-4">
        <div className="w-24 h-24 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden">
          <img
            src={meal.imageUrl}
            alt={meal.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-[#FF6B6B] uppercase tracking-wider">
                  {meal.mealType}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />{" "}
                  {meal.mealTime.split(":").slice(0, -1).join(":")}
                </span>
              </div>
              <h3
                className={`font-bold text-[#0F172A] ${
                  currentProgress[mealKey] ? "line-through text-gray-500" : ""
                }`}
              >
                {meal.name}
              </h3>
            </div>
            {updateProgress && (
              <button
                onClick={() => {
                  if (isSameDay(today, selectedDate))
                    updateProgress({
                      ...currentProgress,
                      [mealKey]: !currentProgress[mealKey],
                    });
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors  ${
                  currentProgress[mealKey]
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                } ${!isSameDay(today, selectedDate) && "opacity-50"}`}
              >
                <Check className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <span className="font-medium">{meal.calories} kcal</span>
            <span className="text-gray-300">|</span>
            <span>P: {meal.protein}g</span>
            <span>C: {meal.carbs}g</span>
            <span>F: {meal.fats}g</span>
          </div>

          <div className="flex gap-2">
            <button className="text-xs font-medium text-gray-500 hover:text-[#0F172A] flex items-center gap-1">
              View Recipe
            </button>
            {regenerateMeal && (
              <button
                className="text-xs font-medium text-gray-500 hover:text-[#FF6B6B] flex items-center gap-1 ml-auto cursor-pointer"
                onClick={() => regenerateMeal(mealKey)}
              >
                <RefreshCw className="w-3 h-3" /> Regenerate
              </button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
