import { GET_RECORD, INSERT, UPDATE_ISSUBMITTED, GET_SELECTED_RECORD_BY_ID, UPDATE, SORT_RECORDS,
        UPDATE_TOAST_MSG, DELETE_RECORD, FILTER_BY_STATUS, LOGIN, REGISTER, GET_USER_RECORD } from "../action/RecordAction";

const INITIAL_STATE = {
    records: [],
    isResponse: false,
    selectedRecord: [],
    toastMsg: 'An error may occur, please try again later.',
    filterRecords: [],
    userName: '',
    userId: 0,
    isResponseSuccess: false,
}
export const recordReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_RECORD:
            return {
                ...state,
                records: action.payload,
                filterRecords: action.payload
              };
        case INSERT:
            return { ...state, isResponse: action.payload};
        case UPDATE_ISSUBMITTED:
            return { ...state, isResponse: action.payload};
        case GET_SELECTED_RECORD_BY_ID:
            return { ...state, selectedRecord: action.payload};
        case UPDATE:
            return { ...state, isResponse: action.payload};
        case SORT_RECORDS:
            return { ...state, filterRecords: action.payload };
        case UPDATE_TOAST_MSG:
            return { ...state, toastMsg: action.payload };
        case DELETE_RECORD:
            return { ...state, isResponse: action.payload };
        case FILTER_BY_STATUS:
            return { ...state, filterRecords: action.payload };
        case LOGIN:
            return { ...state, isResponseSuccess: action.payload.Success, userName: action.payload.Username, 
                    userId: action.payload.UserId, toastMsg: action.payload.ResponseMessage, isResponse: true};
        case REGISTER:
            return { ...state, isResponseSuccess: action.payload, isResponse: true};
        case GET_USER_RECORD:
            return {
                ...state,
                records: action.payload,
                filterRecords: action.payload
                };
        default:
            return state;
    }
}

export default recordReducer