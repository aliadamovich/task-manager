import { ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	onClick: () => void
}


export const Button = ({ title, onClick, className }: ButtonProps) => {
	

	const onClickHandler = () => {
		onClick()
	}

	return (
		<button className={className} onClick={onClickHandler}>{title}</button>
	)
}