import React, { KeyboardEvent, useEffect, useState } from "react"
import s from "./Select.module.css"

type SelectPropsType = {
	items: {
		value: string
		title: string
	}[]
	initialValue: string
	onChange: (value: string) => void
}

export const Select = ({ items, initialValue, onChange }: SelectPropsType) => {
	const [visibility, setVisibility] = useState(false)
	const [hoveredElValue, setHoveredElValue] = useState(initialValue)
	const selectedItem = items.find((i) => i.value === initialValue)
	const hoveredItem = items.find((i) => i.value === hoveredElValue)

	//исп-ем дя того чтобы ховером выделялся элемент который выбран (нужно для keyUp)
	useEffect(() => {
		setHoveredElValue(initialValue)
	}, [initialValue])

	const onChooseClick = () => {
		setVisibility(!visibility)
	}

	const onHover = (value: string) => {
		setHoveredElValue(value)
	}

	const onOptionClick = (value: string) => {
		onChange(value)
		setVisibility(!visibility)
	}

	const onKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
		e.preventDefault()
		let currentIndex = items.findIndex((i) => i.value === hoveredElValue)

		if (e.key === "ArrowDown") {
			const newIndex = currentIndex + 1
			if (newIndex < items.length) {
				onChange(items[newIndex].value)
			}
		}
		if (e.key === "ArrowUp") {
			const newIndex = currentIndex - 1
			if (newIndex >= 0) {
				onChange(items[newIndex].value)
			}
		}
		if (e.key === "Escape" || e.key === "Enter") {
			setVisibility(false)
		}
	}

	return (
		<div className={s.select}>
			<div className={s.select__default} onKeyDown={onKeyUp} onClick={onChooseClick} tabIndex={0}>
				City:
				{selectedItem && selectedItem.title}{" "}
			</div>
			<div className={visibility ? `${s.select__box} ${s.visible}` : s.select__box}>
				{items.map((i) => (
					<span
						key={i.value}
						className={hoveredItem === i ? s.active + " " + s.box__item : s.box__item}
						onMouseEnter={() => {
							onHover(i.value)
						}}
						onClick={() => {
							onOptionClick(i.value)
						}}
					>
						{i.title}
					</span>
				))}
			</div>
		</div>
	)
}
