"use client";
import React, { createContext, useState, useContext } from "react";
import themes from "./themes";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

// Создание контекста для глобального состояния
export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

// Компонент-поставщик глобального состояния
export const GlobalProvider = ({ children }) => {
  // Получение пользователя с помощью Clerk
  const { user } = useUser();

  // Состояния для темы, загрузки, модального окна, свернутого меню и задач
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [tasks, setTasks] = useState([]);

  // Выбор текущей темы из списка тем
  const theme = themes[selectedTheme];

  // Функции для работы с модальным окном
  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  // Функция для сворачивания/разворачивания меню
  const collapseMenu = () => {
    setCollapsed(!collapsed);
  };

  // Функция для загрузки всех задач
  const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks");

      // Сортировка задач по дате создания (от новых к старым)
      const sorted = res.data.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      setTasks(sorted);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Функция для удаления задачи
  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`/api/tasks/${id}`);
      toast.success("Задача удалена");

      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Что-то пошло не так");
    }
  };

  // Функция для обновления задачи
  const updateTask = async (task) => {
    try {
      const res = await axios.put(`/api/tasks`, task);

      toast.success("Задача обновлена");

      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Что-то пошло не так");
    }
  };

  // Фильтрация задач по статусу (выполненные, важные, невыполненные)
  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const importantTasks = tasks.filter((task) => task.isImportant === true);
  const incompleteTasks = tasks.filter((task) => task.isCompleted === false);

  // Загрузка задач при изменении пользователя
  useEffect(() => {
    if (user) allTasks();
  }, [user]);

  // Предоставление глобального состояния в контексте
  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        deleteTask,
        isLoading,
        completedTasks,
        importantTasks,
        incompleteTasks,
        updateTask,
        modal,
        openModal,
        closeModal,
        allTasks,
        collapsed,
        collapseMenu,
      }}
    >
      {/* Предоставление пустого значения обновления (не используется) */}
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

// Кастомные хуки для использования глобального состояния
export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);