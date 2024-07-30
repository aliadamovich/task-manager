import React, { useState } from 'react'
import s from './Select.module.css'

export const Select = () => {
	const [visibility, setVisibility] = useState(false)

	const onChooseClick = () => {
		setVisibility(!visibility)
	}


	return (
		<div className={s.select__box}>
				<div className={s.choose} onClick={onChooseClick}>City:</div>
				<div className={visibility ? `${s.city_box} ${s.visible}` : s.city_box}>
						<span className={s.city}>Moscow</span>
						<span className={s.city}>Rome</span>
						<span className={s.city}>New York</span>
				</div>
		</div>
	)
}


