import { styled } from "@mui/material/styles";
import { Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

export const Wrapper = styled(Toolbar)(({ theme }) => ({
  display: "grid",
  color: "white",
  [theme.breakpoints.down("sm")]: {
    alignItems: "start",
    marginTop: "0.5rem",
    gridTemplateAreas: `"burger logo wallet"`,
  },
  [theme.breakpoints.up("sm")]: {
    gridTemplateAreas: `"logo menu wallet"`,
    gridTemplateColumns: "auto auto 1fr",
    gap: "2rem",
  },
}));

export const Menu = styled("div")(({ theme }) => ({
  display: "grid",
  gridArea: "menu",
  gap: "0.5rem",
  gridTemplateColumns: "repeat(5, 1fr)",
  marginRight: "auto",
  [theme.breakpoints.down("sm")]: {
    margin: "0 auto",
    marginTop: "1rem",
    display: "none",
  },
}));

export const LinkStyled = styled(Link)(({ theme }) => ({
  borderWidth: 2,
  borderStyle: "solid",
  borderColor: "transparent",
  color: "white",
  opacity: 0.6,
  textDecoration: "none",
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  textAlign: "center",
  fontWeight: 500,
  fontSize: "0.875rem",
  lineHeight: 1.75,
  letterSpacing: "0.02857rem",
  paddingTop: 4,
  paddingBottom: 4,
  ":hover": {
    borderWidth: 2,
    borderBottomColor: theme.palette.primary.main,
  },
}));
