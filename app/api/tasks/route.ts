import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Обработчик POST-запроса для создания новой задачи
export async function POST(req: Request) {
  try {
    // Извлечение идентификатора пользователя из аутентификации
    const { userId } = auth();

    // Проверка наличия пользователя
    if (!userId) {
      // Возвращение JSON-ответа с ошибкой и кодом 401, если пользователь не аутентифицирован
      return NextResponse.json({ error: "Неавторизованный", status: 401 });
    }

    // Извлечение данных о задаче из тела запроса
    const { title, description, date, completed, important } = await req.json();

    // Проверка наличия обязательных полей
    if (!title || !description || !date) {
      // Возвращение JSON-ответа с ошибкой и кодом 400, если обязательные поля отсутствуют
      return NextResponse.json({
        error: "Заполните все поля",
        status: 400,
      });
    }

    // Проверка минимальной длины названия задачи
    if (title.length < 3) {
      // Возвращение JSON-ответа с ошибкой и кодом 400, если название слишком короткое
      return NextResponse.json({
        error: "Название должно содержать не менее 3 символов",
        status: 400,
      });
    }

    // Создание новой задачи в базе данных с использованием Prisma
    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
        userId,
      },
    });

    // Возвращение JSON-ответа с созданной задачей
    return NextResponse.json(task);
  } catch (error) {
    // Обработка ошибки при создании задачи
    console.log("Ошибка при создании задачи: ", error);
    // Возвращение JSON-ответа с ошибкой и кодом 500 в случае ошибки
    return NextResponse.json({ error: "Ошибка при создании задачи", status: 500 });
  }
}

// Обработчик GET-запроса для получения списка задач
export async function GET(req: Request) {
  try {
    // Извлечение идентификатора пользователя из аутентификации
    const { userId } = auth();

    // Проверка наличия пользователя
    if (!userId) {
      // Возвращение JSON-ответа с ошибкой и кодом 401, если пользователь не аутентифицирован
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    // Получение списка задач из базы данных с использованием Prisma
    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });

    // Возвращение JSON-ответа со списком задач
    return NextResponse.json(tasks);
  } catch (error) {
    // Обработка ошибки при получении списка задач
    console.log("Ошибка получения задачи: ", error);
    // Возвращение JSON-ответа с ошибкой и кодом 500 в случае ошибки
    return NextResponse.json({ error: "Ошибка обновления задачи", status: 500 });
  }
}

// Обработчик PUT-запроса для обновления статуса задачи
export async function PUT(req: Request) {
  try {
    // Извлечение идентификатора пользователя из аутентификации
    const { userId } = auth();
    // Извлечение данных о статусе задачи и её идентификаторе из тела запроса
    const { isCompleted, id } = await req.json();

    // Проверка наличия пользователя
    if (!userId) {
      // Возвращение JSON-ответа с ошибкой и кодом 401, если пользователь не аутентифицирован
      return NextResponse.json({ error: "Неавторизованный", status: 401 });
    }

    // Обновление статуса задачи в базе данных с использованием Prisma
    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        isCompleted,
      },
    });

    // Возвращение JSON-ответа с обновленной задачей
    return NextResponse.json(task);
  } catch (error) {
    // Обработка ошибки при обновлении статуса задачи
    console.log("Ошибка обновления задачи: ", error);
    // Возвращение JSON-ответа с ошибкой и кодом 500 в случае ошибки
    return NextResponse.json({ error: "Ошибка удаелния задачи", status: 500 });
  }
}