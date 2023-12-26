"use client";
import React from "react";
import { GlobalProvider } from "../context/globalProvider";
import { Toaster } from "react-hot-toast";

// Интерфейс для пропсов
interface Props {
  children: React.ReactNode;
}

// Компонент-поставщик контекста
function ContextProvider({ children }: Props) {
  // Состояние для отслеживания готовности компонента
  const [isReady, setIsReady] = React.useState(false);

  // Имитация задержки для отображения лоадера
  React.useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 250);
  }, []);

  // Отображение лоадера, пока компонент не готов
  if (!isReady) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  // Предоставление глобального состояния и вывод дочерних компонентов
  return (
    <GlobalProvider>
      <Toaster />
      {children}
    </GlobalProvider>
  );
}

// Экспорт компонента
export default ContextProvider;