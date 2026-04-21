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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          TODO 리스트
        </h1>
        <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
          총 {stats.total}개 · 미완료 {stats.active}개 · 완료 {stats.completed}개
        </p>
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
        <div className="text-center py-16 text-gray-400 dark:text-gray-600">
          <p className="text-4xl mb-3">📝</p>
          <p className="text-sm">할 일이 없습니다</p>
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
