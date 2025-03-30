import type { Meta, StoryObj } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { EditableSpan } from "common/components"

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
		removeItemHandler: action("task removed"),
		// onChange: action("Title changed"),
	},
}
