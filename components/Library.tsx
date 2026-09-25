"use client";

import { useEffect, useState } from "react";

import WorkoutCard from "./WorkoutCard";
import Loading from "./Loading";

type Workout = {
  id: string;
  name: string;
  muscleGroups: string[];
  image: string;
  equipment: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
};

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch("/api/workouts");

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  const filtered = workouts.filter((workout) =>
    `${workout.name} ${workout.muscleGroups.join(" ")}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section
      id="library"
      className="container-fit py-16 md:py-20"
    >
      {/* HEADER */}
      <div className="mb-8">
        <h2 className="display text-5xl uppercase">
          THE LIBRARY
        </h2>

        <p className="mt-3 text-[#9ba09c]">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* WORKOUTS */}
      {loading ? (
        <Loading />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>
      )}
    </section>
  );
}