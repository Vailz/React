"use client";
import React from "react";
import { useGlobalState } from "../context/globalProvider";
import Tasks from "../Components/tasks/Tasks";

function page() {
  // Извлечение завершенных задач из глобального состояния
  const { completedTasks } = useGlobalState();

  // Возвращение компонента Tasks с передачей заголовка и списка завершенных задач
  return <Tasks title="Выполненные задачи" tasks={completedTasks} />;
}

// Экспорт компонента страницы
export default page;