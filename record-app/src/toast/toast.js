import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
const ToastComponent = ({toastOpen, setToastOpen}) => {
    const responseMsg = useSelector((state) => state.toastMsg);
    useEffect(() => {
        setTimeout(() => {
            setToastOpen(false);
            console.log(toastOpen);
        }, 5000);
      }, [toastOpen]);

    return (
        toastOpen && (
            <div className="position-fixed top-0 end-0 p-3">
                <div className="toast align-items-center show" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="1000">
                    <div className="d-flex">
                        <div className="toast-body">
                            {responseMsg}
                        </div>
                        <button type="button" className="btn-close me-2 m-auto"  onClick={() => setToastOpen(false)} aria-label="Close"></button>
                    </div>
                </div>
            </div>
        )
    )
}
export default ToastComponent