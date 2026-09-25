import { notFound } from "next/navigation";

import { workouts } from "../../../data/workouts";
import DetailActions from "../../../components/DetailActions";

export function generateStaticParams() {
  return workouts.map((workout) => ({
    id: String(workout.id),
  }));
}

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const workout = workouts.find(
    (item) => item.id === Number(id)
  );

  if (!workout) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0d0f0e]">
      <div className="container-fit py-8 md:py-12">
        {/* Main Detail Section */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10">
          
          {/* Workout Image */}
          <div>
            <img
              src={workout.image}
              alt={workout.name}
              className="h-105 w-full rounded-xl object-cover sm:h-125 lg:h-140"
            />
          </div>

          {/* Workout Information */}
          <div className="flex flex-col">
            
            {/* Title */}
            <h1 className="display text-4xl uppercase leading-none sm:text-5xl">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#8f9691] sm:text-base">
              {workout.description}
            </p>

            {/* Muscle Groups */}
            <div className="mt-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#ccff00] px-4 py-1 text-xs font-bold text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Specifications */}
            <div className="mt-6 overflow-hidden rounded-xl border border-[#292e2b] bg-[#151918]">
              
              <Spec
                label="EQUIPMENT"
                value={workout.equipment}
              />

              <Spec
                label="DIFFICULTY"
                value={workout.difficulty}
              />

              <Spec
                label="SETS"
                value={String(workout.sets)}
              />

              <Spec
                label="REPS"
                value={workout.reps}
              />

              <Spec
                label="DURATION"
                value={`${workout.duration} min`}
              />

              <Spec
                label="CALORIES"
                value={`${workout.caloriesBurned} kcal`}
              />

              <Spec
                label="RATING"
                value={String(workout.rating)}
                last
              />
            </div>

            {/* Instructions */}
            <div className="mt-7">
              <h2 className="text-sm font-black tracking-wide">
                INSTRUCTIONS
              </h2>

              <div className="mt-4 space-y-3">
                {workout.instructions.map(
                  (instruction, index) => (
                    <div
                      key={instruction}
                      className="flex gap-3 text-sm leading-6 text-[#b4bab6]"
                    >
                      <span className="min-w-4.5 text-[#8f9691]">
                        {index + 1}.
                      </span>

                      <p>{instruction}</p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Buttons */}
            <DetailActions workout={workout} />
          </div>
        </div>
      </div>
    </main>
  );
}

function Spec({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-4 ${
        !last ? "border-b border-[#292e2b]" : ""
      }`}
    >
      <span className="text-[10px] font-bold tracking-widest text-[#8f9691]">
        {label}
      </span>

      <span className="text-sm text-[#e2e5e2]">
        {value}
      </span>
    </div>
  );
}