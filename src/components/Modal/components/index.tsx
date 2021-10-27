import CloseIcon from "@mui/icons-material/Close";
import { Button, Switch, Typography } from "@mui/material";
import { Input, Stepper } from "../..";
import { colors } from "../../../style";
import { Inputs } from "../types";
import TokenIcon from "../../TokenIcon";
import { PERCENT_DIGITS, USD } from "../../../store/constants";

export const CloseModalIcon = ({ closeModal }: { closeModal: () => void }) => {
	return (
		<div onClick={closeModal} style={{ position: "absolute", cursor: "pointer", right: "8px" }}>
			<CloseIcon />
		</div>
	);
};

export const ModalTitle = ({ title }: { title: string }) => {
	return (
		<Typography
			id="modal-modal-title"
			style={{
				textAlign: "center",
				color: colors.secondary,
				fontWeight: 500,
				fontSize: "24px",
			}}
			variant="h6"
			component="h2"
			sx={{ mt: 2 }}
		>
			{title}
		</Typography>
	);
};

export const TokenInputs = ({
	availableTokens,
	tokenSymbol,
	tokenPriceInUSD,
	totalAmount,
	totalAmountTitle,
	onChange,
}: {
	availableTokens: number;
	tokenSymbol: string;
	tokenPriceInUSD: number;
	totalAmountTitle: string;
	totalAmount: number;
	onChange: (amount: number) => void;
}) => {
	const totalAvailableTokensPrice = Number(availableTokens) * Number(tokenPriceInUSD);

	return (
		<>
			<div
				style={{
					display: "grid",
					padding: "1em",
					fontSize: "14px",
					fontWeight: 500,
					gridTemplateColumns: "1.1fr 0.9fr",
					color: colors.secondary,
				}}
			>
				<div>{`Available: ${availableTokens.toFixed(
					2,
				)} ${tokenSymbol} (${totalAvailableTokensPrice.toLocaleString(undefined, USD)})`}</div>
				<div style={{ justifySelf: "end" }}>{`1 ${tokenSymbol} = ${tokenPriceInUSD.toLocaleString(
					undefined,
					USD,
				)}`}</div>
			</div>
			<div style={{ paddingLeft: "1em", paddingRight: "1em" }}>
				<Input
					value={0}
					type={"number"}
					onChange={(e) => {
						const amount = Number(e.target.value);
						if (!isNaN(amount)) {
							if (onChange) onChange(amount);
						}
					}}
				/>
			</div>
			<div style={{ paddingTop: "1em" }}>
				<Stepper />
			</div>
			<Typography
				style={{ textAlign: "center", fontSize: "16px", fontWeight: 500 }}
				id="modal-modal-description"
				sx={{ mt: 2 }}
			>
				{`${totalAmountTitle} = ${totalAmount}`}
			</Typography>
		</>
	);
};

const createListItem = ({
	title,
	value,
	valueType = Inputs.String,
}: {
	title: string;
	value: any;
	valueType?: Inputs;
}) => {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "1fr 1fr",
				gridGap: "2em",
				padding: "1em",
				paddingTop: 0,
			}}
		>
			<div style={{ color: colors.secondary, fontSize: "14px", fontWeight: 400 }}>{title}</div>
			{valueType === Inputs.String && (
				<div
					style={{
						color: colors.secondary,
						justifySelf: "end",
						fontSize: "14px",
						fontWeight: 700,
					}}
				>
					{value}
				</div>
			)}
			{valueType === Inputs.Switch && (
				<div style={{ justifySelf: "end" }}>
					<Switch />
				</div>
			)}
		</div>
	);
};

export const Rates = ({ ratesTitle, rates }: { ratesTitle: string; rates: any[] }) => {
	return (
		<>
			<div style={{ padding: "1em", fontSize: "14px", fontWeight: 500 }}>{ratesTitle}</div>
			{rates?.map((r) => createListItem(r))}
		</>
	);
};

export const ActionButton = ({ text, onClick }: { text: string; onClick?: () => void }) => {
	return (
		<Typography
			style={{ textAlign: "center", color: colors.secondary }}
			id="modal-modal-description"
			sx={{ mt: 2 }}
		>
			<Button style={{ backgroundColor: colors.primary }} variant="contained" onClick={onClick}>
				{text}
			</Button>
		</Typography>
	);
};

export const TokenBasicDetails = ({
	tokenName,
	icon,
	apy,
}: {
	tokenName: string;
	icon?: string;
	apy: number;
}) => {
	return (
		<>
			<div style={{ display: "grid", justifyContent: "center", marginTop: "2em" }}>
				<TokenIcon icon={icon} />
			</div>
			<Typography
				style={{ textAlign: "center", color: colors.secondary, fontSize: "14px", fontWeight: 500 }}
				id="modal-modal-description"
				sx={{ mt: 2 }}
			>
				{tokenName}
				<br />
				{`${apy.toFixed(PERCENT_DIGITS)}% APY`}
			</Typography>
		</>
	);
};
