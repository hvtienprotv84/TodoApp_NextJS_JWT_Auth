"use server";

import { Tasks } from "@/actions/appActions";
import { getTasks } from "@/server/tasks/taskController";

type FetchTasksType = (userName: string) => Promise<{
  tasks: Tasks[];
  completed: Tasks[];
  important: Tasks[];
  inCompleted: Tasks[];
}>;

export const fetchTasks: FetchTasksType = async (userName) => {
  const { tasks } = await getTasks(userName);

  if (tasks) {
    const sorted = tasks.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const completedTasks = sorted.filter((task) => task.isCompleted === true);
    const importantTasks = sorted.filter((task) => task.isImportant === true);
    const inCompleteTasks = sorted.filter((task) => task.isCompleted === false);

    return {
      tasks: tasks,
      completed: completedTasks,
      important: importantTasks,
      inCompleted: inCompleteTasks,
    };
  }

  return { tasks: [], completed: [], important: [], inCompleted: [] };
};
