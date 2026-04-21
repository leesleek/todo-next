"use client";

import { useState, FormEvent } from "react";
import { Priority, Category } from "@/types/todo";

interface Props {
  onAdd: (text: string, priority: Priority, category: Category, dueDate?: string) => void;
}

const priorityOptions: { value: Priority; label: string; color: string }[] = [
  { value: "high", label: "높음", color: "text-red-500" },
  { value: "medium", label: "중간", color: "text-yellow-500" },
  { value: "low", label: "낮음", color: "text-green-500" },
];

const categoryOptions: { value: Category; label: string; emoji: string }[] = [
  { value: "personal", label: "개인", emoji: "👤" },
  { value: "work", label: "업무", emoji: "💼" },
  { value: "shopping", label: "쇼핑", emoji: "🛒" },
  { value: "health", label: "건강", emoji: "💪" },
  { value: "other", label: "기타", emoji: "📌" },
];

export default function TodoForm({ onAdd }: Props) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [category, setCategory] = useState<Category>("personal");
  const [dueDate, setDueDate] = useState("");
  const [expanded, setExpanded] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed, priority, category, dueDate || undefined);
    setText("");
    setDueDate("");
    setPriority("medium");
    setCategory("personal");
    setExpanded(false);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setExpanded(true)}
          placeholder="새 할 일 추가..."
          className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="px-4 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition"
        >
          추가
        </button>
      </div>

      {expanded && (
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">우선순위</label>
            <div className="flex gap-1">
              {priorityOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPriority(opt.value)}
                  className={`flex-1 py-1.5 text-xs rounded-lg border transition ${
                    priority === opt.value
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-gray-300"
                  }`}
                >
                  <span className={opt.color}>●</span> {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">카테고리</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full py-1.5 px-2 text-xs border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categoryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.emoji} {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">마감일</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full py-1.5 px-2 text-xs border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </form>
  );
}
