"use client";

import { useState, useEffect, useCallback } from "react";
import { Todo, Priority, Category, FilterStatus } from "@/types/todo";

const STORAGE_KEY = "todos";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterCategory, setFilterCategory] = useState<Category | "all">("all");
  const [filterPriority, setFilterPriority] = useState<Priority | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setTodos(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback(
    (text: string, priority: Priority, category: Category, dueDate?: string) => {
      setTodos((prev) => [
        {
          id: crypto.randomUUID(),
          text,
          completed: false,
          priority,
          category,
          createdAt: Date.now(),
          dueDate,
        },
        ...prev,
      ]);
    },
    []
  );

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const editTodo = useCallback(
    (id: string, text: string, priority: Priority, category: Category, dueDate?: string) => {
      setTodos((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, text, priority, category, dueDate } : t
        )
      );
    },
    []
  );

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }, []);

  const filteredTodos = todos.filter((t) => {
    if (filterStatus === "active" && t.completed) return false;
    if (filterStatus === "completed" && !t.completed) return false;
    if (filterCategory !== "all" && t.category !== filterCategory) return false;
    if (filterPriority !== "all" && t.priority !== filterPriority) return false;
    if (searchQuery && !t.text.toLowerCase().includes(searchQuery.toLowerCase()))
      return false;
    return true;
  });

  const stats = {
    total: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  return {
    todos: filteredTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    filterStatus,
    setFilterStatus,
    filterCategory,
    setFilterCategory,
    filterPriority,
    setFilterPriority,
    searchQuery,
    setSearchQuery,
    stats,
  };
}
