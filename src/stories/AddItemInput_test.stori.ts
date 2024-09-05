// import type { Meta, StoryObj } from "@storybook/react";
// import { AddItemInput } from "../components/addItemInput/AddItemInput";
// import { action } from "@storybook/addon-actions";


// const meta: Meta<typeof AddItemInput> = {
//   title: "TODOLISTS/AddItemForm",
//   component: AddItemInput,
// 	parameters: { //статические св-ва (располложение на странице)
// 		layout: 'centered'
// 	},
//   // This component will have an automatically generated Autodocs entry:
//   // https://storybook.js.org/docs/react/writing-docs/autodocs
//   tags: ["autodocs"], //создание вкладки Docs
//   // More on argTypes:
//   // https://storybook.js.org/docs/react/api/argtypes
//   argTypes: { //пропсы (для описания св-в которые заданы не явно (те что со знаком ?))чтобы не искать по компоненте и видеть сразу пропсы которые существуют
//     addItem: {
//       description: "Button clicked inside input",
//       action: "clicked",
//     },
//   },
// 	args: {}
// };

// export default meta;
// type Story = StoryObj<typeof AddItemInput>;

// // More on component templates:
// // https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// export const AddItemInputStory: Story = {
//   // More on args: https://storybook.js.org/docs/react/writing-stories/args
//   args: {
//     addItem: action("Button clicked inside form"),
//   },
// };
