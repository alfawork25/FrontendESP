import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {addProcess, downLoadFile, getChecks, getClientTypes, getProcessById, getSubjects, getSystemTypes, setDefaultSubjects, setEditable, updateProcess, updateProhibitionCodes} from "../../features/Process/processSlice";
import ProcessNew from "./ProcessNew";
import { useFormik } from "formik";
import Loader from "../Loader/Loader";





const ProcessNewContainer = () => {

    const state = useSelector(state => state.process);
    const formik = useFormik({
        validateOnChange: false,
        initialValues:{
        name:state.name,
        steps:state.steps || '1.\n2.\n3.\n4.\n5.',
        systemType:state.systemType,
        clientTypeId:state.clientId,
        systemCode:state.systemCode,
        blockTechnologist:state.blockTechnologist,
        },
        enableReinitialize:true
    })
    
    const dispatch = useDispatch();

    const routeQuery = useParams();

    function getChecksHandler(data) {
        dispatch(getChecks(data));
    }

    useEffect(() => {
        dispatch(getSubjects());
        dispatch(getClientTypes());
        dispatch(getSystemTypes());
        if(routeQuery.id) {
            dispatch(getProcessById(routeQuery.id));
        }
    },[])
 
    function setEditableHandler(data) {
        dispatch(setEditable(data))
    }
    

    function setDefaultSubjectsHandler() {
        dispatch(setDefaultSubjects())
    }

    function updateProhibitionCodesHandler(value) {
        dispatch(updateProhibitionCodes(value))
    } 

    
    function downLoad(value) {
        let checks = [];
        for (const iterator of value.checks) {
            let item = {
                id:iterator.id,
                blockName:iterator.block.name,
                complianceCheck:iterator.shortName,
                subjects:iterator.subjects
            }
            checks.push(item);
        }
        const request = { Checks:checks,checkedSubjects:value.checkedSubjects,stepNumbers:state.stepNumbers }
       dispatch(downLoadFile(request));
    
    }
    
    
    
    function sendData(data,processState) {
       let { name,steps,blockTechnologist,systemType,clientTypeId,systemCode, } = formik.values;
       
        let prohibitionCodes = transformedProhibitionCodes(data);
        const request = {
            id:state.id,
            name,
            steps,
            clientTypeId,
            systemCode,
            blockTechnologist,
            systemTypeId:systemType,
            CheckBlockIds:data.map(x => x.id),
            CheckCodeIds:data.map(x => x.checkCodes).flat().map(x => x.id),
        
            SubjectIds:state.subjects.filter(y => data.map(x => x.subjects).flat().find(x => x.subjectName === y.name)).map(x => x.id) ,
            ProhibitionCodeIds:prohibitionCodes,
           
            ProcessSubjectStates:processState,
        }

       

    
        let execute = state.id ? updateProcess : addProcess;
        
        dispatch(execute(request));
        
    }

    function transformedProhibitionCodes(data) {
        let prohibitionCodeIds = [];
        for (const check of data) {
            for (const subject of check.subjects) {
                for (const value of subject.value) {
                    if(value.update) {
                        prohibitionCodeIds.push(...value.validationCodes.map(x => x.newProhibitionCodes).flat());
                    }
                    else {
                        prohibitionCodeIds.push(...value.validationCodes.map(x => x.prohibitionCodes.filter(x => x.default)).flat());
                    }
                }
            }
        }

        return prohibitionCodeIds.map(x => x.id);
    }

  
    return state.isLoading ?  <Loader/> : 
                                <ProcessNew state={state} subjects={state.subjects} clientTypes={state.clientTypes} 
                                makeLoad={downLoad}
                                getChecksHandler={getChecksHandler}
                                setEditableHandler={setEditableHandler}
                                setDefaultSubjectsHandler={setDefaultSubjectsHandler}
                                updateProhibitionCodesHandler={updateProhibitionCodesHandler}
                                formik={formik}
                                sendData={sendData} />
}

export default ProcessNewContainer;