"use client";

import Tasks from "@/components/Tasks/Tasks";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const Important: React.FC = () => {
  const important = useSelector((state: RootState) => state.app.important);

  return <Tasks title="Tasks Quan Trọng!" tasks={important} />;
};

export default Important;
