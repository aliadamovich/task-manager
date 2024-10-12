import type { Meta, StoryObj } from "@storybook/react";
import { AddItemInput, AddItemInputType } from "../components/addItemInput/AddItemInput";
import { action } from "@storybook/addon-actions";
import React, { ChangeEvent, useCallback, useState, KeyboardEvent } from "react";
import { render } from "react-dom";
import TextField from "@mui/material/TextField/TextField";
import { IconButton } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { fn } from "@storybook/test";

const meta: Meta<typeof AddItemInput> = {
  title: "TODOLISTS/AddItemForm",
  component: AddItemInput,
  parameters: {
    //статические св-ва (располложение на странице)
    layout: "centered",
  },
  tags: ["autodocs"], //создание вкладки Docs

  argTypes: {
    //описание пропсов
    addItem: {
      description: "Adds item to list",
      action: "clicked", //что будет отображаться в экшн при срабатывании события
    },
    label: {
      description: "Placeholder in input",
      defaultValue: "Enter here...",
    },
  },
  args: {
    addItem: fn(),
    label: "enter your text...",
  },
};

export default meta;
type Story = StoryObj<typeof AddItemInput>;

export const AddItemInputStory: Story = {
  args: {
    addItem: action("Button clicked inside form"),
    label: "enter your text...",
  },
};

//!создание компоненты с ошибкой
//просто скопировали всю компоненту целиком но в стейте ошибку
const AddItemInputWithError = React.memo(({ addItem, label }: AddItemInputType) => {
  const [itemValue, setItemValue] = useState<string>("");
  const [error, setError] = useState<null | string>("Field is required");

  //изменения в инпуте
  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setItemValue(e.currentTarget.value);
  }, []);

  //добавление таски
  const addItemHandler = useCallback(() => {
    if (itemValue.trim()) {
      addItem(itemValue.trim());
      setItemValue("");
    } else {
      setError("Field is required");
    }
  }, [addItem, itemValue]);

  //добавление таски по нажатию на Enter
  const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (error) {
      setError(null);
    }

    if (e.key === "Enter") {
      addItemHandler();
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
      }}
    >
      <TextField
        label={label}
        variant="standard"
        color="secondary"
        value={itemValue}
        onChange={onChangeHandler}
        onKeyUp={onKeyPressHandler}
        helperText={error}
        error={!!error}
        fullWidth
      />
      <IconButton title="+" onClick={addItemHandler} color="secondary">
        <ControlPointIcon />
      </IconButton>
    </div>
  );
});

//создание истории
export const AddItemInputWithErrorStory = {
  render: () => <AddItemInputWithError label={"enter your text..."} addItem={action("Button clicked inside form")} />,
};
