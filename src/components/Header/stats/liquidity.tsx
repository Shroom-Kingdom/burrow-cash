import { Tooltip, Box } from "@mui/material";
import { MdInfoOutline } from "@react-icons/all-files/md/MdInfoOutline";

import { useFullDigits } from "../../../hooks/useFullDigits";
import { useAppSelector } from "../../../redux/hooks";
import { getTotalBalance } from "../../../redux/selectors/getTotalBalance";
import { getTotalAccountBalance } from "../../../redux/selectors/getTotalAccountBalance";
import { m, COMPACT_USD_FORMAT } from "../../../store";
import { trackFullDigits } from "../../../telemetry";
import { Stat } from "./components";
import { getAdjustedNetLiquidity } from "../../../redux/selectors/getAccountRewards";

export const ProtocolLiquidity = () => {
  const { fullDigits, setDigits } = useFullDigits();
  const protocolDeposited = useAppSelector(getTotalBalance("supplied"));
  const protocolBorrowed = useAppSelector(getTotalBalance("borrowed"));
  const protocolNetLiquidity = protocolDeposited - protocolBorrowed;

  const protocolNetLiquidityValue = fullDigits?.totals
    ? protocolNetLiquidity.toLocaleString(undefined, COMPACT_USD_FORMAT)
    : `$${m(protocolNetLiquidity)}`;

  const protocolDepositedValue = fullDigits?.totals
    ? protocolDeposited.toLocaleString(undefined, COMPACT_USD_FORMAT)
    : `$${m(protocolDeposited)}`;

  const protocolBorrowedValue = fullDigits?.totals
    ? protocolBorrowed.toLocaleString(undefined, COMPACT_USD_FORMAT)
    : `$${m(protocolBorrowed)}`;

  const netLiquidityLabels = [
    {
      value: protocolDepositedValue,
      text: "Deposited",
    },
    {
      value: protocolBorrowedValue,
      text: "Borrowed",
    },
  ];

  const toggleValues = () => {
    const totals = !fullDigits?.totals;
    trackFullDigits({ totals });
    setDigits({ totals });
  };

  return (
    <Stat
      title="Net Liquidity"
      amount={protocolNetLiquidityValue}
      labels={[netLiquidityLabels]}
      onClick={toggleValues}
    />
  );
};

export const UserLiquidity = () => {
  const { fullDigits, setDigits } = useFullDigits();
  const userDeposited = useAppSelector(getTotalAccountBalance("supplied"));
  const userBorrowed = useAppSelector(getTotalAccountBalance("borrowed"));
  const userNetLiquidity = userDeposited - userBorrowed;
  const adjustedNetLiquidity = useAppSelector(getAdjustedNetLiquidity);

  const userNetLiquidityValue = fullDigits?.user
    ? userNetLiquidity.toLocaleString(undefined, COMPACT_USD_FORMAT)
    : `$${m(userNetLiquidity)}`;

  const userAdjustedNetLiquidityValue = fullDigits?.user
    ? adjustedNetLiquidity.toLocaleString(undefined, COMPACT_USD_FORMAT)
    : `$${m(adjustedNetLiquidity)}`;

  const userDepositedValue = fullDigits?.user
    ? userDeposited.toLocaleString(undefined, COMPACT_USD_FORMAT)
    : `$${m(userDeposited)}`;

  const userBorrowedValue = fullDigits?.user
    ? userBorrowed.toLocaleString(undefined, COMPACT_USD_FORMAT)
    : `$${m(userBorrowed)}`;

  const netLiquidityLabels = [
    [
      {
        value: userDepositedValue,
        text: "Deposited",
      },
      {
        value: userBorrowedValue,
        text: "Borrowed",
      },
    ],
  ];

  const toggleValues = () => {
    const user = !fullDigits?.user;
    trackFullDigits({ user });
    setDigits({ user });
  };

  const title = (
    <Tooltip title={`Your full net liquidity is: ${userNetLiquidityValue}`} placement="top" arrow>
      <Box component="span">
        <span>Net Liquidity</span>
        <MdInfoOutline
          style={{ marginLeft: "3px", color: "#909090", position: "relative", top: "2px" }}
        />
      </Box>
    </Tooltip>
  );

  return (
    <Stat
      title={title}
      amount={userAdjustedNetLiquidityValue}
      labels={netLiquidityLabels}
      onClick={toggleValues}
    />
  );
};
