import React, { useEffect, useState } from 'react';
import { userRegister, updateIsSubmitted } from '../action/RecordAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
import ToastComponent from '../toast/toast';


const RegisterPage = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [pw, setPw] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorSubmitMsg, setErrorSubmitMsg] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
 
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPw((prev) => ({
      ...prev,
      [name]: value,
    }));
    handleCheckPassword(e);
  };

  const handleCheckPassword = (e) => {
    let { name, value } = e.target;
    switch (name) {
      case 'password':
        if (pw.confirmPassword && value !== pw.confirmPassword) {
          setErrorPassword(true);
        } else {
          setErrorPassword(false);
        }
        break;
      case 'confirmPassword':
        if (pw.password && value !== pw.password) {
          setErrorPassword(true);
        } else {
          setErrorPassword(false);
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username !== '' && pw.password !== '' && pw.confirmPassword !== '' && !errorPassword) {
      const data = {
        Username: username,
        Password: pw.password,
      };
      props.handleRegister(data);
    } else {
      setErrorSubmitMsg(true);
    }
  };

  useEffect(() => {
    console.log(props.submitRegister);
    console.log(props.registerSuccess);
 if ((props.submitRegister && props.registerSuccess)){
      sessionStorage.clear();
     
      setToastOpen(true);
      sessionStorage.setItem("Register",1);
      navigate('/');
      



    } else if (!props.registerSuccess) {
      
      setToastOpen(true);
      props.updateIsSubmmitedStatus(false);
    }
    
  }, [props.submitRegister, props.registerSuccess]);

  return (
    <div className='login-container'>
      <ToastComponent toastOpen={toastOpen} setToastOpen={setToastOpen} />
      <form>
        <div className='card'>
          <div className='card-body'>
            <h5 className='card-title'>Register</h5>
            <div className='input-group mb-3'>
              <span className='input-group-text'>
                <img src={require('../images/user.png')} className='login-img' alt='userImg' />
              </span>
              <input
                type='text'
                className='form-control'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='input-group mb-3'>
              <span className='input-group-text'>
                <img src={require('../images/lock.png')} className='login-img' alt='pwImg' />
              </span>
              <input
                type='password'
                className='form-control'
                name='password'
                placeholder='Password'
                autoComplete='on'
                value={pw.password}
                onChange={handlePasswordChange}
                onBlur={handleCheckPassword}
              />
            </div>
            <p className='invalid-feedback mb-3' style={{ display: errorPassword && 'block' }}>
              Password should be same
            </p>
            <div className='input-group mb-3'>
              <span className='input-group-text'>
                <img src={require('../images/lock.png')} className='login-img' alt='pwImg' />
              </span>
              <input
                type='password'
                className='form-control'
                name='confirmPassword'
                placeholder='Password'
                autoComplete='on'
                value={pw.confirmPassword}
                onChange={handlePasswordChange}
                onBlur={handleCheckPassword}
              />
            </div>
            <div className='invalid-feedback mb-3' style={{ display: errorSubmitMsg && 'block' }}>
              You must fill in all the details before submitting.
            </div>
            <div className='d-flex justify-content-between'>
            <button type='submit' className='btn btn-primary' onClick={(e) => handleSubmit(e)}>
              Register
            </button>
            <button type='button' className='btn btn-primary' onClick={() => navigate(-1)}>
              Go Back
            </button>
          </div>
        </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    registerSuccess: state.isResponseSuccess,
    submitRegister: state.isResponse,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      handleRegister: userRegister,
      updateIsSubmmitedStatus: updateIsSubmitted,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);