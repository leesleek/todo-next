"use client";

import { FilterStatus, Priority, Category } from "@/types/todo";

interface Props {
  filterStatus: FilterStatus;
  setFilterStatus: (s: FilterStatus) => void;
  filterCategory: Category | "all";
  setFilterCategory: (c: Category | "all") => void;
  filterPriority: Priority | "all";
  setFilterPriority: (p: Priority | "all") => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  stats: { total: number; active: number; completed: number };
  onClearCompleted: () => void;
}

const statusOptions: { value: FilterStatus; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "active", label: "미완료" },
  { value: "completed", label: "완료" },
];

const categoryOptions: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "모든 카테고리" },
  { value: "personal", label: "👤 개인" },
  { value: "work", label: "💼 업무" },
  { value: "shopping", label: "🛒 쇼핑" },
  { value: "health", label: "💪 건강" },
  { value: "other", label: "📌 기타" },
];

const priorityOptions: { value: Priority | "all"; label: string }[] = [
  { value: "all", label: "모든 우선순위" },
  { value: "high", label: "● 높음" },
  { value: "medium", label: "● 중간" },
  { value: "low", label: "● 낮음" },
];

export default function TodoFilters({
  filterStatus, setFilterStatus,
  filterCategory, setFilterCategory,
  filterPriority, setFilterPriority,
  searchQuery, setSearchQuery,
  stats, onClearCompleted,
}: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-4 space-y-3">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="검색..."
        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600">
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilterStatus(opt.value)}
              className={`px-3 py-1.5 text-xs font-medium transition ${
                filterStatus === opt.value
                  ? "bg-blue-500 text-white"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {opt.label}
              {opt.value !== "all" && (
                <span className="ml-1 text-xs opacity-70">
                  {opt.value === "active" ? stats.active : stats.completed}
                </span>
              )}
            </button>
          ))}
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value as Category | "all")}
          className="text-xs border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-1.5 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categoryOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value as Priority | "all")}
          className="text-xs border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-1.5 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
        >
          {priorityOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {stats.completed > 0 && (
          <button
            onClick={onClearCompleted}
            className="ml-auto text-xs text-red-400 hover:text-red-500 transition"
          >
            완료 항목 삭제
          </button>
        )}
      </div>
    </div>
  );
}
