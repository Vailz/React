"use client";
import Tasks from "./Components/tasks/Tasks";
import { useGlobalState } from "./context/globalProvider";

export default function Home() {
  const { tasks } = useGlobalState();

  return <Tasks title="Все задачи" tasks={tasks} />;
}