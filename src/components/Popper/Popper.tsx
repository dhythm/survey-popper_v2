import {
  Popper as MuiPopper,
  PopperProps as MuiPopperProps,
} from "@mui/material";
import { forwardRef } from "react";

export const Popper = forwardRef<HTMLDivElement, MuiPopperProps>(
  function Popper(props, ref) {
    return <MuiPopper {...props} ref={ref} />;
  }
);
