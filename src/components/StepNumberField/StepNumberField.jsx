import { TextField } from "@mui/material";
import React, { useEffect } from "react";


const StepNumberField = ({state,stepNumberField,checkBlockId,subjectName,isActive,changeStepNumberHandler}) => {



    useEffect(() => {
        if(!state.id) {
            let steps = stepNumberField.split("\n").map(x => x[0]).join(",");
            changeStepNumberHandler({checkBlockId,subjectName,isActive,value:steps})
        }
    },[])
    return (
    <TextField 
        variant={'outlined'}  
        value={(state.stepNumbers.find(z => z.checkBlockId === checkBlockId && z.subjectName === subjectName && z.isActive === isActive) || []).value || undefined} 
        size='small'
        sx={{width:70}}
        inputProps={{style:{fontSize:'11px',padding:5}}}
        onChange={(event) => changeStepNumberHandler({checkBlockId,subjectName,isActive,value:event.target.value})} 
        fullWidth/>
  )
}

export default StepNumberField;