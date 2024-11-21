import { Skeleton } from "@mui/material"
import s from './TodolistSkeleton.module.scss'

export const TasksSkeleton = () => {
	return (
		<>
			{Array(4)
				.fill(null)
				.map((_, id) => (
					<div key={id} className={s.common}>
						<div className={s.tasks}>
							<Skeleton width={20} height={40} />
							<Skeleton width={350} height={40} />
						</div>
						<Skeleton width={20} height={40} />
					</div>
				))}
		</>
	)
}