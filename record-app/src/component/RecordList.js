import React, { useEffect, useState } from 'react';

import { updateIsSubmitted, logout, getUserRecord, updateRecord } from '../action/RecordAction';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import ToastComponent from '../toast/toast';
import ConfirmationModal from '../Modal/ConfirmationModal';
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const RecordList = (props) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [toastOpen, setToastOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    message: "",
    showConfirmationDialog: false,
  });

  const logout = () => {
    // Clear any stored data or perform additional cleanup if needed
    sessionStorage.clear();
    window.location.reload();
    navigate('/');
  };
 
const title1 = props.userRecords.Result && props.userRecords.Result.length > 0
  ? props.userRecords.Result[0].Title
  : null;

console.log(title1); 
 

  const handleSaveChanges = () => {
    const updatedData = {
      Title: title,
      Detail: detail,
      Status: status,
    };
    props.updateRecord(sessionStorage.getItem('userId'), updatedData);
  };



  useEffect(() => {
    props.getUserListRecord(sessionStorage.getItem('userId'));

  }, []);

  useEffect(() => {
    if (props.isSubmitted) {
      setToastOpen(true);
      setModalOpen(false);
      props.updateIsSubmmitedStatus(false);
    }
  }, [props.isSubmitted, props.loginSuccess]);

  useEffect(() => {
    // Store login status in session storage
    sessionStorage.setItem('loginSuccess', props.loginSuccess);
  }, [props.loginSuccess]);

  const storedLoginSuccess = sessionStorage.getItem('loginSuccess') === 'true';
  const ID = sessionStorage.getItem("ID");
  const TITLE = sessionStorage.getItem("Title");
  const DETAIL = sessionStorage.getItem("Detail");
  const CREATEDTIME = sessionStorage.getItem("CreatedTime");
  const ENDTIME = sessionStorage.getItem("EndTime");
  const STATUS = sessionStorage.getItem("Status");
  const USERID = sessionStorage.getItem("UserID");
  const [title, setTitle] = useState(title1);
  const [detail, setDetail] = useState(props.userRecords.Detail);
  const [status, setStatus] = useState("");
  
  if (!storedLoginSuccess ) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <ToastComponent toastOpen={toastOpen} setToastOpen={setToastOpen} />
      <hr />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div>I'm {sessionStorage.getItem('username')}, nice to meet you</div>
        </div>
        <div>
        </div>
      </div>
      <hr />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        <label style={{ width: '100px', marginRight: '10px' }}>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '500px' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        <label style={{ width: '100px', marginRight: '10px' }}>Detail:</label>
        <textarea value={detail} onChange={(e) => setDetail(e.target.value)} style={{ width: '500px', height: '300px' }} />
      </div>
      <br /> {/* Blank line */}
      <div>
        If studying is Option 1, looking for a job is Option 2, and having a job is Option 3.
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        <label style={{ width: '100px', marginRight: '10px' }}>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </select>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        <label style={{ width: '100px', marginRight: '10px' }}>End Time:</label>
        <div>{ENDTIME}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        <label style={{ width: '100px', marginRight: '10px' }}>Created Time:</label>
        <div>{CREATEDTIME}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="btn btn-primary" type="button" onClick={handleSaveChanges}>
          Save Changes
        </button>
        <button className="btn btn-primary" type="button" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    selectedRecord: state.selectedRecord,
    isSubmitted: state.isResponse,
    loginSuccess: state.isResponseSuccess,
    userRecords: state.records,
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getUserListRecord: getUserRecord,
    updateIsSubmmitedStatus: updateIsSubmitted,
    logout: logout,
    updateRecord: updateRecord,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordList);