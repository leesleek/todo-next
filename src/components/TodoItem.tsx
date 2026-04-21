"use client";

import { useState } from "react";
import { Todo, Priority, Category } from "@/types/todo";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string, priority: Priority, category: Category, dueDate?: string) => void;
}

const priorityColors: Record<Priority, string> = {
  high: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  medium: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
  low: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
};

const priorityDots: Record<Priority, string> = {
  high: "bg-red-500",
  medium: "bg-yellow-500",
  low: "bg-green-500",
};

const priorityLabels: Record<Priority, string> = {
  high: "높음",
  medium: "중간",
  low: "낮음",
};

const categoryEmojis: Record<Category, string> = {
  personal: "👤",
  work: "💼",
  shopping: "🛒",
  health: "💪",
  other: "📌",
};

const categoryOptions: { value: Category; label: string; emoji: string }[] = [
  { value: "personal", label: "개인", emoji: "👤" },
  { value: "work", label: "업무", emoji: "💼" },
  { value: "shopping", label: "쇼핑", emoji: "🛒" },
  { value: "health", label: "건강", emoji: "💪" },
  { value: "other", label: "기타", emoji: "📌" },
];

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority);
  const [editCategory, setEditCategory] = useState<Category>(todo.category);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate ?? "");

  function saveEdit() {
    const trimmed = editText.trim();
    if (!trimmed) return;
    onEdit(todo.id, trimmed, editPriority, editCategory, editDueDate || undefined);
    setEditing(false);
  }

  const isOverdue =
    todo.dueDate && !todo.completed && todo.dueDate < new Date().toISOString().split("T")[0];

  if (editing) {
    return (
      <li className="bg-white dark:bg-gray-800 rounded-xl border border-blue-300 dark:border-blue-600 p-3 shadow-sm">
        <input
          autoFocus
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") saveEdit(); if (e.key === "Escape") setEditing(false); }}
          className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 mb-2"
        />
        <div className="flex flex-wrap gap-2 mb-2">
          <div className="flex gap-1">
            {(["high", "medium", "low"] as Priority[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setEditPriority(p)}
                className={`px-2 py-1 text-xs rounded-lg border transition ${
                  editPriority === p
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600"
                    : "border-gray-200 dark:border-gray-600 text-gray-500"
                }`}
              >
                {priorityLabels[p]}
              </button>
            ))}
          </div>
          <select
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value as Category)}
            className="text-xs border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-900 outline-none"
          >
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.emoji} {opt.label}</option>
            ))}
          </select>
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className="text-xs border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-900 outline-none"
          />
        </div>
        <div className="flex gap-2 justify-end">
          <button onClick={() => setEditing(false)} className="text-xs px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700">취소</button>
          <button onClick={saveEdit} className="text-xs px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600">저장</button>
        </div>
      </li>
    );
  }

  return (
    <li className={`group bg-white dark:bg-gray-800 rounded-xl border transition-all ${
      todo.completed
        ? "border-gray-100 dark:border-gray-700 opacity-60"
        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
    } p-3 flex items-start gap-3 shadow-sm`}>
      <button
        onClick={() => onToggle(todo.id)}
        className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition ${
          todo.completed
            ? "bg-blue-500 border-blue-500"
            : "border-gray-300 dark:border-gray-500 hover:border-blue-400"
        }`}
      >
        {todo.completed && (
          <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`text-sm leading-snug break-words ${todo.completed ? "line-through text-gray-400 dark:text-gray-500" : "text-gray-800 dark:text-gray-200"}`}>
          {todo.text}
        </p>
        <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
          <span className={`inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-md font-medium ${priorityColors[todo.priority]}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${priorityDots[todo.priority]}`} />
            {priorityLabels[todo.priority]}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {categoryEmojis[todo.category]}
          </span>
          {todo.dueDate && (
            <span className={`text-xs ${isOverdue ? "text-red-500 font-medium" : "text-gray-400 dark:text-gray-500"}`}>
              {isOverdue ? "⚠️ " : "📅 "}{todo.dueDate}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition flex-shrink-0">
        <button
          onClick={() => setEditing(true)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
            <path d="M11.5 2.5l2 2L5 13H3v-2L11.5 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
            <path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </li>
  );
}
