import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { ComponentProps, FC, useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { TextField } from "@mui/material";

export const DatePicker: FC<
  Omit<ComponentProps<typeof DesktopDatePicker>, "value" | "onChange">
> = ({ ...props }) => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        inputFormat="yyyy-MM-dd"
        value={value}
        onChange={(newValue) => setValue(newValue as string)}
        {...props}
        renderInput={(props) => <TextField {...props} />}
      />
    </LocalizationProvider>
  );
};
