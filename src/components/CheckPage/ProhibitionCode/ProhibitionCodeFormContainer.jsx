import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProhibitionCode, deleteProhibitionCode, filteProhibitonCodeByCheckCodeName, filteProhibitonCodeByName, getCheckCodesAPI, getProhibitionCodes } from "../../../features/ProhibitionCode/prohibitionCodeSlice";
import ProhibitionCodeForm from "./ProhibitionCodeForm";


const ProhibitionCodeFormContainer = () => {

    const state = useSelector(state => state.prohibitionCode);

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues:{
            name:'',
            checkCodeId:'',
            isActive:'',
            default:false,
            startDate:new Date().toLocaleDateString(),
            endDate:null,
            prohibitionCode:'',
            checkCode:''
        },
        validateOnChange:false
    })

    function sendData() {
        
        const request = {
            ...formik.values
        }
     
        dispatch(addProhibitionCode(request));
    }
   
    function deleteProhibtionCodeHandler(id) {
        dispatch(deleteProhibitionCode(id));
    }
   
    function filter() {

       const { prohibitionCode, checkCode } =  formik.values;


       if(prohibitionCode.length === 0 && checkCode.length === 0) {
            dispatch(getProhibitionCodes());
            return;
       }
      
       if(prohibitionCode) {
            dispatch(filteProhibitonCodeByName(prohibitionCode.toUpperCase()))
       }
  
       if(checkCode) {  
         dispatch(filteProhibitonCodeByCheckCodeName(formik.values.checkCode.toUpperCase()));
       }


    }
    useEffect(() => {
        dispatch(getProhibitionCodes());
        dispatch(getCheckCodesAPI());
    },[]);
 
    return state.isLoading ? <div>Загрузка</div> : <ProhibitionCodeForm state={state} 
                                                    sendData={sendData} 
                                                    filter={filter}
                                                    deleteProhibtionCode={deleteProhibtionCodeHandler}
                                                    formik={formik}/>
}

export default ProhibitionCodeFormContainer;