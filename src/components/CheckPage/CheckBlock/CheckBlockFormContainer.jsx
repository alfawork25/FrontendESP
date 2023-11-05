import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import { addCheckBlock, addSelectedCode, deleteSelectedCode, getCheckBlockById, InitCheckBlock,setSelectedCodes,updateCheckBlock } from "../../../features/CheckBlock/checkBlockSlice";
import CheckBlockForm from "./CheckBlockForm";

const CheckBlockContainerForm = function({edit}) {
   
    const params =  useParams();
    const state = useSelector(state => state.checkBlock)
    
    const dispatch = useDispatch(); 
    useEffect(() => {
       
        dispatch(InitCheckBlock());
        
        if(edit) {
           dispatch(getCheckBlockById(params.id));
        }

   },[])

    const formik = useFormik({
        initialValues:{
            id:0,
            block:'',
            shortName:'',
            sequenceNumber:'',
            subjects:'',
            subjectsToCheckCode:[],
            clientTypes:[],
            code:'',
        }
    });

    if(edit) {
        setValues();
    }

    function addCheckCode(data) {

        let x = state.subjectList.filter(x => formik.values.subjectsToCheckCode.includes(x.id));
        data = {
            ...data,
            subjectsToCheckCode:x
        }
        dispatch(addSelectedCode(data));

    }

    function setSelectedCode(id,value) {

        let x = state.subjectList.filter(x => value.includes(x.id));
        let selectedCodesToUpdate = [...state.selectedCodes];
        let result = selectedCodesToUpdate.map(code => {
            if(code.id === id) {
                return {
                    ...code,
                    subjectsToCheckCode:x
                }
            }
            return code;
        })
        dispatch(setSelectedCodes(result));
    }

    function deleteCheckCode(data) {
        dispatch(deleteSelectedCode(data));
    }

    
    function handleSubjects(event, persons) {
        if(persons.length) {
             formik.setFieldValue('subjects',persons);
        }
    }

    const handleCheckCode = (event) => {

        let value = event.target.value;
        
        formik.setFieldValue('code',value);
        
        if(!value) {
            return;
        }

        addCheckCode(value)
    }
    
    const onDisabled = (selectedCodes,setSelectedCodes,id) => {
        
        if(id){
            selectedCodes[selectedCodes.findIndex(x => x.id === id)].disabled = false;
            setSelectedCodes([...selectedCodes]);
        }
        else {
            setSelectedCodes([...state.selectedCodes.map(x => ({...x,disabled:true}))]);
        }
         
    }

    function setValues() {
        formik.initialValues.id = state.id;
        formik.initialValues.block = state.block;
        formik.initialValues.sequenceNumber = state.sequenceNumber;
        formik.initialValues.shortName = state.shortName;
        formik.initialValues.subjects = state.subjects;
        formik.initialValues.clientTypes = state.clientTypes.map(x => x.id);
    }
  
    function sendData(data) {
        
        const request = {
            id:state.id,
            blockId:data.block,
            shortName:data.shortName,
            sequenceNumber:data.sequenceNumber,
            subjects:data.subjects,
            CheckCodes:state.selectedCodes.map(x=> ({id:x.id,subjectsToCheckCode:x.subjectsToCheckCode})),
            clientTypes:data.clientTypes
        }
 
   
        if(edit) {
            dispatch(updateCheckBlock(request))
        }
        else {
            dispatch(addCheckBlock(request));
        }        
    }


    if(state.redirectFlag) {
        return <Navigate to={"/checkBlocks"}/>
    }

    return state.isLoading ?
    (<div>Загрузка...</div>) :
    ( <CheckBlockForm 
        state={state} 
        sendData={sendData} 
        addCheckCode={addCheckCode} 
        deleteCheckCode={deleteCheckCode} 
        setSelectedCode={setSelectedCode}
        handleSubjects={handleSubjects}
        handleCheckCode={handleCheckCode}
        onDisabled={onDisabled}
        formik={formik}
        />)
}

export default CheckBlockContainerForm;