import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Обработчик DELETE-запроса
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Извлечение идентификатора пользователя из аутентификации
    const { userId } = auth();
    // Извлечение идентификатора задачи из параметров запроса
    const { id } = params;

    // Проверка наличия пользователя
    if (!userId) {
      // Возвращение ответа с кодом 401, если пользователь не аутентифицирован
      return new NextResponse("Неавторизован", { status: 401 });
    }

    // Удаление задачи из базы данных с использованием Prisma
    const task = await prisma.task.delete({
      where: {
        id,
      },
    });

    // Возвращение JSON-ответа с удаленной задачей
    return NextResponse.json(task);
  } catch (error) {
    // Обработка ошибки при удалении задачи
    console.log("Ошибка при удалении задачи: ", error);
    // Возвращение JSON-ответа с ошибкой и кодом 500 в случае ошибки
    return NextResponse.json({ error: "Ошибка при удалении задачи", status: 500 });
  }
}