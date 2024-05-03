import { ToastContainer, toast } from 'react-toastify';

const NotifySuccess = () => {

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            </>
    );
}
export default NotifySuccess;