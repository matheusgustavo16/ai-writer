import { useEffect } from "react"

const Modal = ({ children, visible, onHide }) => {

    useEffect(()=>{
        visible ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto'
    }, [ visible ])

    return (visible && <>
        <div onClick={onHide} className={`fixed w-full h-full left-0 top-0 z-10 bg-white bg-opacity-50 backdrop-blur-md transition duration-300 ease-in-out`}></div>
        <div className={`fixed z-20 w-full max-w-sm mx-auto text-sm p-5 top-24 rounded-xl inset-x-0 bg-white shadow-lg transition duration-300 ease-in-out`}>
            {children}
        </div>
    </>)
}

export default Modal