import { useCallback, useEffect, useState } from "react";
import type { Todo } from "@/lib/types";
import { todoApi } from "@/lib/api";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoApi.list();
      setTodos(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addTodo = async (title: string) => {
    const created = await todoApi.create({ title });
    setTodos((prev) => [created, ...prev]);
  };

  const toggleTodo = async (todo: Todo) => {
    const updated = await todoApi.update(todo.id, {
      completed: !todo.completed,
    });
    setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const deleteTodo = async (id: number) => {
    await todoApi.delete(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return { todos, loading, error, addTodo, toggleTodo, deleteTodo, refresh };
}
