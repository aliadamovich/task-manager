import { createSelector } from '@reduxjs/toolkit';
import { AppRootStateType } from 'store/store';

const selectAllTasks = (state: AppRootStateType) => state.tasks

export const selectCurrentTasks = createSelector(
	[selectAllTasks, (state, id) => id], 
	(tasks, id) => tasks[id]
)