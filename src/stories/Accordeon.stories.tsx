import type { Meta } from "@storybook/react"
import { AccBody, Accordeon, AccordeonData, Content, Icon, Title } from "../all_study_comp/Accordeon"
import React, { useState } from "react"
import { action } from "@storybook/addon-actions"

const meta: Meta<typeof Accordeon> = {
	component: Accordeon,
}

export default meta

export const CollapsedAccordeon = () => {
	return (
		<div>
			{AccordeonData.map((a) => {
				return (
					<AccBody key={a.id} isOpen={false}>
						<Title onClick={() => {}}>
							<h3>{a.title}</h3>
							<Icon>&gt;</Icon>
						</Title>
						<Content>
							<p>{a.content}</p>
						</Content>
					</AccBody>
				)
			})}
		</div>
	)
}

export const OpenedAccordeon = () => {
	return (
		<div>
			{AccordeonData.map((a) => {
				return (
					<AccBody key={a.id} isOpen={true}>
						<Title onClick={action("acc clicked")}>
							<h3>{a.title}</h3>
							<Icon>&gt;</Icon>
						</Title>
						<Content>
							<p>{a.content}</p>
						</Content>
					</AccBody>
				)
			})}
		</div>
	)
}

export const onChangingAccodeon = () => {
	const [openId, setOpenId] = useState<number | null>(null)

	const onAccClick = (id: number) => {
		setOpenId(openId === id ? null : id)
	}
	return (
		<div>
			{AccordeonData.map((a) => {
				return (
					<AccBody key={a.id} isOpen={openId === a.id}>
						<Title
							onClick={() => {
								onAccClick(a.id)
							}}
						>
							<h3>{a.title}</h3>
							<Icon>&gt;</Icon>
						</Title>
						<Content>
							<p>{a.content}</p>
						</Content>
					</AccBody>
				)
			})}
		</div>
	)
}
