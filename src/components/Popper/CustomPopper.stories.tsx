import styled from "@emotion/styled";
import { Box, Fade, Popper } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps, FC, ReactNode, useState } from "react";

export default {
  title: "Components/CustomPopper",
  component: Popper,
  argTypes: {
    placement: {
      options: ["bottom", "top", "right", "left"],
      control: { type: "select" },
    },
  },
} as ComponentMeta<typeof Popper>;

const color = "#ffffff";

const Arrow = styled.div<{ minimized?: boolean }>`
  position: absolute;
  width: ${(props) => (props.minimized ? 8 : 16)}px;
  width: 16px;
  height: ${(props) => (props.minimized ? 8 : 16)}px;
  height: 16px;
  font-size: ${(props) => (props.minimized ? 4 : 8)}px;
  font-size: 8px;
  &::before {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    margin: auto;
    content: "";
  }
  &::after {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    margin: auto;
    content: "";
  }
`;

const StyledPopper = styled(Popper)`
  z-index: 1;
  ${(props) => {
    const directions = ["bottom", "top", "right", "left"] as const;
    const reverse = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right",
    } as const;
    return directions.map((direction) => {
      const isHorizontal = direction === "right" || direction === "left";
      return `
&[data-popper-placement*='${direction}'] .arrow {
    height: ${8 * (isHorizontal ? 2 : 1)}px;
    width: ${8 * (isHorizontal ? 1 : 2)}px;
    ${reverse[direction]}: -8px;
    margin: ${isHorizontal ? "1px 0" : "0 1px"};
    ${isHorizontal ? "margin-top" : "margin-left"}: -1px;
    &::before {
        border-color: ${Object.keys(reverse)
          .map((key) => (key === direction ? color : "transparent"))
          .join(" ")};
        border-width: ${Object.keys(reverse)
          .map((key) => (key === reverse[direction] ? 0 : "8px"))
          .join(" ")};
        filter: ${
          direction === "top"
            ? `drop-shadow(2px 5px 3px rgba(0, 0, 0, 0.2))`
            : direction === "left"
            ? `drop-shadow(5px 3px 3px rgba(0, 0, 0, 0.2))`
            : null
        };
        ${reverse[direction]}: null;
    }
    &:: after {
        border-color: ${Object.keys(reverse)
          .map((key) => (key === direction ? color : "transparent"))
          .join(" ")};
        border-width: ${Object.keys(reverse)
          .map((key) => (key === reverse[direction] ? 0 : "8px"))
          .join(" ")};
        ${reverse[direction]}: 1px;
    }
}
`;
    });
  }}
`;

const Component: FC<
  ComponentProps<typeof Popper> & { children: ReactNode }
> = ({ children, ...props }) => {
  const [arrowRef, setArrowRef] = useState<HTMLDivElement | null>(null);

  const modifiers = [
    {
      name: "arrow",
      enabled: true,
      element: arrowRef,
    },
    {
      name: "offset",
      options: {
        offset: [0, 12],
      },
    },
    {
      name: "hide",
      enabled: true,
    },
    {
      name: "preventOverflow",
      enabled: true,
      options: {
        padding: 16,
        rootBoundary: "viewport",
      },
      priority: ["bottom", "right", "top", "left"],
    },
    {
      name: "flip",
      options: { padding: 5 },
      enabled: false,
    },
  ];
  return (
    <StyledPopper {...props} modifiers={modifiers} open transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Root>
            <Content>
              <Arrow className="arrow" ref={setArrowRef} />
              <Box sx={{ padding: "20px" }}>{children}</Box>
            </Content>
          </Root>
        </Fade>
      )}
    </StyledPopper>
  );
};

const Root = styled.div`
  position: relative;
  width: 260px;
  box-sizing: border-box;
  background-color: #ffffff;
  border: solid;
  border-radius: 3px;
  border-width: 1px;
  padding: 2px;
  border-color: #000000;
  box-shadow: 0px 0px 30px rgb(203 203 203 / 72%);
`;

const Content = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  padding: 16px 16px;
  > *:not(:first-child) {
    margin-top: 8px;
  }
`;

const Template: ComponentStory<typeof Popper> = (args) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

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
