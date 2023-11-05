import React from "react"
import { Route, Routes } from "react-router";
import { NavLink } from "react-router-dom";
import CheckBlockContainerForm  from './CheckBlock/CheckBlockFormContainer'
import CheckCodeFormContainer from './CheckCode/CheckCodeFormContainer'
import BlockFormContainer from './Block/BlockFormContainer'
import SubjectFormContainer from './Subject/SubjectFormContainer'
import ProhibitionCodeFormContainer from "./ProhibitionCode/ProhibitionCodeFormContainer";
import { Stack } from "@mui/system";
import './CheckPage.css'
import CheckCodesContainer from "./CheckCode/CheckCodesContainer";
import CheckBlocksContainer from "./CheckBlock/CheckBlocksContainer";
import SubjectsContainer from "./Subject/SubjectsContainer";
import BlocksContainer from "./Block/BlocksContainer";
import DropDownList from "../Menu/DropDownList";
import { Box } from "@mui/material";
import ProcessesContainer from "../Process/ProcessesContainer";
import ClientTypeFormContainer from "./ClientType/ClientTypeFormContainer";
import SystemTypeFormContainer from "./SystemType/SystemTypeFormContainer";
import SystemBlockFormContainer from "./SystemBlock/SystemBlockFormContainer";
import ClientTypesContainer from "./ClientType/ClientTypesContainer";
import SystemTypesContainer from "./SystemType/SystemTypesContainer";
import SystemBlocksContainer from "./SystemBlock/SystemBlocksContainer";
import RouteFormContainer from "./Route/RouteFormContainer";
import RoutesContainer from "./Route/RoutesContainer";
import ProcessNewContainer from "../Process/ProcessNewContainer";
import PatternContainer from "../Pattern/PatternContainer";
import PatternsContainer from "../Pattern/PatternsContainer";
import StatusContainer from "../Status/StatusContainer";
import StatusesContainer from "../Status/StatusesContainer";
import ModificationContainer from "../Modification/ModificationContainer";
import ProcessOneLevelContainer from "./ProcessOneLevel/ProcessOneLevelContainer";
import ProcessOneLevels from "./ProcessOneLevel/ProcessOneLevels";
import ProcessTwoLevels from "./ProcessTwoLevel/ProcessTwoLevels";
import ProcessTwoLevelContainer from "./ProcessTwoLevel/ProcessTwoLevelContainer";

import ReferenceProcesses from "./ReferenceProcess/ReferenceProcesses";
import ReferenceProcessContainer from "./ReferenceProcess/ReferenceProcessContainer";


 
const CheckPage = function() 
{

 
    return (
        <div>
          <Stack sx={{boxShadow:"0px 0px 5px black",padding:4,display:"flex",alignItems:"center"}} direction={"row"} spacing={9}>
            <Box>
              <NavLink  className={({ isActive }) => "proccesMenuItem" + (isActive ? " proccesMenuItemActive" : "")}  to={"/processes"}>Реестр процессов</NavLink>
            </Box>
             <DropDownList/>
          </Stack>
          <Routes>
            <Route path="/checkBlocks" element={<CheckBlocksContainer/>} />
            <Route path="/checkBlockAdd" element={<CheckBlockContainerForm/>} />
            <Route path="/checkBlockEdit/:id" element={<CheckBlockContainerForm edit={true} />} />
            <Route path="/checkCodes" element={<CheckCodesContainer/>} />
            <Route path="/checkCodeAdd"  element={<CheckCodeFormContainer/>} />
            <Route path="/checkCodeEdit/:id"  element={<CheckCodeFormContainer edit={true}/>} />
            <Route path="/blocks" element={<BlocksContainer/>} />
            <Route path="/blockAdd" element={<BlockFormContainer/>}/>
            <Route path="/blockEdit/:id" element={<BlockFormContainer edit={true} />}/>
            <Route path="/subjects" element={<SubjectsContainer/>} />
            <Route path="/subjectAdd" element={<SubjectFormContainer />} />
            <Route path="/subjectEdit/:id" element={<SubjectFormContainer edit={true} />} />
            <Route path="/prohibitionCodes" element={<ProhibitionCodeFormContainer/> }/>
            <Route path="/clientType" element={<ClientTypeFormContainer/>} />
            <Route path="/clientType/:id" element={<ClientTypeFormContainer/>} />
            <Route path="/clientTypes" element={<ClientTypesContainer/>} />
            <Route path="/systemType" element={<SystemTypeFormContainer/>}/>
            <Route path="/systemType/:id" element={<SystemTypeFormContainer/>}/>
            <Route path="/systemTypes" element={<SystemTypesContainer/>}/>
            <Route path="/systemBlock" element={<SystemBlockFormContainer/>} />
            <Route path="/systemBlock/:id" element={<SystemBlockFormContainer/>} />
            <Route path="/systemBlocks" element={<SystemBlocksContainer/>} />
            <Route path="/route" element={<RouteFormContainer/>} />
            <Route path="/route/:id" element={<RouteFormContainer/>} />
            <Route path="/routes" element={<RoutesContainer/>}/>
            <Route path="/testProcess" element={<ProcessNewContainer/>}/>
            <Route path="testProcess/:id" element={<ProcessNewContainer/>}/>
            <Route path="/processes" element={<ProcessesContainer/>} />
            <Route path="/pattern" element={<PatternContainer/>} />
            <Route path="/pattern/:id" element={<PatternContainer/>} />
            <Route path="/patterns" element={<PatternsContainer/>} />
            <Route path="/status" element={<StatusContainer/>} />
            <Route path="/status/:id" element={<StatusContainer/>} />
            <Route path="/statuses" element={<StatusesContainer/>} />
            <Route path="/modification" element={<ModificationContainer/>} />
            <Route path="/processOneLevel" element={<ProcessOneLevelContainer/>} />
            <Route path="/processOneLevel/:id" element={<ProcessOneLevelContainer/>} />
            <Route path="/processOneLevels" element={<ProcessOneLevels/>} />
            
            <Route path="/processTwoLevel" element={<ProcessTwoLevelContainer/>} />
            <Route path="/processTwoLevel/:id" element={<ProcessTwoLevelContainer/>} />
            <Route path="/processSecondLevels" element={<ProcessTwoLevels/>} />
            <Route path="/referenceProcesses" element={<ReferenceProcesses/>}/> 
            <Route path="/referenceProcess/:id" element={<ReferenceProcessContainer/>}/> 
            <Route path="/referenceProcess" element={<ReferenceProcessContainer/>}/> 
          </Routes>
        </div>
    )
}


export default CheckPage;