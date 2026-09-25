"use client";

import toast from "react-hot-toast";
import {
  CalendarDaysIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

import { useApp } from "../context/AppContext";

type Workout = Parameters<ReturnType<typeof useApp>["addToPlan"]>[0];

export default function DetailActions({
  workout,
}: {
  workout: Workout;
}) {
  const {
    plan,
    saved,
    addToPlan,
    saveWorkout,
  } = useApp();

  const alreadyInPlan = plan.some(
    (item) => (item as typeof workout).id === workout.id
  );

  const alreadySaved = saved.some(
    (item) => item.id === workout.id
  );

  function handleAdd() {
    const added = addToPlan(workout);

    if (added) {
      toast.success("Added to today's plan");
    } else if (alreadyInPlan) {
      toast("Already in your plan");
    } else {
      toast.error(
        "Your plan can contain up to 5 workouts"
      );
    }
  }

  function handleSave() {
    const savedSuccessfully = saveWorkout(workout);

    if (savedSuccessfully) {
      toast.success("Saved for later");
    } else {
      toast("Already saved");
    }
  }

  return (
    <div className="mt-7 flex flex-wrap gap-3">
      {/* Add to Plan */}
      <button
        onClick={handleAdd}
        disabled={alreadyInPlan}
        className="acid-btn flex items-center gap-2 rounded-lg px-5 py-3 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-50"
      >
        <CalendarDaysIcon className="h-4 w-4" />

        {alreadyInPlan
          ? "Added to today's plan"
          : "Add to today's plan"}
      </button>

      {/* Save */}
      <button
        onClick={handleSave}
        disabled={alreadySaved}
        className="outline-btn flex items-center gap-2 rounded-lg px-5 py-3 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-50"
      >
        <BookmarkIcon className="h-4 w-4" />

        {alreadySaved
          ? "Saved"
          : "Save for later"}
      </button>
    </div>
  );
}