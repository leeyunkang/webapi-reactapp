import React, { useEffect } from 'react'
import "react-datepicker/dist/react-datepicker.css";

const ConfirmationModal = ({ confirmationBox, setConfirmationBox, onSelectConfirm }) => {
  let modalStyle = {
    display:'block',
    background: 'rgba(0,0,0,0.8)'
  }

  const handleSubmit = (e) => {
    onSelectConfirm(true);
    setConfirmationBox('',false);
  }

  useEffect(() => {
  }, [confirmationBox]);

  return (
    confirmationBox.showConfirmationDialog && (
      <div className='modal show fade' style={ modalStyle }>
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Confirmation</h5>
              <button type="button" className='btn-close' onClick={() => setConfirmationBox('',false)} aria-label="Close"></button>
            </div>
            <div className='modal-body'>
              <div className='row g-2 mb-3'>
                <div className='col-md'>
                  <div className='form-floating'>
                    <span>{confirmationBox.message}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button type="button" className='btn btn-secondary' onClick={() => setConfirmationBox('',false)}>Cancel</button>
              <button type="submit" className='btn btn-primary' onClick={(e) => handleSubmit(e)}>Yes</button>
            </div>
          </div>
        </div>
      </div>          
    )
  )
}

export default ConfirmationModal
