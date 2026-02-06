import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import type { Todo } from "@/lib/types";
import { Trash2 } from "lucide-react";

interface Props {
  todo: Todo;
  onToggle: (todo: Todo) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <div className="flex items-center gap-3 rounded-md border px-4 py-3 transition-colors hover:bg-accent/50">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo)}
        id={`todo-${todo.id}`}
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={`flex-1 cursor-pointer select-none text-sm ${
          todo.completed
            ? "text-muted-foreground line-through"
            : "text-foreground"
        }`}
      >
        {todo.title}
      </label>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(todo.id)}
        className="h-8 w-8 text-muted-foreground hover:text-destructive"
        aria-label="削除"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
