import formatDate from "@/utils/formatDate";
import { edit, trash, list } from "@/utils/icons";
import { fetchTasks } from "./taskActions";
import {
  setCompleted,
  setImportant,
  setInCompleted,
  setTasks,
} from "@/actions/appActions";
import {
  handleCompleted,
  handleDelete,
  handleImportant,
} from "@/server/tasks/taskController";
import handleToast from "@/utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

interface Props {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  isImportant: boolean;
  id: string;
  onEdit: () => void;
}

const TaskItem: React.FC<Props> = ({
  title,
  description,
  date,
  isCompleted,
  isImportant,
  id,
  onEdit,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const userName = useSelector((state: RootState) => state.user.userName);

  const handleCompletedButton = (id: string, isCompleted: boolean) => {
    handleCompleted(isCompleted, id)
      .then(({ code, msg }) => {
        if (code === 1) {
          fetchTasks(userName).then(
            ({ tasks, completed, important, inCompleted }) => {
              dispatch(setTasks(tasks));
              dispatch(setCompleted(completed));
              dispatch(setImportant(important));
              dispatch(setInCompleted(inCompleted));
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

  const handleDeletedButton = (id: string) => {
    handleDelete(id)
      .then(({ code, msg }) => {
        if (code === 1) {
          fetchTasks(userName).then(
            ({ tasks, completed, important, inCompleted }) => {
              dispatch(setTasks(tasks));
              dispatch(setCompleted(completed));
              dispatch(setImportant(important));
              dispatch(setInCompleted(inCompleted));
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

  const handleImportantButton = (id: string, isImportant: boolean) => {
    handleImportant(isImportant, id)
      .then(({ code, msg }) => {
        if (code === 1) {
          fetchTasks(userName).then(
            ({ tasks, completed, important, inCompleted }) => {
              dispatch(setTasks(tasks));
              dispatch(setCompleted(completed));
              dispatch(setImportant(important));
              dispatch(setInCompleted(inCompleted));
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
    <div className="task-item flex h-[16rem] flex-col gap-[0.5rem] rounded-[1rem] bg-[#f9f9f914] px-[1rem] py-[1.2rem]">
      <h1 className="text-[1.5rem] font-[600]">{title}</h1>
      <p>{description}</p>
      <p className="mt-auto">Đặt Hạn Hoàn Thành: {formatDate(date)}</p>
      <div className="flex items-center gap-[1.2rem]">
        {isCompleted ? (
          <button
            className="completed inline-block cursor-pointer rounded-[30px] border-none bg-[#fe6854] px-[1rem] py-[0.4rem] outline-none"
            onClick={() => {
              handleCompletedButton(id, !isCompleted);
            }}
          >
            Hoàn Thành
          </button>
        ) : (
          <button
            className="inline-block cursor-pointer rounded-[30px] border-none bg-[#fe6854] px-[1rem] py-[0.4rem] outline-none"
            onClick={() => {
              handleCompletedButton(id, !isCompleted);
            }}
          >
            Chưa Hoàn Thành
          </button>
        )}
        <button
          className={`ml-auto cursor-pointer border-none text-[1.4rem] ${isImportant ? "text-[#6fcf97]" : "text-[#b2becd]"} outline-none`}
          title={`${isImportant ? "Đánh Dấu Task Không Quan Trọng" : "Đánh Dấu Task Quan Trọng"}`}
          onClick={() => {
            handleImportantButton(id, !isImportant);
          }}
        >
          {list}
        </button>
        <button
          className="cursor-pointer border-none text-[1.4rem] text-[#b2becd] outline-none"
          title="Chỉnh Sửa Task"
          onClick={onEdit}
        >
          {edit}
        </button>
        <button
          className="cursor-pointer border-none text-[1.4rem] text-[#b2becd] outline-none"
          onClick={() => {
            handleDeletedButton(id);
          }}
          title="Xóa Task"
        >
          {trash}
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
