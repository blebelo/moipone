import { StateMap } from "./constants";

export const mergePayloadHandler = (state: StateMap, action: { payload: StateMap}) => ({
    ...state,
    ...action.payload
    });