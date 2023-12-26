import { PrismaClient } from "@prisma/client";

// Объявление переменной prisma.
let prisma: PrismaClient;

// Проверка режима окружения.
if (process.env.NODE_ENV === "production") {
  // В случае продакшена создаем новый экземпляр PrismaClient.
  prisma = new PrismaClient();
} else {
  // В случае разработки.
  // @ts-ignore
  if (!global.prisma) {
    // @ts-ignore
    // Если в глобальном контексте нет экземпляра PrismaClient, создаем его.
    global.prisma = new PrismaClient();
  }
  // @ts-ignore
  // В любом случае присваиваем переменной prisma экземпляр PrismaClient из глобального контекста.
  prisma = global.prisma;
}

// Экспорт экземпляра PrismaClient для использования в других частях приложения.
export default prisma;