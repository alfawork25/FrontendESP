import React from "react";
import BlockTechnologist from "./BlockTechnologist";




export default function BlockTechnologistContainer({checks}){

    let blockList = [];
    
    for (const check of checks) {
        for (const subject of  check.subjects) {

            if(subject.value[0].validationCodes.length)
            {
                aggregate(blockList,subject.value[0],subject.subjectName,0);
            }

            if(subject.value[1].validationCodes.length) 
            {
                aggregate(blockList,subject.value[1],subject.subjectName,1);
               
            }
        }

    } 

    function aggregate(blockList,subject,subjectClientType,index) {

        if(blockList.find(x => x.subjectName === subjectClientType)) {
            blockList[blockList.findIndex(x => x.subjectName === subjectClientType)].validationCodes[index].checkCodes.push(...subject.validationCodes.map(x => x.name))
            let prohibitionCodes = subject.update ? subject.validationCodes.map(x => x.newProhibitionCodes).flat().map(x => x.name) : subject.validationCodes.map(x => x.prohibitionCodes).flat().filter(x => x.default).map(x => x.name);
            blockList[blockList.findIndex(x => x.subjectName === subjectClientType)].validationCodes[index].prohibitionCodes.push(...prohibitionCodes)   

        }
        else {
            
            let validationCodes = [{ checkCodes:[],prohibitionCodes:[]},{checkCodes:[],prohibitionCodes:[]}];
            
            validationCodes[index] = {
                checkCodes:subject.validationCodes.map(x => x.name),
                prohibitionCodes:subject.update ? subject.validationCodes.map(x => x.newProhibitionCodes).flat().map(x => x.name) : subject.validationCodes.map(x => x.prohibitionCodes).flat().filter(x => x.default).map(x => x.name)
            }
            
            blockList.push({
                subjectName:subjectClientType,
                validationCodes
                
            })
        }
    }

    return <BlockTechnologist blockList={blockList}/>



    
}




