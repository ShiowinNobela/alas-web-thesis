

function UserEditPopUp({open,onClose, children}) {

  

  return (
    <>
    <div onClick={onClose} className={open? " fixed flex items-center justify-center inset-0 transition-colors bg-black/20 " : "hidden"}>
        <div onClick={e => e.stopPropagation()} className={open?"flex flex-col w-3xl shadow-2xl bg-white p-10 space-y-3 transition-all scale-100 opacity-100" : "scale-125 opacity-0"}> 
        <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600" > X </button>
        {children}
        </div>
    </div>
    </>
  )
}

export default UserEditPopUp