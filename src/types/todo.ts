export type Priority = "high" | "medium" | "low";

export type Category = "personal" | "work" | "shopping" | "health" | "other";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  createdAt: number;
  dueDate?: string;
}

export type FilterStatus = "all" | "active" | "completed";
