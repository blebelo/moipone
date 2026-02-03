'use client'
import { handleActions } from "redux-actions";
import { AddressActionEnums } from "./actions";
import { INITIAL_STATE } from "@/src/lib/common/constants";
import { IAddressStateContext } from "./context";
import { mergePayloadHandler } from "@/src/lib/common/helper-methods";

export const AddressReducer = handleActions<
  IAddressStateContext,
  IAddressStateContext
>(
  {
    // Create Address
    [AddressActionEnums.createAddressPending]: mergePayloadHandler,
    [AddressActionEnums.createAddressSuccess]: mergePayloadHandler,
    [AddressActionEnums.createAddressError]: mergePayloadHandler,

    // Get All Addresses
    [AddressActionEnums.getAllAddressesPending]: mergePayloadHandler,
    [AddressActionEnums.getAllAddressesSuccess]: mergePayloadHandler,
    [AddressActionEnums.getAllAddressesError]: mergePayloadHandler,

    // Get Address By ID
    [AddressActionEnums.getAddressByIdPending]: mergePayloadHandler,
    [AddressActionEnums.getAddressByIdSuccess]: mergePayloadHandler,
    [AddressActionEnums.getAddressByIdError]: mergePayloadHandler,

    // Update Address
    [AddressActionEnums.updateAddressPending]: mergePayloadHandler,
    [AddressActionEnums.updateAddressSuccess]: mergePayloadHandler,
    [AddressActionEnums.updateAddressError]: mergePayloadHandler,

    // Delete Address
    [AddressActionEnums.deleteAddressPending]: mergePayloadHandler,
    [AddressActionEnums.deleteAddressSuccess]: mergePayloadHandler,
    [AddressActionEnums.deleteAddressError]: mergePayloadHandler,

  },
  INITIAL_STATE
);
