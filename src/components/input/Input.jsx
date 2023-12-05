import { useRef, useState } from 'react'
import './Input.css'
export default function Input({type,name,setValue,value,label}) { 
    const [active,setActive]=useState(0) 
    const inputRef=useRef(null)
    const AddActive=e=>{
        setActive(1)
        inputRef.current.focus()  
    }
    const removeActive=e=>{  
        if(!e.target.value){
            setActive(0)
        }
    }
    const changeValue = e =>{
        setValue((prevState) => {
            return {...prevState,[e.target.name]:e.target.value}
        } ) 
    }
  return (
    <div className={`input ${active && 'active'}`} onClick={AddActive}>
        <label className='small-text'>{label}*</label>
        <input type={type || 'text'} ref={inputRef} onBlur={removeActive} name={name} value={value} onChange={changeValue} onFocus={AddActive}/>
    </div>
  )
}
