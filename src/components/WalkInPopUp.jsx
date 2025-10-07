
function WalkInPopUp({open, onClose, children}) {
  return (
    <>
    <div onClick={onClose} className={open? " fixed flex items-center justify-center inset-0 transition-colors bg-black/40 dark:bg-black/80 " : "hidden"}  >
        <div onClick={e => e.stopPropagation()} className={open? "bg-white dark:bg-gray-800 rounded-xl shadow p-6 transition-all scale-100 opacity-100" : "scale-125 opacity-0"} >
            <button onClick={onClose} className="absolute p-1 text-gray-400 bg-white rounded-lg dark:bg-gray-800 top-2 right-2 hover:bg-gray-50 hover:text-gray-600" > X </button>
            {children}
        </div> 
    </div>
    </>
  )
}

export default WalkInPopUp