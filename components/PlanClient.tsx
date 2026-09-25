"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  CheckIcon,
  ClockIcon,
  FireIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { useApp } from "../context/AppContext";

type Tab = "plan" | "saved";
type SortType = "duration" | "calories" | "rating";


export default function PlanClient() {
  const {
    plan,
    saved,
    removeFromPlan,
    toggleDone,
    removeSaved,
  } = useApp();

  const [tab, setTab] = useState<Tab>("plan");
  const [sort, setSort] = useState<SortType>("duration");

  const totalMinutes = plan.reduce(
    (sum, item) =>
      sum + ((item as unknown as { duration: number }).duration ?? 0),
    0
  );

  const totalCalories = plan.reduce(
    (sum, item) =>
      sum +
      ((item as unknown as { caloriesBurned?: number }).caloriesBurned ?? 0),
    0
  );

  const sortedPlan = [...plan].sort((a, b) => {
    if (sort === "duration") {
      return (
        (a as unknown as { duration: number }).duration -
        (b as unknown as { duration: number }).duration
      );
    }

    if (sort === "calories") {
      return (
        ((a as unknown as { caloriesBurned?: number }).caloriesBurned ?? 0) -
        ((b as unknown as { caloriesBurned?: number }).caloriesBurned ?? 0)
      );
    }

    return (
      ((b as unknown as { rating?: number }).rating ?? 0) -
      ((a as unknown as { rating?: number }).rating ?? 0)
    );
  });

  const sortedSaved = [...saved].sort((a, b) => {
    if (sort === "duration") {
      return (
        (a as unknown as { duration: number }).duration -
        (b as unknown as { duration: number }).duration
      );
    }

    if (sort === "calories") {
      return (
        ((a as unknown as { caloriesBurned?: number }).caloriesBurned ?? 0) -
        ((b as unknown as { caloriesBurned?: number }).caloriesBurned ?? 0)
      );
    }

    return (
      ((b as unknown as { rating?: number }).rating ?? 0) -
      ((a as unknown as { rating?: number }).rating ?? 0)
    );
  });

  function handleDone(id: number) {
    toggleDone(id);
    toast.success("Workout status updated");
  }

  function handleRemovePlan(id: number) {
    removeFromPlan(id);
    toast.success("Removed from today's plan");
  }

  function handleRemoveSaved(id: number) {
    removeSaved(id);
    toast.success("Removed from saved");
  }

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#0d0f0e]">
      <div className="container-fit py-10 md:py-12">

        {/* Page Header */}
        <section>
          <h1 className="display text-4xl uppercase sm:text-5xl">
            MY PLAN
          </h1>

          <p className="mt-2 text-sm text-[#777f79]">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </section>

        {/* Metrics */}
        <section className="mt-6 overflow-hidden rounded-xl border border-[#292e2b] bg-[#15181c]">
          <div className="grid grid-cols-3">
            <Metric
              label="Exercises"
              value={plan.length}
              lime
            />

            <Metric
              label="Minutes"
              value={totalMinutes}
              border
            />

            <Metric
              label="Calories"
              value={totalCalories}
              border
            />
          </div>
        </section>

        {/* Tabs + Sort */}
        <div className="mt-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          {/* Tabs */}
          <div className="flex w-fit rounded-lg border border-[#292e2b] bg-[#15181c] p-1">
            <button
              onClick={() => setTab("plan")}
              className={`rounded-md px-4 py-2 text-xs transition ${
                tab === "plan"
                  ? "bg-[#20252b] font-bold text-white"
                  : "text-[#777f79] hover:text-white"
              }`}
            >
              Today's Plan
            </button>

            <button
              onClick={() => setTab("saved")}
              className={`rounded-md px-4 py-2 text-xs transition ${
                tab === "saved"
                  ? "bg-[#20252b] font-bold text-white"
                  : "text-[#777f79] hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#777f79]">
              Sort By
            </span>

            <select
              value={sort}
              onChange={(event) =>
                setSort(event.target.value as SortType)
              }
              className="rounded-lg border border-[#292e2b] bg-[#15181c] px-3 py-2 text-xs text-white outline-none"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Workout List */}
        <section className="mt-5">
          {tab === "plan" ? (
            sortedPlan.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-3">
                {sortedPlan.map((workout) => {
                  const workoutId = (workout as unknown as { id: number }).id;

                  return (
                    <PlanWorkoutCard
                      key={workoutId}
                      workout={
                        workout as unknown as Parameters<
                          typeof PlanWorkoutCard
                        >[0]["workout"]
                      }
                      onDone={() => handleDone(workoutId)}
                      onRemove={() => handleRemovePlan(workoutId)}
                    />
                  );
                })}
              </div>
            )
          ) : sortedSaved.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-3">
              {sortedSaved.map((workout) => (
                <SavedWorkoutCard
                  key={workout.id}
                      workout={
                        workout as unknown as Parameters<
                          typeof PlanWorkoutCard
                        >[0]["workout"]
                      }
                  onRemove={() =>
                    handleRemoveSaved(workout.id)
                  }
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}


/* -------------------------------- */
/* Metric */
/* -------------------------------- */

function Metric({
  label,
  value,
  border = false,
  lime = false,
}: {
  label: string;
  value: number;
  border?: boolean;
  lime?: boolean;
}) {
  return (
    <div
      className={`px-5 py-6 md:px-6 ${
        border ? "border-l border-[#292e2b]" : ""
      }`}
    >
      <p className="text-xs text-[#777f79]">
        {label}
      </p>

      <p
        className={`display mt-2 text-4xl ${
          lime ? "text-[#ccff00]" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}


/* -------------------------------- */
/* Today's Plan Card */
/* -------------------------------- */

function PlanWorkoutCard({
  workout,
  onDone,
  onRemove,
}: {
  workout: {
    id: number;
    name: string;
    image: string;
    equipment: string;
    duration: number;
    caloriesBurned: number;
    rating: number;
    done: boolean;
  };
  onDone: () => void;
  onRemove: () => void;
}) {
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-[#292e2b] bg-[#15181c] p-3 sm:flex-row sm:items-center">

      {/* Thumbnail */}
      <img
        src={workout.image}
        alt={workout.name}
        className="h-20 w-full rounded-lg object-cover sm:h-16 sm:w-32"
      />

      {/* Information */}
      <div className="min-w-0 flex-1">

        <h3
          className={`font-black uppercase ${
            workout.done
              ? "text-[#777f79] line-through"
              : "text-white"
          }`}
        >
          {workout.name}
        </h3>

        <p className="mt-1 text-xs text-[#777f79]">
          {workout.equipment}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[#b1b6b2]">

          <span className="flex items-center gap-1">
            <ClockIcon className="h-3.5 w-3.5 text-[#ccff00]" />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1">
            <FireIcon className="h-3.5 w-3.5 text-[#ccff00]" />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1">
            <StarIcon className="h-3.5 w-3.5 text-[#ccff00]" />
            {workout.rating}
          </span>

        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">

        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-full border border-[#39403b] px-4 py-2 text-xs text-white transition hover:border-[#ccff00]"
        >
          View Details
        </Link>

        <button
          onClick={onDone}
          className="flex items-center gap-1.5 rounded-full bg-[#ccff00] px-4 py-2 text-xs font-bold text-black"
        >
          <CheckIcon className="h-4 w-4" />

          {workout.done
            ? "Done"
            : "Mark as Done"}
        </button>

        <button
          onClick={onRemove}
          aria-label="Remove workout"
          className="p-2 text-[#69716b] transition hover:text-red-400"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

      </div>
    </article>
  );
}


/* -------------------------------- */
/* Saved Card */
/* -------------------------------- */

function SavedWorkoutCard({
  workout,
  onRemove,
}: {
  workout: {
    id: number;
    name: string;
    image: string;
    equipment: string;
    duration: number;
    caloriesBurned: number;
    rating: number;
  };
  onRemove: () => void;
}) {
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-[#292e2b] bg-[#15181c] p-3 sm:flex-row sm:items-center">

      <img
        src={workout.image}
        alt={workout.name}
        className="h-20 w-full rounded-lg object-cover sm:h-16 sm:w-32"
      />

      <div className="min-w-0 flex-1">

        <h3 className="font-black uppercase text-white">
          {workout.name}
        </h3>

        <p className="mt-1 text-xs text-[#777f79]">
          {workout.equipment}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[#b1b6b2]">

          <span className="flex items-center gap-1">
            <ClockIcon className="h-3.5 w-3.5 text-[#ccff00]" />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1">
            <FireIcon className="h-3.5 w-3.5 text-[#ccff00]" />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1">
            <StarIcon className="h-3.5 w-3.5 text-[#ccff00]" />
            {workout.rating}
          </span>

        </div>
      </div>

      <div className="flex items-center gap-2">

        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-full border border-[#39403b] px-4 py-2 text-xs text-white transition hover:border-[#ccff00]"
        >
          View Details
        </Link>

        <button
          onClick={onRemove}
          aria-label="Remove saved workout"
          className="p-2 text-[#69716b] transition hover:text-red-400"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

      </div>
    </article>
  );
}


/* -------------------------------- */
/* Empty State */
/* -------------------------------- */

function EmptyState() {
  return (
    <div className="flex min-h-63.75 flex-col items-center justify-center rounded-xl border border-dashed border-[#292e2b] px-5 text-center">

      <h2 className="display text-2xl uppercase text-white">
        NOTHING HERE YET
      </h2>

      <p className="mt-2 text-xs text-[#777f79]">
        Browse the library and add a lift to get today moving.
      </p>

      <Link
        href="/"
        className="acid-btn mt-5 rounded-full px-6 py-3 text-xs font-bold"
      >
        Go to workouts
      </Link>
    </div>
  );
}