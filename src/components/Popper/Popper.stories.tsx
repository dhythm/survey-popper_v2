import styled from "@emotion/styled";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";
import { Popper } from "./Popper";
import React from "react";
import { Fade, Paper, Typography } from "@mui/material";

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

const StyledPopper = styled(Popper)`
  z-index: 1;
  & > div: {
    position: relative;
  }
  &[data-popper-placement*='bottom']: {
     & > div: {
       margin-top: 2;
     }
     & .MuiPopper-arrow: {
       top: 0;
       left: 0;
       margin-top: -0.9em;
       width: 3em;
       height: 1em;
       &::before: {
         border-width: 0 1em 1em 1em:
         border-color: transparent transparent blue transparent;
       }
     }
  }
   &[data-popper-placement*='top']: {
     & > div: {
       margin-bottom: 2;
     },
     & .MuiPopper-arrow: {
       bottom: 0;
       left: 0;
       margin-bottom: -0.9em;
       width: 3em;
       height: 1em;
       &::before: {
         border-width: 1em 1em 0 1em;
         border-color: blue transparent transparent transparent;
       }
     }
   }
   &[data-popper-placement*='right']: {
     & > div: {
       margin-left: 2
     }
     & .MuiPopper-arrow: {
       left: 0;
       margin-left: -0.9em;
       height: 3em;
       width: 1em;
       &::before: {
         border-width: 1em 1em 1em 0;
         border-color: transparent blue transparent transparent;
       },
     },
   },
   &[data-popper-placement*='left']: {
     & > div {
       margin-right: 2;
     }
     & .MuiPopper-arrow: {
       right: 0;
       margin-right: -0.9em;
       height: 3em;
       width: 1em;
       &::before: {
         border-width: 1em 0 1em 1em;
         border-color: transparent transparent transparent blue;
       }
     }
   }
`;

const Arrow = styled.div`
   position: absolute;
   font-size: 7;
   width: 3em;
   height: 3em;
   &::before: {
     content: "";
     margin: auto;
     display: block;
     width: 0;
     height: 0;
     border-style: solid;
   },
`;

const Template: ComponentStory<typeof Popper> = (args) => {
  const [ref, setRef] = React.useState<HTMLDivElement | null>(null);
  const [arrowRef, setArrowRef] = React.useState<HTMLDivElement | null>(null);

  return (
    <>
      <TargetArea>
        <Target ref={setRef}>anchorEl</Target>
      </TargetArea>
      {ref && (
        <StyledPopper
          {...args}
          disablePortal={false}
          modifiers={[
            { name: "offset", options: { offset: [0, 12] } },
            {
              name: "flip",
              enabled: true,
              options: {
                altBoundary: true,
                rootBoundary: "document",
                padding: 8,
              },
            },
            {
              name: "preventOverflow",
              enabled: false,
              options: {
                altAxis: false,
                altBoundary: false,
                tether: false,
                rootBoundary: "document",
                padding: 8,
              },
            },
            {
              name: "arrow",
              enabled: true,
              options: {
                padding: 5,
                element: arrowRef,
              },
            },
          ]}
          open
          anchorEl={ref}
        >
          <Paper elevation={3}>
            <Typography sx={{ p: 2 }}>The content of the Popper.</Typography>
          </Paper>
          {/* <Arrow ref={setArrowRef} /> */}
        </StyledPopper>
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
