import type { Meta, StoryObj } from "@storybook/react"
import { AddItemInput, AddItemInputType } from "../components/addItemInput/AddItemInput"
import { action } from "@storybook/addon-actions"
import React, { ChangeEvent, useCallback, useState, KeyboardEvent } from "react"
import { render } from "react-dom"
import TextField from "@mui/material/TextField/TextField"
import { IconButton } from "@mui/material"
import ControlPointIcon from "@mui/icons-material/ControlPoint"
import { EditableSpan } from "../components/editableSpan/EditableSpan"
import { fn } from "@storybook/test"

const meta: Meta<typeof EditableSpan> = {
	title: "TODOLISTS/EditableSpan",
	component: EditableSpan,
	tags: ["autodocs"],

	argTypes: {
		title: {
			description: "Field title. Add title push button set string.",
		},
		onChange: {
			description: "Value changed",
			action: "changed",
		},
	},
	// args: { onChange: fn(), removeItem: fn(), title: '' }
}

export default meta
type Story = StoryObj<typeof EditableSpan>

export const EditableSpanStory: Story = {
	args: {
		title: "Buy milk",
		removeItem: action("task removed"),
		onChange: action("Title changed"),
	},
}
