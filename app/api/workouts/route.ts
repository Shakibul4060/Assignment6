import { NextResponse } from "next/server";

import { workouts } from "../../../data/workouts";

export async function GET() {
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  return NextResponse.json(workouts);
}