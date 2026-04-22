"use client";

import { useTodos } from "@/hooks/useTodos";
import TodoForm from "./TodoForm";
import TodoFilters from "./TodoFilters";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const {
    todos,
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
  } = useTodos();

  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 bg-clip-text text-transparent drop-shadow-sm">
          ✅ TODO 리스트
        </h1>
        <div className="mt-3 flex justify-center gap-3 text-xs font-semibold">
          <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300">총 {stats.total}개</span>
          <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-300">미완료 {stats.active}개</span>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-300">완료 {stats.completed}개</span>
        </div>
      </header>

      <TodoForm onAdd={addTodo} />

      <TodoFilters
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        stats={stats}
        onClearCompleted={clearCompleted}
      />

      {todos.length === 0 ? (
        <div className="text-center py-16 text-purple-300 dark:text-purple-700">
          <p className="text-5xl mb-3">🌈</p>
          <p className="text-sm font-medium">할 일이 없습니다</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
