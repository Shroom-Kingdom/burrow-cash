import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "./store";
import { transformAsset } from "./utils";

export const getModalStatus = createSelector(
  (state: RootState) => state.app,
  (app) => app.showModal,
);

export const getDisplayAsTokenValue = createSelector(
  (state: RootState) => state.app,
  (app) => app.displayAsTokenValue,
);

export const getShowDust = createSelector(
  (state: RootState) => state.app,
  (app) => app.showDust,
);

export const getSelectedValues = createSelector(
  (state: RootState) => state.app,
  (app) => app.selected,
);

export const getAssetData = createSelector(
  (state: RootState) => state.app,
  (state: RootState) => state.assets.data,
  (state: RootState) => state.account,
  (app, assets, account) => {
    const asset = assets[app.selected?.tokenId];
    return {
      tokenId: asset?.token_id,
      action: app.selected.action,
      ...(asset ? transformAsset(asset, account) : {}),
    };
  },
);
