import {
  Box,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  PopperPlacementType,
  Theme,
} from "@mui/material";
import React, { ComponentProps, ReactElement } from "react";
import { makeStyles } from "@mui/styles";

interface Props {
  content: ReactElement;
  children: ReactElement;
  open: boolean;
  arrow?: boolean;
  placement?: PopperPlacementType;
  anchorEl?: ComponentProps<typeof Popper>["anchorEl"];
}

const useStyles = makeStyles((theme: Theme) => {
  const color = "#ffffff"; // Feel free to customise this like they do in Tooltip
  return {
    popoverRoot: {
      backgroundColor: color,
      maxWidth: 500,
      filter: "drop-shadow(0px 0px 30px rgba(203,203,203,0.72))",
      borderRadius: "10px",
      boxShadow: "0px 0px 30px rgb(203 203 203 / 72%)",
    },
    content: {
      padding: 20,
    },
    // Stolen from https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Tooltip/Tooltip.js and https://github.com/mui-org/material-ui/blob/4f2a07e140c954b478a6670c009c23a59ec3e2d4/docs/src/pages/components/popper/ScrollPlayground.js
    popper: {
      zIndex: 2000,
      '&[data-popper-placement*="bottom"] $arrow': {
        top: 0,
        left: 0,
        marginTop: "-0.71em",
        marginLeft: 4,
        marginRight: 4,
        "&::before": {
          transformOrigin: "0 100%",
        },
      },
      '&[data-popper-placement*="top"] $arrow': {
        bottom: 0,
        left: 0,
        marginBottom: "-0.71em",
        marginLeft: 4,
        marginRight: 4,
        "&::before": {
          transformOrigin: "100% 0",
        },
      },
      '&[data-popper-placement*="right"] $arrow': {
        left: 0,
        marginLeft: "-0.71em",
        height: "1em",
        width: "0.71em",
        marginTop: 4,
        marginBottom: 4,
        "&::before": {
          transformOrigin: "100% 100%",
        },
      },
      '&[data-popper-placement*="left"] $arrow': {
        right: 0,
        marginRight: "-0.71em",
        height: "1em",
        width: "0.71em",
        marginTop: 4,
        marginBottom: 4,
        "&::before": {
          transformOrigin: "0 0",
        },
      },
    },
    // Stolen from https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Tooltip/Tooltip.js
    arrow: {
      position: "absolute",
      width: "1em",
      height: "0.71em" /* = width / sqrt(2) = (length of the hypotenuse) */,
      boxSizing: "border-box",
      color,
      "&::before": {
        content: '""',
        margin: "auto",
        display: "block",
        width: "100%",
        height: "100%",
        backgroundColor: "currentColor",
        transform: "rotate(45deg)",
      },
    },
  };
});

export const ArrowPopper = ({
  placement = "top",
  arrow = true,
  open,
  content,
  anchorEl,
  children,
}: Props) => {
  const classes = useStyles();
  const [arrowRef, setArrowRef] = React.useState<HTMLElement | null>(null);

  return (
    <div>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
        className={classes.popper}
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
        ]}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} timeout={350}>
            <Paper
              sx={{
                boxShadow: "none",
              }}
            >
              <Paper className={classes.popoverRoot}>
                {arrow ? (
                  <span className={classes.arrow} ref={setArrowRef} />
                ) : null}
                <Box className={classes.content}>{content}</Box>
              </Paper>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};
