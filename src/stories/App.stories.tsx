import type { Meta, StoryObj } from "@storybook/react";
import App from "../app/App";
import React from "react";
import { ReduxStoreProviderDecorator } from "./ReduxStoreProviderDecorator";

const meta: Meta<typeof App> = {
  title: "TODOLISTS/App",
  component: App,

  tags: ["autodocs"], //создание вкладки Docs
  decorators: [ReduxStoreProviderDecorator],
};

export default meta;
type Story = StoryObj<typeof App>;

// export const AppStory: Story = {
// 	render: () => <Provider store={store}><App /></Provider>
// };

export const AppStory: Story = {};
