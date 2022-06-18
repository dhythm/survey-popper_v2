import styled from "@emotion/styled";
import { ComponentMeta, ComponentStory, Story } from "@storybook/react";
import { Popper } from "./Popper";
import React, { ComponentProps, FC, ReactNode, VFC } from "react";
import { Box, Grow, Paper, Typography } from "@mui/material";

export default {
  title: "Components/Popper",
  component: Popper,
  argTypes: {
    placement: {
      options: ["bottom", "top", "right", "left"],
      control: { type: "select" },
    },
  },
} as ComponentMeta<typeof Popper & { arrow?: boolean }>;

const color = "#ffffff";

const StyledPopper = styled(Popper)`
  z-index: 1;
  &[data-popper-placement*='bottom'] .MuiPopper-arrow: {
    top: 0;
    left: 0;
    margin-top: -0.71em;
    margin-left: 4px;
    margin-right: 4px;
    &::before: {
      border-width: 0 1em 1em 1em:
      border-color: transparent transparent ${color} transparent;
      transform-origin: 0 100%;
    }
  }
  &[data-popper-placement*='top'] .MuiPopper-arrow: {
    bottom: 0;
    left: 0;
    margin-bottom: -0.71em;
    margin-left: 4px;
    margin-right: 4px;
    &::before: {
      border-width: 1em 1em 0 1em;
      border-color: ${color} transparent transparent transparent;
      transform-origin: 100% 0;
    }
  }
  &[data-popper-placement*='right'] .MuiPopper-arrow: {
    left: 0;
    margin-left: -0.71em;
    height: 1em;
    width: 0.71em;
    margin-top: 4px;
    margin-bottom: 4px;
    &::before: {
      border-width: 1em 1em 1em 0;
      border-color: transparent ${color} transparent transparent;
      transform-origin: 100% 100%;
    }
  }
  &[data-popper-placement*='left'] .MuiPopper-arrow: {
      right: 0;
      margin-right: -0.71em
      height: 1em;
      width: 0.71em;
      margin-top: 4px;
      margin-bottom: 4px;
      &::before: {
        border-width: 1em 0 1em 1em;
        border-color: transparent transparent transparent ${color};
        transform-origin: 0 0;
      }
  }
`;

const Arrow = styled.div`
  position: absolute;
  width: 1em;
  height: 0.71em;
  box-sizing: border-box;
  color: blue;
  &::before: {
    content: "";
    margin: auto;
    display: block;
    width: 100%;
    height: 100%;
    background-color: currentColor;
    transform: rotate(45deg);
  }
`;

const StyledPaper = styled(Paper)`
  background-color: ${color};
  max-width: 500px
  filter: drop-shadow(0px 0px 30px rgba(203,203,203,0.72));
  border-radius: 10px;
  box-shadow: 0px 0px 30px rgb(203 203 203 / 72%);
`;

const Component: FC<
  ComponentProps<typeof Popper> & { children: ReactNode }
> = ({ anchorEl, children }) => {
  const [arrowRef, setArrowRef] = React.useState<HTMLDivElement | null>(null);

  return (
    <div>
      <StyledPopper
        open
        anchorEl={anchorEl}
        placement="bottom"
        transition
        disablePortal={true}
        modifiers={[
          {
            name: "flip",
            enabled: false,
            options: {
              altBoundary: true,
              rootBoundary: "viewport",
              padding: 8,
            },
          },
          {
            name: "preventOverflow",
            enabled: true,
            options: {
              altAxis: true,
              altBoundary: true,
              tether: false,
              rootBoundary: "viewport",
              padding: 8,
            },
          },
          {
            name: "arrow",
            enabled: true,
            options: {
              element: arrowRef,
            },
          },
          {
            name: "offset",
            options: {
              offset: [0, 12],
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} timeout={350}>
            <Paper
              sx={{
                boxShadow: "none",
              }}
            >
              <StyledPaper>
                <Arrow ref={setArrowRef} />
                <Box sx={{ padding: "20px" }}>{children}</Box>
              </StyledPaper>
            </Paper>
          </Grow>
        )}
      </StyledPopper>
    </div>
  );
};

const Template: Story<React.ComponentProps<typeof Popper>> = (args) => {
  const [ref, setRef] = React.useState<HTMLDivElement | null>(null);

  return (
    <>
      <TargetArea>
        <Target ref={setRef}>anchorEl</Target>
      </TargetArea>
      {ref && (
        <Component anchorEl={ref} {...args}>
          <p>The content of the Popper.</p>
        </Component>
      )}
    </>
  );
};

const TargetArea = styled.span`
  display: block;
  width: 200px;
  padding: 200px 350px;
  text-align: center;
`;

const Target = styled.div`
  background-color: limegreen;
`;

export const $Popper = Template.bind({});
$Popper.args = {
  placement: "bottom",
};
