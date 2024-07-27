import {
  setCompleted,
  setImportant,
  setInCompleted,
  setTasks,
  Tasks,
  toggleEditModal,
} from "@/actions/appActions";
import { handleUpdate } from "@/server/tasks/taskController";
import { add } from "@/utils/icons";
import { FormEvent, useState } from "react";
import { fetchTasks } from "../Tasks/taskActions";
import handleToast from "@/utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

const UpdateContent: React.FC<{ task: Tasks }> = ({ task }) => {
  const dispatch = useDispatch<AppDispatch>();
  const userName = useSelector((state: RootState) => state.user.userName);
  const editModal = useSelector((state: RootState) => state.app.editModal);

  const [updatedTask, setUpdatedTask] = useState<Tasks>(task);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setUpdatedTask((prevTask) => ({
        ...prevTask,
        [name]: checked,
      }));
    } else {
      setUpdatedTask((prevTask) => ({
        ...prevTask,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleUpdate(updatedTask)
      .then(({ code, msg }) => {
        if (code === 1) {
          fetchTasks(userName).then(
            ({ tasks, completed, important, inCompleted }) => {
              dispatch(setTasks(tasks));
              dispatch(setCompleted(completed));
              dispatch(setImportant(important));
              dispatch(setInCompleted(inCompleted));
              dispatch(toggleEditModal(!editModal));
              handleToast(code, msg);
            },
          );
        }
      })
      .catch((err) => {
        console.error(err.msg);
        handleToast(0, "Something went wrong!");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="content text-[#dbe1e8]">
      <h1 className="text-[clamp(1.2rem,5vw,1.6rem)] font-[600]">
        Chỉnh Sửa Task
      </h1>
      <div className="input-control">
        <label htmlFor="title" className="modal-label">
          Tiêu Đề
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={updatedTask.title}
          required
          onChange={handleChange}
          placeholder="e.g., Complete the project report"
          className="modal-input"
        />
      </div>
      <div className="input-control">
        <label htmlFor="description" className="modal-label">
          Nội Dung
        </label>
        <textarea
          name="description"
          id="description"
          value={updatedTask.description}
          onChange={handleChange}
          required
          rows={4}
          placeholder="e.g., Finish writing the project report for the client"
          className="modal-input"
        ></textarea>
      </div>
      <div className="input-control">
        <label htmlFor="date" className="modal-label">
          Đặt Hạn Hoàn Thành Task
        </label>
        <input
          type="date"
          name="date"
          id="date"
          required
          value={updatedTask.date}
          onChange={handleChange}
          className="modal-input"
        />
      </div>
      <div className="input-control flex cursor-pointer items-center justify-between">
        <label htmlFor="isCompleted" className="modal-label flex-[1]">
        Task Đã Hoàn Thành
        </label>
        <input
          type="checkbox"
          name="isCompleted"
          id="isCompleted"
          checked={updatedTask.isCompleted}
          onChange={handleChange}
          className="modal-input w-[initial]"
        />
      </div>
      <div className="input-control flex cursor-pointer items-center justify-between">
        <label htmlFor="isImportant" className="modal-label flex-[1]">
        Task Quan Trọng
        </label>
        <input
          type="checkbox"
          name="isImportant"
          id="isImportant"
          checked={updatedTask.isImportant}
          onChange={handleChange}
          className="modal-input w-[initial]"
        />
      </div>
      <div className="submit-btn flex justify-end">
        <button
          type="submit"
          className="z-[5] flex cursor-pointer items-center rounded-[0.8rem] bg-[#00A3FF] px-[2rem] py-[0.8rem] text-[1.2rem] font-[500] text-[#f8f8f8] hover:bg-[#6FCF97] hover:text-white max-[500px]:px-[1rem] max-[500px]:py-[0.6rem]"
        >
          <div className="submit-icon mr-[1rem] text-[1.5rem] max-[500px]:mr-[0.5rem] max-[500px]:text-[1.2rem]">
            {add}
          </div>
          Cập Nhật Task
        </button>
      </div>
    </form>
  );
};

export default UpdateContent;
