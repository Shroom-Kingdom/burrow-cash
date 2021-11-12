import { useContext } from "react";
import { Box, Button } from "@mui/material";

import { PERCENT_DIGITS, TOKEN_FORMAT } from "../../store/constants";
import { IAsset } from "../../interfaces/account";
import { IAssetDetailed } from "../../interfaces/asset";
import { TokenCell } from "../../components/Table/common/cells";
import { ModalContext, ModalState } from "../../components/Modal";

interface CellProps {
  rowData: IAsset & IAssetDetailed;
}

export { TokenCell };

export const SupplyAPYCell = ({ rowData }: CellProps) => {
  return <Box>{Number(rowData.apr).toFixed(PERCENT_DIGITS)}%</Box>;
};

export const CollateralCell = ({ rowData }) => {
  return (
    <Box>
      {rowData.collateral &&
        Number(rowData.collateral.balance).toLocaleString(undefined, TOKEN_FORMAT)}
    </Box>
  );
};

export const SuppliedCell = ({ rowData }: CellProps) => {
  return <Box>{Number(rowData.balance).toLocaleString(undefined, TOKEN_FORMAT)}</Box>;
};

export const WithdrawCell = ({ rowData }) => {
  const modal: ModalState = useContext(ModalContext);

  const handleClick = () => {
    modal.setModalData({
      type: "Withdraw",
      title: "Withdraw",
      totalAmountTitle: "Withdraw Supply Amount",
      asset: {
        token_id: rowData.token_id,
        amount: Number(rowData.balance),
        name: rowData?.name || "Unknown",
        symbol: rowData?.symbol || "???",
        icon: rowData?.icon,
        valueInUSD: rowData.price?.usd || 0,
        apy: rowData.borrow_apr,
        canBeUsedAsCollateral: rowData.config.can_use_as_collateral,
      },
      buttonText: "Withdraw",
    });
    modal.handleOpen();
  };

  return (
    <Box>
      <Button size="small" variant="contained" onClick={handleClick}>
        Withdraw
      </Button>
    </Box>
  );
};

export const AdjustCell = ({ rowData }) => {
  const modal: ModalState = useContext(ModalContext);
  const handleClick = () => {
    modal.setModalData({
      type: "Adjust",
      title: "Adjust Collateral",
      totalAmountTitle: "Amount designated as collateral",
      asset: {
        token_id: rowData.token_id,
        amount: Number(rowData.balance),
        name: rowData?.name || "Unknown",
        symbol: rowData?.symbol || "???",
        icon: rowData?.icon,
        valueInUSD: rowData.price?.usd || 0,
        apy: rowData.borrow_apr,
        collateral: rowData.collateral,
        canBeUsedAsCollateral: rowData.config.can_use_as_collateral,
      },
      buttonText: "Adjust",
    });
    modal.handleOpen();
  };

  return (
    <Box>
      <Button size="small" variant="contained" onClick={handleClick}>
        Adjust
      </Button>
    </Box>
  );
};

export const BorrowSuppplyAPYCell = ({ rowData }: CellProps) => {
  return <Box>{Number(rowData.supply_apr).toFixed(PERCENT_DIGITS)}%</Box>;
};

export const BorrowAPYCell = ({ rowData }: CellProps) => {
  return <Box>{Number(rowData.borrow_apr).toFixed(PERCENT_DIGITS)}%</Box>;
};

export const BorrowedCell = ({ rowData }: CellProps) => {
  return <Box>{Number(rowData.balance).toLocaleString(undefined, TOKEN_FORMAT)}</Box>;
};

export const RepayCell = ({ rowData }) => {
  console.info(rowData);
  const modal: ModalState = useContext(ModalContext);

  const handleClick = () => {
    modal.setModalData({
      type: "Repay",
      title: "Repay",
      totalAmountTitle: "Repay Borrow Amount",
      asset: {
        token_id: rowData.token_id,
        amount: Number(rowData.balance),
        name: rowData?.name || "Unknown",
        symbol: rowData?.symbol || "???",
        icon: rowData?.icon,
        valueInUSD: rowData.price?.usd || 0,
        apy: rowData.borrow_apr,
        canBeUsedAsCollateral: rowData.config.can_use_as_collateral,
      },
      buttonText: "Repay",
    });
    modal.handleOpen();
  };

  return (
    <Box>
      <Button size="small" variant="contained" onClick={handleClick}>
        Repay
      </Button>
    </Box>
  );
};