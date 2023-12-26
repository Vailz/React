"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import { edit, trash } from "@/app/utils/Icons";
import React from "react";
import styled from "styled-components";
import formatDate from "@/app/utils/formatDate";

// Интерфейс для пропсов компонента
interface Props {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  id: string;
}

// Компонент TaskItem
function TaskItem({ title, description, date, isCompleted, id }: Props) {
  // Извлечение данных из глобального состояния
  const { theme, deleteTask, updateTask } = useGlobalState();

  // Рендеринг компонента TaskItem
  return (
    <TaskItemStyled theme={theme}>
      {/* Название задачи */}
      <h1>{title}</h1>
      {/* Описание задачи */}
      <p>{description}</p>
      {/* Дата задачи */}
      <p className="date">{formatDate(date)}</p>
      {/* Футер задачи с кнопками управления */}
      <div className="task-footer">
        {/* Кнопка для изменения статуса выполнения задачи */}
        {isCompleted ? (
          <button
            className="completed"
            onClick={() => {
              // Объект с данными задачи для обновления
              const task = {
                id,
                isCompleted: !isCompleted,
              };

              // Вызов функции обновления задачи
              updateTask(task);
            }}
          >
            Выполненная
          </button>
        ) : (
          <button
            className="incomplete"
            onClick={() => {
              // Объект с данными задачи для обновления
              const task = {
                id,
                isCompleted: !isCompleted,
              };

              // Вызов функции обновления задачи
              updateTask(task);
            }}
          >
            Невыполненная
          </button>
        )}
        {/* Кнопка для удаления задачи */}
        <button
          className="delete"
          onClick={() => {
            // Вызов функции удаления задачи
            deleteTask(id);
          }}
        >
          {trash}
        </button>
      </div>
    </TaskItemStyled>
  );
}

// Стилизованный компонент TaskItem

const TaskItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};

  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    margin-top: auto;
  }

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }

    .edit {
      margin-left: auto;
    }

    .completed,
    .incomplete {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: ${(props) => props.theme.colorDanger};
      border-radius: 30px;
    }

    .completed {
      background: ${(props) => props.theme.colorGreenDark} !important;
    }
  }
`;

export default TaskItem;