import {
  setCompleted,
  setImportant,
  setInCompleted,
  setTasks,
  Tasks,
  toggleModal,
} from "@/actions/appActions";
import { handleCreateTask } from "@/server/tasks/taskController";
import { add } from "@/utils/icons";
import { FormEvent } from "react";
import { fetchTasks } from "../Tasks/taskActions";
import handleToast from "@/utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

const Content: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userName = useSelector((state: RootState) => state.user.userName);
  const modal = useSelector((state: RootState) => state.app.modal);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    const isCompleted = formData.get("completed") === "on";
    const isImportant = formData.get("important") === "on";

    const task: Omit<Tasks, "id" | "createdAt"> = {
      title,
      description,
      date,
      isCompleted,
      isImportant,
    };

    handleCreateTask(userName, task)
      .then(({ code, msg }) => {
        if (code === 1) {
          fetchTasks(userName).then(
            ({ tasks, completed, important, inCompleted }) => {
              dispatch(setTasks(tasks));
              dispatch(setCompleted(completed));
              dispatch(setImportant(important));
              dispatch(setInCompleted(inCompleted));
              dispatch(toggleModal(!modal));
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
        Tạo một Task
      </h1>
      <div className="input-control">
        <label htmlFor="title" className="modal-label">
          Tiêu Đề
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          placeholder="Ví dụ: Học NextJS Cơ Bản"
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
          rows={4}
          required
          placeholder="Ví dụ: Hoàn Thành Task Này Sau Khi Tạo Được Todo-App"
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
          className="modal-input"
        />
      </div>
      <div className="input-control flex cursor-pointer items-center justify-between">
        <label htmlFor="completed" className="modal-label flex-[1]">
          Task Đã Hoàn Thành
        </label>
        <input
          type="checkbox"
          name="completed"
          id="completed"
          className="modal-input w-[initial]"
        />
      </div>
      <div className="input-control flex cursor-pointer items-center justify-between">
        <label htmlFor="important" className="modal-label flex-[1]">
           Task Quan Trọng
        </label>
        <input
          type="checkbox"
          name="important"
          id="important"
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
          Tạo Task
        </button>
      </div>
    </form>
  );
};

export default Content;
