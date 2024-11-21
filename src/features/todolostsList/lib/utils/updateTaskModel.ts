import { UpdateTaskType } from "features/todolostsList/api/api.types"
import { TaskDomainType } from "features/todolostsList/model/tasksSlice"

type UpdateDomainTaskModelType = Partial<UpdateTaskType>

//utility function to amend the task model for sending it to server
export const updateTaskApiModel = (task: TaskDomainType, model: UpdateDomainTaskModelType) => {
	return {
		title: task.title,
		description: task.description,
		status: task.status,
		priority: task.priority,
		startDate: task.startDate,
		deadline: task.deadline,
		...model,
	}
}
