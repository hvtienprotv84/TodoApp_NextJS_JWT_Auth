"use server";

import { Tasks } from "@/actions/appActions";
import Todo from "@/server/models/todoSchema";
import mongoose from "mongoose";

type CreateTaskType = (
  userName: string,
  task: Omit<Tasks, "id" | "createdAt">,
) => Promise<{ code: number; msg: string }>;

type GetTasksType = (
  UserId: string,
) => Promise<{ code: number; msg: string; tasks?: Tasks[] }>;

type CompletedType = (
  isCompleted: boolean,
  id: string,
) => Promise<{ code: number; msg: string }>;

type ImportantType = (
  isImportant: boolean,
  id: string,
) => Promise<{ code: number; msg: string }>;

type UpdateType = (task: Tasks) => Promise<{ code: number; msg: string }>;

type DeleteType = (id: string) => Promise<{ code: number; msg: string }>;

export const handleCreateTask: CreateTaskType = async (userId, tasks) => {
  try {
    if (!tasks.title || !tasks.description || !tasks.date) {
      return {
        msg: "Missing required fields",
        code: 0,
      };
    }

    if (tasks.title.length < 3) {
      return {
        msg: "Tiêu đề phải dài ít nhất 3 ký tự",
        code: 0,
      };
    }

    const task = new Todo({
      title: tasks.title,
      description: tasks.description,
      date: tasks.date,
      completed: tasks.isCompleted,
      important: tasks.isImportant,
      userName: userId,
    });

    await task.save();

    return {
      code: 1,
      msg: "Task Đã Được Tạo Thành Công!",
    };
  } catch (err) {
    console.error(err instanceof Error && err.message);
    return {
      code: 0,
      msg: "Something went Wrong!",
    };
  }
};

export const getTasks: GetTasksType = async (userName) => {
  try {
    const tasks = await Todo.find({ userName: userName });

    const updatedTask: Tasks[] = tasks.map((task) => ({
      id: String(task._id),
      title: task.title,
      description: task.description,
      isCompleted: task.completed,
      date: task.date,
      isImportant: task.important,
      createdAt: task.createdAt.toISOString(),
      userName: task.userName,
    }));

    return { code: 1, msg: "success", tasks: updatedTask };
  } catch (err) {
    console.error(err instanceof Error && err.message);
    return {
      code: 0,
      msg: "Something went wrong!",
    };
  }
};

export const handleCompleted: CompletedType = async (isCompleted, id) => {
  try {
    const _id = new mongoose.Types.ObjectId(id);

    const task = await Todo.findOne({ _id: _id });
    if (task) {
      task.completed = isCompleted;
      await task.save();

      return { code: 1, msg: "Task Đã Được Cập Nhật Thành Công!" };
    }

    return { code: 0, msg: "Something went wrong!" };
  } catch (err) {
    console.error(err instanceof Error && err.message);
    return {
      code: 0,
      msg: "Something went wrong!",
    };
  }
};

export const handleImportant: ImportantType = async (isImportant, id) => {
  try {
    const _id = new mongoose.Types.ObjectId(id);

    const task = await Todo.findOne({ _id: _id });
    if (task) {
      task.important = isImportant;
      await task.save();

      return { code: 1, msg: "Task Đã Được Cập Nhật Thành Công!" };
    }

    return { code: 0, msg: "Something went wrong!" };
  } catch (err) {
    console.error(err instanceof Error && err.message);
    return {
      code: 0,
      msg: "Something went wrong!",
    };
  }
};

export const handleUpdate: UpdateType = async (tasks) => {
  try {
    const _id = new mongoose.Types.ObjectId(tasks.id);

    const task = await Todo.findOne({ _id: _id });
    if (task) {
      task.title = tasks.title;
      task.description = tasks.description;
      task.date = tasks.date;
      task.completed = tasks.isCompleted;
      task.important = tasks.isImportant;
      await task.save();

      return {
        code: 1,
        msg: "Task Đã Được Cập Nhật Thành Công!",
      };
    }

    return { code: 0, msg: "Something went wrong!" };
  } catch (err) {
    console.error(err instanceof Error && err.message);
    return {
      code: 0,
      msg: "Something went wrong!",
    };
  }
};

export const handleDelete: DeleteType = async (id) => {
  try {
    const _id = new mongoose.Types.ObjectId(id);
    await Todo.deleteOne({ _id: _id });

    return { code: 1, msg: "Task Đã Được Xóa Thành Công!" };
  } catch (err) {
    console.error(err instanceof Error && err.message);
    return {
      code: 0,
      msg: "Something went wrong!",
    };
  }
};
