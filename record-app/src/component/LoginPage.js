import React, { useEffect, useState } from 'react';
import { userLogin, updateIsSubmitted, checkAuth, getUserRecord } from '../action/RecordAction';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { useNavigate } from "react-router-dom";
import ToastComponent from '../toast/toast';


const LoginPage = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorSubmitMsg, setErrorSubmitMsg] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const handleSubmit = (e) => {
    
    e.preventDefault();
    if (username !== '' && password !== '') {
      const data = {
        
        Username: username,
        Password: password,
      };
      sessionStorage.setItem("Register",0);
      props.handleLogin(data);
    } else {
      setErrorSubmitMsg(true);
    }
  };

  useEffect(() => {

    if (props.submittedLogin) {

      if (props.loginSuccess) {
        
        if (sessionStorage.getItem("Register") != 1){
          sessionStorage.setItem('loginSuccess', 'true');
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('password', password);
          sessionStorage.setItem('userId', props.userId);
          console.log("is you :",props.userId);
          
          props.updateIsSubmmitedStatus(false);

          navigate("/record");
        
        }
      } else {
        setToastOpen(true);
        props.updateIsSubmmitedStatus(false);
      }
    }
  }, [props.submittedLogin, props.loginSuccess, props.userId]);

  return (
    <div>
      <ToastComponent toastOpen={toastOpen} setToastOpen={setToastOpen} />
      <div className='login-container'>
        <form>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Login</h5>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <img src={require('../images/user.png')} className="login-img" alt="userImg" />
                </span>
                <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <img src={require('../images/lock.png')} className="login-img" alt="pwImg" />
                </span>
                <input type="password" className="form-control" placeholder="Password" autoComplete='on' value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="invalid-feedback mb-3" style={{ display: errorSubmitMsg && 'block' }}>
                You must fill in all the details before submitting.
              </div>
              <p>No Account? <a href='/register'>Register</a></p>
              <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loginSuccess: state.isResponseSuccess,
    submittedLogin: state.isResponse,
    userId: state.userId,
    userRecords: state.userRecords,
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    handleLogin: userLogin,
    updateIsSubmmitedStatus: updateIsSubmitted,
    checkAuth: checkAuth,
    getUserListRecord: getUserRecord,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);