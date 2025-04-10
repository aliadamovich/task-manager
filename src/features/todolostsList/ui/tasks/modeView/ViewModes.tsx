import { ViewModeType } from 'common/types/viewTypes'
import { TodolistDomainType } from 'features/todolostsList/model/todolistSlice'
import { ColumnsView } from 'features/todolostsList/ui/tasks/modeView/ColumnsView'
import { GalleryView } from 'features/todolostsList/ui/tasks/modeView/GalleryView'
import {ListView} from 'features/todolostsList/ui/tasks/modeView/ListView'

type Props = {
	mode: ViewModeType
	todolists: TodolistDomainType[] | undefined
}

export const ViewModes = ({ mode, todolists }: Props) => {

	switch (mode) {
		case 'list':
			return <ListView todolists={todolists} />
			
		case 'columns':
			return <ColumnsView todolists={todolists} />
			
		case 'gallery':
			return <GalleryView todolists={todolists} />
	
		default:
			return null;
	}
}