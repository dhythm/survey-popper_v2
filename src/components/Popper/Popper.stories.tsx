import { Box } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps, FC, useState } from "react";
import { Popper } from "./Popper";

export default {
  title: "Components/Popper",
  component: Popper,
  argTypes: {
    placement: {
      options: ["bottom", "top", "right", "left"],
      control: { type: "select" },
    },
  },
} as ComponentMeta<typeof Popper>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
);

const Component: FC<ComponentProps<typeof Popper>> = ({ ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "calc(100vh - 16px * 2)",
        backgroundColor: "#00000020",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button aria-describedby={id} type="button" onClick={handleClick}>
        Toggle Popper
      </button>
      <Popper {...props} id={id} open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
          The content of the Popper.
        </Box>
      </Popper>
    </div>
  );
};

export const $Popper = Template.bind({});
$Popper.args = {
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 8],
      },
    },
  ],
};
