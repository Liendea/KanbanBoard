import type { TaskType } from "../types/Types";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import taskStyles from "../styles/Task.module.scss";
import "../styles/Global.scss";

type TaskCardProps = {
  task: TaskType;
  onClick?: () => void;
};

export default function TaskCard({ task, onClick }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={taskStyles.taskCard}
      tabIndex={0}
      onClick={onClick}
    >
      <h3 className={taskStyles.taskTitle}>{task.title}</h3>
      <p className={taskStyles.taskDescription}>{task.description}</p>
    </div>
  );
}
