"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import Button from "../Sidebar/Button/Button";
import { add, plus } from "@/app/utils/Icons";

// Компонент для создания новой задачи
function CreateContent() {
  // Состояния для управления формой
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);

  // Извлечение данных из глобального состояния
  const { theme, allTasks, closeModal } = useGlobalState();

  // Обработчик изменения значений полей формы
  const handleChange = (name: string) => (e: any) => {
    switch (name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      case "completed":
        setCompleted(e.target.checked);
        break;
      case "important":
        setImportant(e.target.checked);
        break;
      default:
        break;
    }
  };

  // Обработчик отправки формы
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Формирование объекта задачи
    const task = {
      title,
      description,
      date,
      completed,
      important,
    };

    try {
      // Отправка POST-запроса для создания задачи
      const res = await axios.post("/api/tasks", task);

      // Обработка ответа
      if (res.data.error) {
        toast.error(res.data.error);
      }

      if (!res.data.error) {
        // В случае успешного создания задачи обновление списка задач и закрытие модального окна
        toast.success("Задача создана.");
        allTasks();
        closeModal();
      }
    } catch (error) {
      // Обработка ошибки при отправке запроса
      toast.error("Что-то пошло не так.");
      console.log(error);
    }
  };

  // Рендеринг формы создания задачи
  return (
    <CreateContentStyled onSubmit={handleSubmit} theme={theme}>
      <h1>Добавить задачу</h1>
      {/* Поля ввода */}
      <div className="input-control">
        <label htmlFor="title">Название</label>
        <input
          type="text"
          id="title"
          value={title}
          name="title"
          onChange={handleChange("title")}
        />
      </div>
      <div className="input-control">
        <label htmlFor="description">Описание</label>
        <textarea
          value={description}
          onChange={handleChange("description")}
          name="description"
          id="description"
          rows={4}
        ></textarea>
      </div>
      <div className="input-control">
        <label htmlFor="date">Дата</label>
        <input
          value={date}
          onChange={handleChange("date")}
          type="date"
          name="date"
          id="date"
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="completed">Выполненная</label>
        <input
          value={completed.toString()}
          onChange={handleChange("completed")}
          type="checkbox"
          name="completed"
          id="completed"
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="important">Важная</label>
        <input
          value={important.toString()}
          onChange={handleChange("important")}
          type="checkbox"
          name="important"
          id="important"
        />
      </div>
      {/* Кнопка отправки формы */}
      <div className="submit-btn flex justify-end">
        <Button
          type="submit"
          name="Добавить задачу"
          icon={add}
          padding={"0.8rem 2rem"}
          borderRad={"0.8rem"}
          fw={"500"}
          fs={"1.2rem"}
          background={"rgb(0, 163, 255)"}
        />
      </div>
    </CreateContentStyled>
  );
}

// Стилизованная форма создания задачи
const CreateContentStyled = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
  }

  color: ${(props) => props.theme.colorGrey1};

  .input-control {
    position: relative;
    margin: 1.6rem 0;
    font-weight: 500;

    @media screen and (max-width: 450px) {
      margin: 1rem 0;
    }

    label {
      margin-bottom: 0.5rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);

      span {
        color: ${(props) => props.theme.colorGrey3};
      }
    }

    input,
    textarea {
      width: 100%;
      padding: 1rem;

      resize: none;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};
      border-radius: 0.5rem;
    }
  }

  .submit-btn button {
    transition: all 0.35s ease-in-out;

    @media screen and (max-width: 500px) {
      font-size: 0.9rem !important;
      padding: 0.6rem 1rem !important;

      i {
        font-size: 1.2rem !important;
        margin-right: 0.5rem !important;
      }
    }

    i {
      color: ${(props) => props.theme.colorGrey0};
    }

    &:hover {
      background: ${(props) => props.theme.colorPrimaryGreen} !important;
      color: ${(props) => props.theme.colorWhite} !important;
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    label {
      flex: 1;
    }

    input {
      width: initial;
    }
  }
`;

export default CreateContent;