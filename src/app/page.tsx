import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950">
      <TodoList />
    </main>
  );
}
