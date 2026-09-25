import Link from "next/link";

type Workout = {
  id: string | number;
  image: string;
  name: string;
  muscleGroups: string[];
  equipment: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
};

export default function WorkoutCard({
  workout,
}: {
  workout: Workout;
}) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="
        group
        block
        overflow-hidden
        rounded-xl
        border
        border-[#25282e]
        bg-[#15171c]
        transition-all
        duration-200
        hover:-translate-y-1
        hover:border-[#3a3d43]
      "
    >
      {/* IMAGE */}
      <div className="relative h-46.25 overflow-hidden bg-[#101216]">
        <img
          src={workout.image}
          alt={workout.name}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />
      </div>

      {/* CONTENT */}
      <div className="p-3">
        {/* MUSCLE TAGS */}
        <div className="mb-2 flex min-h-[17px] flex-wrap gap-1">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="
                rounded-[3px]
                bg-[#ccff00]
                px-1.5
                py-[3px]
                text-[8px]
                font-black
                uppercase
                leading-none
                tracking-wide
                text-black
              "
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* TITLE */}
        <h3
          className="
            text-[12px]
            font-black
            uppercase
            leading-tight
            text-white
          "
        >
          {workout.name}
        </h3>

        {/* EQUIPMENT */}
        <p className="mt-1 text-[9px] text-[#70747c]">
          {workout.equipment}
        </p>

        {/* DIVIDER */}
        <div className="my-2.5 h-px bg-[#25282e]" />

        {/* STATS */}
        <div className="flex items-center gap-3 text-[8px] text-[#777b82]">
          <span className="flex items-center gap-1">
            <span className="text-[#8b8f96]">◷</span>
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1">
            <span className="text-[#8b8f96]">◉</span>
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1">
            <span className="text-[#8b8f96]">★</span>
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}