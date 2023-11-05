import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import { addSubject, getSubjectById, updateSubject } from "../../../features/Subject/subjectSlice";
import SubjectForm from "./SubjectForm";


const SubjectFormContainer = ({edit}) => {

        const dispatch = useDispatch();
        
        const params = useParams();
        
        const state = useSelector(state => state.subject);


        const formik = useFormik({
               initialValues:{
                subject:''
               }
        })
        
        if(edit) {
            formik.initialValues.subject = state.subject;
        }

        function sendData() {
            
            const request = {
                Id:state.id,
                name:formik.values.subject
            }
           
            if(edit) {
                dispatch(updateSubject(request))
            } 
            else {
                dispatch(addSubject(request));
            }
          
        }

        useEffect(() => {

                if(edit) {
                    dispatch(getSubjectById(params.id))
                }
        },[])


        if(state.redirectFlag) {
            return <Navigate to={"/subjects"} />
        }
        return state.isLoading ? (<div>Загрузка</div>) : 
        <SubjectForm state={state} sendData={sendData} formik={formik} />
}

export default SubjectFormContainer;