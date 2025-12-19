import { useEffect, useRef, useState } from "react";

function OtpInputFields() {

    const numberOfFields = 5;
    const [inputArr,setInputArr]=useState(new Array(numberOfFields).fill(""));
    const inputRef = useRef<Array<HTMLInputElement | null>>([]);


    useEffect(() => {
        if (inputRef.current && inputRef.current[0]) {
            inputRef.current[0].focus();
        }
    }, []);

    const handleOnChnage=(e: any,index:number)=>{
        const value = (e.target as HTMLInputElement).value;
       if (isNaN(Number(value))) return;

        const newValue=value.trim();   
        setInputArr((prev)=>{{
            const newInput=[...prev];
            newInput[Number(index)]=newValue;
            return newInput;
        }});
        newValue && inputRef.current[index+1]?.focus();
    }

    const isSubmitDisabled = inputArr.some((input) => input === "");

    const handleSubmitButton=()=>{
        const otp = inputArr.join("");
        console.log("Submitted OTP:", otp);
    }
    const onKeyChange = (e: any, index: number) => {
  e.stopPropagation();

  const value = (e.target as HTMLInputElement).value;
  
  // STOP default arrow key behavior  
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    e.preventDefault();
  }

  // Backspace -> go to previous box if empty
  if (!value && e.key === "Backspace") {
    inputRef.current[index - 1]?.focus();
    return;
  }

  // Arrow Left navigation
  if (e.key === "ArrowLeft") {
    const prev = inputRef.current[index - 1];
    if (prev) {
      prev.focus();
      prev.setSelectionRange(prev.value.length, prev.value.length);
    }
  }

  // Arrow Right navigation
  if (e.key === "ArrowRight") {
    const next = inputRef.current[index + 1];
    if (next) {
      next.focus();
      next.setSelectionRange(next.value.length, next.value.length);
    }
  }
};


   

    return (
        <div className="flex">
        <div className="w-[100dvw] flex items-center justify-center gap-11 ">
            <div className="flex flex-row h-[50px]">
                {inputArr.map((input,index)=>(
                    <input 
                    id={`${index}`} 
                    ref={(input) => (inputRef.current[index] = input)}
                    className="flex w-[50px] h-[50px] border border-black !m-0 text-center" 
                    key={index} 
                    type="text"
                    maxLength={1}
                    value={input}
                    onChange={(e) => handleOnChnage(e, index)}
                    onKeyDown={(e) => onKeyChange(e,index)}
                    />
                 ))}
            
            </div>
            <button type="submit" className="p-1 h-full m-0" disabled={isSubmitDisabled} onClick={handleSubmitButton}>Submit</button>
        </div>
        </div>
  )
}

export default OtpInputFields
