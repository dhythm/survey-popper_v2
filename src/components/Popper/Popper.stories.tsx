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

// const Popper = styled(MuiPopper, {
//   shouldForwardProp: (prop) => prop !== "arrow",
// })(({ theme, arrow }) => ({
//   zIndex: 1,
//   "& > div": {
//     position: "relative",
//   },
//   '&[data-popper-placement*="bottom"]': {
//     "& > div": {
//       marginTop: arrow ? 2 : 0,
//     },
//     "& .MuiPopper-arrow": {
//       top: 0,
//       left: 0,
//       marginTop: "-0.9em",
//       width: "3em",
//       height: "1em",
//       "&::before": {
//         borderWidth: "0 1em 1em 1em",
//         borderColor: `transparent transparent ${theme.palette.background.paper} transparent`,
//       },
//     },
//   },
//   '&[data-popper-placement*="top"]': {
//     "& > div": {
//       marginBottom: arrow ? 2 : 0,
//     },
//     "& .MuiPopper-arrow": {
//       bottom: 0,
//       left: 0,
//       marginBottom: "-0.9em",
//       width: "3em",
//       height: "1em",
//       "&::before": {
//         borderWidth: "1em 1em 0 1em",
//         borderColor: `${theme.palette.background.paper} transparent transparent transparent`,
//       },
//     },
//   },
//   '&[data-popper-placement*="right"]': {
//     "& > div": {
//       marginLeft: arrow ? 2 : 0,
//     },
//     "& .MuiPopper-arrow": {
//       left: 0,
//       marginLeft: "-0.9em",
//       height: "3em",
//       width: "1em",
//       "&::before": {
//         borderWidth: "1em 1em 1em 0",
//         borderColor: `transparent ${theme.palette.background.paper} transparent transparent`,
//       },
//     },
//   },
//   '&[data-popper-placement*="left"]': {
//     "& > div": {
//       marginRight: arrow ? 2 : 0,
//     },
//     "& .MuiPopper-arrow": {
//       right: 0,
//       marginRight: "-0.9em",
//       height: "3em",
//       width: "1em",
//       "&::before": {
//         borderWidth: "1em 0 1em 1em",
//         borderColor: `transparent transparent transparent ${theme.palette.background.paper}`,
//       },
//     },
//   },
// }));

const Arrow = styled.div`
   position: absolute
   font-size: 7
   width: 3em
   height: 3em
   &::before: {
     content: ""
     margin: auto
     display: block
     width: 0
     height: 0
     border-style: solid
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
        <Popper
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
          <div>
            <Paper elevation={3}>
              <Typography sx={{ p: 2 }}>The content of the Popper.</Typography>
            </Paper>
            {/* <Arrow ref={setArrowRef} /> */}
          </div>
        </Popper>
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
