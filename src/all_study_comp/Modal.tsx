import React, { useState } from "react"
import { Button } from "./all_study_comp/Button"
import styled, { css } from "styled-components"

const modalData = [
	{
		id: 1,
		title: "Header 1",
		content:
			"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime similique, corrupti impedit vero explicabo eveniet fuga. Eaque ea rerum harum atque velit nihil, aliquam earum, itaque molestiae unde, ad a",
		popup:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea necessitatibus obcaecati, quam dolor dolorem iusto aliquam quia sequi alias earum, soluta ducimus eum, nesciunt voluptates hic nihil perspiciatis ipsam in!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt totam, veritatis aspernatur quis non temporibus. Voluptates perspiciatis deleniti eius vitae excepturi tempore recusandae quo quasi numquam enim repellendus, reprehenderit fugiat.Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid beatae incidunt obcaecati? Eos a dolore quod ad adipisci! Accusantium perspiciatis minima recusandae aliquid. Ab nisi excepturi ipsum ipsam numquam aspernatur.",
	},
	{
		id: 2,
		title: "Header 2",
		content:
			"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime similique,Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime similique,Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime similique,Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime similique, corrupti impedit vero explicabo eveniet fuga. Eaque ea rerum harum atque velit nihil, aliquam earum, itaque molestiae unde, ad a",
		popup: "I am popup",
	},
	{
		id: 3,
		title: "Header 3",
		content:
			"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime similique,Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime similique,Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime similique, corrupti impedit vero explicabo eveniet fuga. Eaque ea rerum harum atque velit nihil, aliquam earum, itaque molestiae unde, ad a",
		popup: "hello hello",
	},
	{
		id: 4,
		title: "Header 4",
		content:
			"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime similique, corrupti impedit vero explicabo eveniet fuga. Eaque ea rerum harum atque velit nihil, aliquam earum, itaque molestiae unde, ad a",
		popup: "I am popup 4",
	},
]
type PopupType = {
	isOpen: boolean
}

export const Modal = () => {
	const [popupId, setPopupId] = useState<number | null>(null)

	const onOpenClick = (id: number) => {
		setPopupId(id)
	}

	const onCloseClick = () => {
		setPopupId(null)
	}

	return (
		<div>
			<h2>Modal</h2>

			<Cards>
				{modalData.map((m) => {
					return (
						<ModalItem key={m.id}>
							<h3>{m.title}</h3>
							<p>{m.content}</p>
							<Button
								title="Open"
								callBack={() => {
									onOpenClick(m.id)
								}}
							/>
							<Popup isOpen={popupId === m.id} onClick={onCloseClick}>
								<Content>
									<p>{m.popup}</p>
									<Button title="X" callBack={onCloseClick} />
								</Content>
							</Popup>
						</ModalItem>
					)
				})}
			</Cards>
		</div>
	)
}

const Cards = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 15px;
`

const ModalItem = styled.div`
	background-color: #f7d2ee;
	padding: 20px;
	border-radius: 20px;
`

const Popup = styled.div<PopupType>`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #fbf9c68c;
	display: flex;
	justify-content: center;
	align-items: center;
	display: none;

	${(props) =>
		props.isOpen &&
		css<PopupType>`
			display: flex;
		`}
`

const Content = styled.div`
	max-width: 60vw;
	background-color: #bcfbff;
	padding: 40px;
	border-radius: 20px;
	position: relative;

	button {
		position: absolute;
		top: -10px;
		right: -10px;
		z-index: 2;
		border-radius: 50%;
		background-color: #fff;
		border: none;
		padding: 10px 16px;
		font-weight: 900;
		cursor: pointer;
	}
`
