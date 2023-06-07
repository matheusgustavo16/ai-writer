import { useEffect } from "react"

const Drawer = ({ visible, onHide, children }) => {

    useEffect(()=>{
        visible ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto'
    }, [ visible ])

    return (<>
        {visible && <div className={`fixed w-full h-full left-0 top-0 z-30 bg-black bg-opacity-40 backdrop-blur-md transition duration-300 ease-in-out`}></div>}
        <div className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto shadow-2xl transition-transform ${!visible && `translate-x-full`} bg-white w-80 dark:bg-gray-800`}>
            {children}
        </div>
    </>)
}

export default Drawer