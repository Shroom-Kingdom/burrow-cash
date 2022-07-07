import { Stack } from "@mui/material";

import { StatsToggleButtons } from "./components";
import { StatsContainer } from "./stats";
import { Hog } from "./hog";

export const Stats = () => {
  return (
    <Stack mx={{ xs: "1rem", sm: "1.5rem" }} my={{ xs: "2rem" }} color="white" gap="2rem">
      <StatsToggleButtons />
      <Stack direction={{ xs: "column", lg: "row" }} gap="2rem">
        <StatsContainer />
        <Hog />
      </Stack>
    </Stack>
  );
};
