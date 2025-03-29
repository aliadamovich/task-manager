import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import { ChangeEvent } from 'react'
import s from './TasksPagination.module.scss'
import { PAGE_SIZE } from 'features/todolostsList/api/tasksApi'

type Props = {
	totalCount: number
	page: number
	setPage: (page: number) => void
}

export const TasksPagination = ({ totalCount, page, setPage }: Props) => {
	const changePageHandler = (_: ChangeEvent<unknown>, page: number) => {
		setPage(page)
	}
	const numberOfPages = Math.ceil(totalCount / PAGE_SIZE)
	return (
		<div className={s.paginationWrapper}>
			{numberOfPages > 1 && <Pagination
				count={numberOfPages}
				page={page}
				onChange={changePageHandler}
				shape="rounded"
				color="primary"
				className={s.pagination}
				size='small'
			
			/>}
			<div className={s.totalCount}>
				<Typography variant="caption">Total: {totalCount}</Typography>
			</div>
		</div>
	)
}