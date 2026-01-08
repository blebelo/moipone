export const RequestState = {
    Pending: { isPending: true, isSuccess: false, isError: false },
    Success: { isPending: false, isSuccess: true, isError: false },
    Error: { isPending: false, isSuccess: false, isError: true },
}

export const INITIAL_STATE = {
    isPending: false,
    isSuccess: false,
    isError: false,
  };