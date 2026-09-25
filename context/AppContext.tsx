"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// Keep the context independent from the data file location. The workout
// objects may contain additional fields, but every workout must have an id.
export interface Workout {
  id: number;
}

export interface PlanWorkout extends Workout {
  done: boolean;
}

interface AppContextType {
  plan: PlanWorkout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;
  toggleDone: (id: number) => void;
  saveWorkout: (workout: Workout) => boolean;
  removeSaved: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(
  undefined
);

export function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [plan, setPlan] = useState<PlanWorkout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved = localStorage.getItem("fitlog-saved");

      if (storedPlan) {
        setPlan(JSON.parse(storedPlan));
      }

      if (storedSaved) {
        setSaved(JSON.parse(storedSaved));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    }
  }, [plan, loaded]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("fitlog-saved", JSON.stringify(saved));
    }
  }, [saved, loaded]);

  function addToPlan(workout: Workout) {
    if (plan.length >= 5) return false;
    if (plan.some((item) => item.id === workout.id)) return false;

    setPlan((current) => [
      ...current,
      { ...workout, done: false },
    ]);

    return true;
  }

  function removeFromPlan(id: number) {
    setPlan((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  function toggleDone(id: number) {
    setPlan((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, done: !item.done }
          : item
      )
    );
  }

  function saveWorkout(workout: Workout) {
    if (saved.some((item) => item.id === workout.id)) {
      return false;
    }

    setSaved((current) => [...current, workout]);
    return true;
  }

  function removeSaved(id: number) {
    setSaved((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  return (
    <AppContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        toggleDone,
        saveWorkout,
        removeSaved,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
}