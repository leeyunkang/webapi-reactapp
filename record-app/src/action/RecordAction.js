import axios from "axios";

export const GET_RECORD = "GET_RECORD";
export const INSERT = "INSERT";
export const UPDATE_ISSUBMITTED = "UPDATE_ISSUBMITTED";
export const GET_SELECTED_RECORD_BY_ID = "GET_SELECTED_RECORD_BY_ID";
export const UPDATE = "UPDATE";
export const SORT_RECORDS = "SORT_RECORDS";
export const UPDATE_TOAST_MSG = "UPDATE_TOAST_MSG";
export const DELETE_RECORD = "DELETE_RECORD";
export const FILTER_BY_STATUS = "FILTER_BY_STATUS";
export const LOGIN = "LOGIN";
export const REGISTER = "REGISTER";
export const GET_USER_RECORD = "GET_USER_RECORD";
export const LOGOUT = 'LOGOUT';




export const getUserRecord = (id) => {
  return function (dispatch) {

    axios.post(`/api/Record/GetAllUserRecords/${id}`).then((response)=>{
      const result = response.data.Result; 
      if (result && result.length > 0) {
        const record = result[0];
        sessionStorage.setItem("ID",record.Id);
        sessionStorage.setItem("Title",record.Title);
        sessionStorage.setItem("Detail",record.Detail);
        sessionStorage.setItem("CreatedTime",record.CreatedTime);
        sessionStorage.setItem("Status",record.Status);
        sessionStorage.setItem("EndTime",record.EndTime);
        sessionStorage.setItem("UserID",record.UserID);
      }
      dispatch({ type: GET_USER_RECORD, payload: response.data });
      
  


    }).catch((err) => {
      console.log("Err: ", err);
    });
  }
} 





export const updateRecord = (id,data) => {

  return function (dispatch) {
    axios.post(`/api/Record/UpdateRecord/${id}`,data).then((response) => {
      
      if (response.data.Success) {

        dispatch({ type: UPDATE, payload: response.data.Success });
        dispatch({ type: UPDATE_TOAST_MSG, payload: 'Record Updated Successfully' });
      }
    }).catch((error) => {
      console.log(error);
    
    });
  };
};




export const updateIsSubmitted = (data) => {
  return {
    type: UPDATE_ISSUBMITTED,
    payload: data
  }
}



export const getRecord = () => {
  return function (dispatch) {
    axios.get("/api/Record/GetAllRecords").then((response)=>{
      dispatch({ type: GET_RECORD, payload: response.data.Result });
    }).catch((err) => {
      console.log("Err: ", err);
    });
  }
} 


export const sortRecord = (data) => {
  return {
    type: SORT_RECORDS,
    payload: data
  }
}

export const userLogin = data => {
  return function (dispatch) {
    axios.post("/api/Auth/Login", data).then((response)=>{
      dispatch({ type: LOGIN, payload: response.data });
      dispatch({ type: UPDATE_TOAST_MSG, payload: response.data.ResponseMessage });
      
      // Store the authentication token in session storage
      sessionStorage.setItem('authToken', response.data.token);
      sessionStorage.setItem('userId', response.data.UserID);
    }).catch((error)=>{
      console.log(error)})
  }
}

export const userRegister = data => {
  return function (dispatch) {
    axios.post("/api/Auth/Register", data).then((response)=>{
      console.log(data);
      if (response.data.Success) {
        dispatch({ type: REGISTER, payload: response.data.Success });
        dispatch({ type: UPDATE_TOAST_MSG, payload:'Register Successfully' });
      }
      else {
        dispatch({ type: REGISTER, payload: response.data.Success });
        dispatch({ type: UPDATE_TOAST_MSG, payload: response.data.ResponseMessage });
      }
    }).catch((error)=>{
      console.log(error)})
  }
}

export const logout = () => {
  sessionStorage.removeItem('authToken');

  return {
    type: LOGOUT,
  };
};

export const checkAuth = () => {
  return function (dispatch) {
    const authToken = sessionStorage.getItem('authToken');

    if (authToken) {
      dispatch({ type: LOGIN, payload: { token: authToken } });
    } else {
      dispatch({ type: LOGOUT });
    }
  };
};