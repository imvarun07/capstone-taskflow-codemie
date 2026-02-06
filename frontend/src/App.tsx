import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddTodoForm } from "@/components/AddTodoForm";
import { TodoList } from "@/components/TodoList";
import { useTodos } from "@/hooks/useTodos";
import { toast } from "sonner";

function App() {
  const { todos, loading, error, addTodo, toggleTodo, deleteTodo } =
    useTodos();

  const handleAdd = async (title: string) => {
    try {
      await addTodo(title);
      toast.success("TODOを追加しました");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "追加に失敗しました");
    }
  };

  const handleToggle = async (todo: Parameters<typeof toggleTodo>[0]) => {
    try {
      await toggleTodo(todo);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "更新に失敗しました");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      toast.success("TODOを削除しました");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "削除に失敗しました");
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-start px-4 py-12">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">📝 TODO App</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <AddTodoForm onAdd={handleAdd} />

          {loading && (
            <p className="text-center text-sm text-muted-foreground">
              読み込み中...
            </p>
          )}

          {error && (
            <p className="text-center text-sm text-destructive">
              エラー: {error}
            </p>
          )}

          {!loading && !error && (
            <TodoList
              todos={todos}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          )}

          {!loading && !error && todos.length > 0 && (
            <p className="text-center text-xs text-muted-foreground">
              {todos.filter((t) => t.completed).length} / {todos.length} 完了
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
