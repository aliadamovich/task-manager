import { FilterButton } from './FilterButton'
import { useAppDispatch } from 'app/store';
import { changeTodolistFilter, FilterValueType, TodolistDomainType } from 'features/todolostsList/model/todolistSlice';

type Props = {
	todolist: TodolistDomainType
}
export const FilterTasksButtons = ({ todolist }: Props) => {
	const {id, filter} = todolist;
	const dispatch = useAppDispatch();
	
	const changeFilterHandler = (filter: FilterValueType) => {
		dispatch(changeTodolistFilter({ id, filter }))
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

