import { Box, Checkbox } from "@mui/material";
import { TaskEditableSpanBoxSX } from "styles/Todolost.styles";
import React, { ChangeEvent, useCallback } from "react";
import { removeTaskTC, TaskDomainType, updateTaskTC } from "features/todolostsList/model/tasksSlice";
import { useAppDispatch } from "app/store";
import { EditableSpan } from "common/components";
import { TaskStatuses } from "features/todolostsList/lib/enums/enum";

type TaskElementType = TaskDomainType & {
	todolistId: string;
};

export const Task = React.memo(({ id, title, status, taskEntityStatus, todolistId }: TaskElementType) => {
  const dispatch = useAppDispatch();

  const onInputChange = useCallback(
    (value: string) => {
			dispatch(updateTaskTC({ todolistId, taskId: id, model: { title: value } }));
    },
    [id, todolistId, dispatch],
  );

  const removeItemHandler = useCallback(() => {
    dispatch(removeTaskTC({todolistId, taskId: id}));
  }, [id, todolistId, dispatch]);

  const changeTaskStatusHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
			dispatch(updateTaskTC({ todolistId, taskId: id, model: { status} }));
    },
    [todolistId, dispatch],
  );

  return (
    <Box sx={TaskEditableSpanBoxSX(status === TaskStatuses.Completed ? true : false)}>
      <Checkbox
        checked={status === TaskStatuses.Completed && true}
        size="small"
        color="secondary"
        sx={{
          marginRight: "10px",
        }}
        onChange={changeTaskStatusHandler}
        disabled={taskEntityStatus === "loading"}
      />
      <EditableSpan
        title={title}
        onChange={onInputChange}
        removeItem={removeItemHandler}
        disabled={taskEntityStatus === "loading"}
      />
    </Box>
  );
});
