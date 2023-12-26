"use client";
import React from "react";
import styled from "styled-components";

// Интерфейс для пропсов
interface Props {
  children: React.ReactNode;
}

// Компонент-поставщик глобальных стилей
function GlobalStyleProvider({ children }: Props) {
  // Отображение компонента с глобальными стилями
  return <GlobalStyles>{children}</GlobalStyles>;
}

// Стили для глобальных стилей
const GlobalStyles = styled.div`
  padding: 2.5rem;
  display: flex;
  gap: 2.5rem;
  height: 100%;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
`;

// Экспорт компонента
export default GlobalStyleProvider;
