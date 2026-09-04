import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

type Props = {
  options?: string[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
};

export function MuiDynamicSelect({ options, value, onChange, label }: Props) {
  return (
    <FormControl sx={{ minWidth: 120 }}>
      {label && <InputLabel>{label}</InputLabel>}

      <Select
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}
      >
        {options?.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
