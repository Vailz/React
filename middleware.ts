import { authMiddleware } from "@clerk/nextjs";

// Использование authMiddleware с пустым объектом конфигурации.
export default authMiddleware({});

// Конфигурация для middleware, определяющая маршруты, на которые будет применяться middleware.
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};