"use client";

import { useDispatch, useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import { add, plus } from "@/utils/icons";
import { AppDispatch, RootState } from "@/store/store";
import {
  Tasks as TasksType,
  toggleEditModal,
  toggleModal,
} from "@/actions/appActions";
import "@/styles/Tasks.css";
import Modal from "../Modals/Modal";
import Content from "../Modals/Content";
import { useState } from "react";
import UpdateContent from "../Modals/UpdateContent";
import EditModal from "../Modals/EditModal";

interface Props {
  title: string;
  tasks: TasksType[];
}

const Tasks: React.FC<Props> = ({ title, tasks }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedTask, setSelectedTask] = useState<TasksType>();
  const modal = useSelector((state: RootState) => state.app.modal);
  const editModal = useSelector((state: RootState) => state.app.editModal);

  const handleEditModalToggle = (tasks: TasksType) => {
    setSelectedTask(tasks);
    dispatch(toggleEditModal(!editModal));
  };

  return (
    <div className="tasks relative h-full w-full overflow-y-auto rounded-[1rem] border-2 border-solid border-[#f9f9f914] bg-[#212121] p-[2rem]">
      {modal && <Modal content={<Content />} />}
      {editModal && selectedTask && (
        <EditModal content={<UpdateContent task={selectedTask} />} />
      )}
      <h1 className="task-heading relative text-[clamp(1.5rem,2vw,2rem)] font-[800]">
        {title}
      </h1>

      <button
        className="fixed right-[5.1rem] top-[4.9rem] flex h-[3rem] w-[3rem] items-center justify-center rounded-[50%] border-2 border-solid border-[#f9f9f914] bg-[#252525] text-[1.4rem] max-md:right-[3.5rem] max-md:top-[3rem]"
        onClick={() => dispatch(toggleModal(!modal))}
        title="Thêm Task"
      >
        {plus}
      </button>

      <div className="mx-0 my-[2rem] grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            title={task.title}
            description={task.description}
            date={task.date}
            isCompleted={task.isCompleted}
            isImportant={task.isImportant}
            id={task.id}
            onEdit={() => handleEditModalToggle(task)}
          />
        ))}
        <button
          className="create-task boder-[#2a2e35] flex h-[16rem] cursor-pointer items-center justify-center gap-[0.5rem] rounded-[1rem] border-[3px] border-dashed font-[600] text-[#b2becd] hover:bg-[#2a2e35] hover:text-[#f8f8f8]"
          onClick={() => dispatch(toggleModal(!modal))}
        >
          <div className="mr-[0.2rem] text-[1.5rem]">{add}</div>
          Thêm Task Mới
        </button>
      </div>
    </div>
  );
};

export default Tasks;
