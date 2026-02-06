import type { Todo } from "@/lib/types";
import { TodoItem } from "./TodoItem";

interface Props {
  todos: Todo[];
  onToggle: (todo: Todo) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function TodoList({ todos, onToggle, onDelete }: Props) {
  if (todos.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        TODOがありません。上のフォームから追加してください。
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
