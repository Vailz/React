"use client";
import React from "react";
import { useGlobalState } from "../context/globalProvider";
import Tasks from "../Components/tasks/Tasks";

function page() {
  const { importantTasks } = useGlobalState();
  return <Tasks title="Важные задачи" tasks={importantTasks} />;
}

export default page;