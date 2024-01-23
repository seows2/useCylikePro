import { FormLabel, styled } from "@mui/material";

export const LabelWrapper = styled("div")({
  display: "flex",
  gap: "4px",
  marginBottom: "8px",
});

export const NomalLabel = styled(FormLabel)(() => ({
  fontWeight: 500,
  fontSize: "13px",
  lineHeight: "20px",
}));
