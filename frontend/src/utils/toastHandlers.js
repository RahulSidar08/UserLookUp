import { ToastContainer, toast } from 'react-toastify';

export const successHandler = (msg) => {
    toast.success(msg, {
        position: "top-right",
        autoClose: 3000,  // Closes after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
    });
};


export const errorHandler = (msg) => {
    toast.error(msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
    });
};