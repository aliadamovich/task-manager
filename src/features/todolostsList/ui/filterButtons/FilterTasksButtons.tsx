import { FilterButton } from './FilterButton'
import { useAppDispatch } from 'app/store';
import { todolistsAPI } from 'features/todolostsList/api/todolistApi';
import { FilterValueType, TodolistDomainType } from 'features/todolostsList/model/todolistSlice';

type Props = {
	todolist: TodolistDomainType
}
export const FilterTasksButtons = ({ todolist }: Props) => {
	const {id, filter} = todolist;
	const dispatch = useAppDispatch();
	
	const changeFilterHandler = (filter: FilterValueType) => {
		// dispatch(changeTodolistFilter({ id, filter }))
		dispatch(todolistsAPI.util.updateQueryData('getTodolists', undefined,
			(state) => {
				const index = state.findIndex((td) => td.id === id)
				if (index !== -1) state[index].filter = filter
			}, true))
	}

	const FilterButtonHandler = (filter: FilterValueType) => {
		changeFilterHandler(filter)
	}

	return (
		<>
			<FilterButton children="All" onClick={() => { FilterButtonHandler('All') }} variant={filter === "All" ? "contained" : "text"} />
			<FilterButton children="Active" onClick={() => { FilterButtonHandler('Active') }} variant={filter === "Active" ? "contained" : "text"}/>
			<FilterButton children="Completed" onClick={() => { FilterButtonHandler('Completed') }} variant={filter === "Completed" ? "contained" : "text"} color="secondary" />
		</>
	)
}

