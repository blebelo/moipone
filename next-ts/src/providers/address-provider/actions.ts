'use client'
import { createAction } from 'redux-actions';
import { IAddress, IAddressStateContext} from './context';
import { RequestState } from '@/src/lib/common/constants';

export enum AddressActionEnums {
  // Create Address
  createAddressPending = 'CREATE_ADDRESS_PENDING',
  createAddressSuccess = 'CREATE_ADDRESS_SUCCESS',
  createAddressError = 'CREATE_ADDRESS_ERROR',
  
  // Get All Addresses
  getAllAddressesPending = 'GET_ALL_ADDRESSES_PENDING',
  getAllAddressesSuccess = 'GET_ALL_ADDRESSES_SUCCESS',
  getAllAddressesError = 'GET_ALL_ADDRESSES_ERROR',
  
  // Get Address By ID
  getAddressByIdPending = 'GET_ADDRESS_BY_ID_PENDING',
  getAddressByIdSuccess = 'GET_ADDRESS_BY_ID_SUCCESS',
  getAddressByIdError = 'GET_ADDRESS_BY_ID_ERROR',
  
  // Update Address
  updateAddressPending = 'UPDATE_ADDRESS_PENDING',
  updateAddressSuccess = 'UPDATE_ADDRESS_SUCCESS',
  updateAddressError = 'UPDATE_ADDRESS_ERROR',
  
  // Delete Address
  deleteAddressPending = 'DELETE_ADDRESS_PENDING',
  deleteAddressSuccess = 'DELETE_ADDRESS_SUCCESS',
  deleteAddressError = 'DELETE_ADDRESS_ERROR',

}

// ==================== CREATE ADDRESS ====================
export const createAddressPending = createAction<IAddressStateContext>(
  AddressActionEnums.createAddressPending,
  () => RequestState.Pending
);

export const createAddressSuccess = createAction<IAddressStateContext, IAddress>(
  AddressActionEnums.createAddressSuccess,
  (address: IAddress) => ({
    ...RequestState.Success,
    address 
  })
);

export const createAddressError = createAction<IAddressStateContext, string>(
  AddressActionEnums.createAddressError,
  (error: string) => ({ ...RequestState.Error, error })
);

// ==================== GET ALL ADDRESSES ====================
export const getAllAddressesPending = createAction<IAddressStateContext>(
  AddressActionEnums.getAllAddressesPending,
  () => RequestState.Pending
);

export const getAllAddressesSuccess = createAction<IAddressStateContext, IAddress[]>(
  AddressActionEnums.getAllAddressesSuccess,
  (addresses: IAddress[]) => ({
    ...RequestState.Success,
    addresses
  })
);

export const getAllAddressesError = createAction<IAddressStateContext, string>(
  AddressActionEnums.getAllAddressesError,
  (error: string) => ({ ...RequestState.Error, error })
);

// ==================== GET ADDRESS BY ID ====================
export const getAddressByIdPending = createAction<IAddressStateContext>(
  AddressActionEnums.getAddressByIdPending,
  () => RequestState.Pending
);

export const getAddressByIdSuccess = createAction<IAddressStateContext, IAddress>(
  AddressActionEnums.getAddressByIdSuccess,
  (address: IAddress) => ({
    ...RequestState.Success,
    address
  })
);

export const getAddressByIdError = createAction<IAddressStateContext, string>(
  AddressActionEnums.getAddressByIdError,
  (error: string) => ({ ...RequestState.Error, error })
);

// ==================== UPDATE ADDRESS ====================
export const updateAddressPending = createAction<IAddressStateContext>(
  AddressActionEnums.updateAddressPending,
  () => RequestState.Pending
);

export const updateAddressSuccess = createAction<IAddressStateContext, IAddress>(
  AddressActionEnums.updateAddressSuccess,
  (address: IAddress) => ({
    ...RequestState.Success,
    address 
  })
);

export const updateAddressError = createAction<IAddressStateContext, string>(
  AddressActionEnums.updateAddressError,
  (error: string) => ({ ...RequestState.Error, error })
);

// ==================== DELETE ADDRESS ====================
export const deleteAddressPending = createAction<IAddressStateContext>(
  AddressActionEnums.deleteAddressPending,
  () => RequestState.Pending
);

export const deleteAddressSuccess = createAction<IAddressStateContext>(
  AddressActionEnums.deleteAddressSuccess,
  () => RequestState.Success
);

export const deleteAddressError = createAction<IAddressStateContext, string>(
  AddressActionEnums.deleteAddressError,
  (error: string) => ({ ...RequestState.Error, error })
);
