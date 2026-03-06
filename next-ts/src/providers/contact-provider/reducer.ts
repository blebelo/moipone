'use client'
import { handleActions } from "redux-actions";
import { ContactActionEnums } from "./actions";
import { INITIAL_STATE } from "@/src/lib/common/constants";
import { IContactStateContext } from "./context";
import { mergePayloadHandler } from "@/src/lib/common/helper-methods";

export const ContactReducer = handleActions<
  IContactStateContext,
  IContactStateContext
>(
  {
    // Create Contact
    [ContactActionEnums.createContactPending]: mergePayloadHandler,
    [ContactActionEnums.createContactSuccess]: mergePayloadHandler,
    [ContactActionEnums.createContactError]: mergePayloadHandler,

    // Get All Contacts
    [ContactActionEnums.getAllContactsPending]: mergePayloadHandler,
    [ContactActionEnums.getAllContactsSuccess]: mergePayloadHandler,
    [ContactActionEnums.getAllContactsError]: mergePayloadHandler,

    // Get Contact By ID
    [ContactActionEnums.getContactByIdPending]: mergePayloadHandler,
    [ContactActionEnums.getContactByIdSuccess]: mergePayloadHandler,
    [ContactActionEnums.getContactByIdError]: mergePayloadHandler,

    // Update Contact
    [ContactActionEnums.updateContactPending]: mergePayloadHandler,
    [ContactActionEnums.updateContactSuccess]: mergePayloadHandler,
    [ContactActionEnums.updateContactError]: mergePayloadHandler,

    // Delete Contact
    [ContactActionEnums.deleteContactPending]: mergePayloadHandler,
    [ContactActionEnums.deleteContactSuccess]: mergePayloadHandler,
    [ContactActionEnums.deleteContactError]: mergePayloadHandler,
  },
  INITIAL_STATE,
);
