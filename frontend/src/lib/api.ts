import type { Todo, CreateTodoRequest, UpdateTodoRequest } from "./types";

const BASE = "/api/todos";

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message =
      body?.message ?? body?.errors?.[0]?.message ?? `HTTP ${res.status}`;
    throw new Error(message);
  }

  // 204 No Content
  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
}

export const todoApi = {
  list: () => request<Todo[]>(BASE),

  create: (data: CreateTodoRequest) =>
    request<Todo>(BASE, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: number, data: UpdateTodoRequest) =>
    request<Todo>(`${BASE}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    request<void>(`${BASE}/${id}`, { method: "DELETE" }),
};
