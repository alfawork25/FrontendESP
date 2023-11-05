import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSubject, getSubjects } from "../../../features/Subject/subjectSlice";
import Subjects from "./Subjects";

export const SubjectsContainer = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state.subject);
    
    useEffect(() => {
        dispatch(getSubjects())
    },[])
    
    function deleteSubjectById(id) {
        dispatch(deleteSubject(id));
    }

    return <Subjects state={state} deleteSubjectById={deleteSubjectById} />
}


export default SubjectsContainer;