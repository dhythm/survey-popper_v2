import styled from "@emotion/styled";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";
import { ArrowPopper } from "./ArrowPopper";

export default {
  title: "Components/ArrowPopper",
  component: ArrowPopper,
  argTypes: {
    placement: {
      options: ["bottom", "top", "right", "left"],
      control: { type: "select" },
    },
    arrow: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof ArrowPopper>;

const Template: ComponentStory<typeof ArrowPopper> = (args) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  return (
    <>
      <TargetArea>
        <Target ref={setRef}>anchorEl</Target>
      </TargetArea>
      {ref && (
        <ArrowPopper
          {...args}
          content={
            <div>
              <p>
                Click the icon button to trigger the popper. The{" "}
                <strong>&lt;ArrowPopper/&gt;</strong> component is generic,
                reusable and ready to use.
              </p>
              <p>
                The <strong>&lt;ClickableArrowPopper/&gt;</strong> component
                extends upon this and you don't have to manage click state - it
                will do it for you. Note that it will still honour any existing
                onClick functionality of the child component and pass the event
                along.
              </p>
              <p>
                This is for people who want a lightweight popup, but more
                interactive nature than the Tooltip. Popover does the job too,
                but there is no support for arrow.
              </p>
              <p>
                Feel free to tweak the colours and defaults within{" "}
                <strong>ArrowPopper</strong>.
              </p>
            </div>
          }
          anchorEl={ref}
          arrow
          open
        />
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

export const $ArrowPopper = Template.bind({});
$ArrowPopper.args = {
  placement: "bottom",
};
