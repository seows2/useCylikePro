import { styled } from "@mui/material";

export const Form = styled("form", {
  shouldForwardProp: (props) => props !== "maxWidth",
})<{ maxWidth: number | "none" }>(({ maxWidth }) => ({
  maxWidth: maxWidth !== "none" ? `${maxWidth}px` : maxWidth,
}));
