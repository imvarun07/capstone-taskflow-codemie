import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  onAdd: (title: string) => Promise<void>;
}

export function AddTodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    try {
      setSubmitting(true);
      await onAdd(trimmed);
      setTitle("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="新しいTODOを入力..."
        disabled={submitting}
        className="flex-1"
        autoFocus
      />
      <Button type="submit" disabled={submitting || !title.trim()}>
        追加
      </Button>
    </form>
  );
}
