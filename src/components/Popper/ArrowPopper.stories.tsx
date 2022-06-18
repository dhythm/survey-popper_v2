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
          content={<p>The content of the Popper.</p>}
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
