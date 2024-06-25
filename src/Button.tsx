import { ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	callBack: () => void
}


export const Button = ({title, callBack }: ButtonProps) => {
	
	const onClickHandler = () => {
		callBack()
	}

	return (
		<button onClick={onClickHandler}>{title}</button>
	)
}