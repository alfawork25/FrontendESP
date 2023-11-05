import React, {useEffect, useState} from 'react'
import { Alert, Checkbox, Stack, TableContainer, TextField, Typography, styled} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import MultipleSelectUncontrolled from '../MultipleSelect/MultipleSelectUncontrolled';
import { Close } from '@mui/icons-material';
import BasicSelect from '../BasicSelect/BasicSelect';
import BlockTechnologistContainer from '../BlockTechnologist/BlockTechnologistContainer';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router';



const ProcessNew = ({ state,formik,sendData,makeLoad,subjects,setEditableHandler,updateProhibitionCodesHandler,setDefaultSubjectsHandler,clientTypes, getChecksHandler }) => {

    const [alert,setAlert] = useState(false);
    const navigate = useNavigate();
    const getSubjects = (id) => {
     
        if(id) {
            let subjectIds = clientTypes.find(x => x.id === id).subjectTypes.map(x => x.id);
            let checkedSubjects  = [...subjects.map(x => ({...x,clientTypes:[false,false,0]})).filter(x => subjectIds.includes(x.id))];
            return [...checkedSubjects];
        }
        else {
            return [];
        }

    }

    
    const [checkedSubjects, setCheckedSubjects] = useState([])
    
    const handleChangeSubject = (subject, checked) => {
        
        if (checked) {
                setCheckedSubjects([...checkedSubjects, subject])
        } else {
            let copy = [...checkedSubjects]
            copy = copy.filter(x => x.id !== subject.id)
            setCheckedSubjects(copy)
        }
    
    }

    
    const changeCheckedSubjects = (subjects) => {
        setCheckedSubjects([...subjects]);
    }

    const handleChangePin = (checked,index,id) => {
            let updateCheckedSubjects = [...checkedSubjects];
            updateCheckedSubjects[updateCheckedSubjects.findIndex(x => x.id === id)].clientTypes[index] = checked;
            setCheckedSubjects(updateCheckedSubjects);
    
        }
 
   
   
     useEffect(() => {

        if(state.id) {
            
          
            setHidden(false);

            let temp = []
           
            for (const checkedSubject of getSubjects(state.clientId)) {
                
                let z = state.checkedSubjects.filter(x => checkedSubject.id === x.subjectId);
             
                if(z.length > 1) {
                    checkedSubject.clientTypes[0] = true;
                    checkedSubject.clientTypes[1] = true;
                }
                
                else {
                
                    if(z[0]) {
                        let firstElement = z[0];
                        checkedSubject.clientTypes[+firstElement.isNewClient] = true;
                    }
                 
                }

                
                if(z.length !== 0) {
                    temp.push(checkedSubject);
                }
            }
     
            changeCheckedSubjects(temp);

        }
    
    }, [])

    function makeLoadHandler(data) {

        let req = {
            checks:data,
            checkedSubjects
        }
       
        makeLoad(req);

    }

    const handleGet = () => {
       
        const clients = [];

        for (const iterator of checkedSubjects) {
             
            if(iterator.clientTypes[0]) {
                clients.push({subjectId:iterator.id,isNewClient:false})
            }
            if(iterator.clientTypes[1]) {
                clients.push({subjectId:iterator.id,isNewClient:true})
            }
        }
        const request = {
            subjects:[...clients],
            clientType:formik.values.clientTypeId
        }

        getChecksHandler(request);
        setHidden(false);
    }

    function sendDataHandler(data) {

        const processSubjectState = [];

        for (const iterator of checkedSubjects) {
             
            if(iterator.clientTypes[0]) {
                processSubjectState.push({subjectId:iterator.id,isNewClient:false})
            }
            if(iterator.clientTypes[1]) {
                processSubjectState.push({subjectId:iterator.id,isNewClient:true})
            }
        }

    
        sendData(data,[...processSubjectState])
        setAlert(true);
    }
    
    const [hidden, setHidden] = useState(true)

    const reset = () => {
        setHidden(true);

        getChecksHandler([]);
    }
    
    let goToModifications = () => {
        
        let subjects = [];

        
        for (const subject of checkedSubjects) {
            if(subject.clientTypes[1]) {
                subjects.push(`${subject.name} Нет ПИНа`)
            }
            if(subject.clientTypes[0]) {
                subjects.push(`${subject.name} Есть ПИН`)
            }
        }
        let data = {
            id:state.id,
            name:state.name,
            subjects
        }
        localStorage.setItem('data',JSON.stringify(data));
        navigate('/modification');
    }
    
    
    return (
        <div style={{ padding: '15px' }}>
              {
             state.id ?
             <div>
                <div style={{ margin: '17px'}}>
                    <Button sx={{ml:5}} size='small' onClick={goToModifications} variant='outlined'>Доработки</Button>
                </div>
                <Divider/>
            </div> : null }
            <div style={{ margin: '15px',display:'flex' }}>
                <div style={{display:'flex',flexDirection:'column' }}>
                  <TextField  {...formik.getFieldProps("name")} disabled style={ { width: '500px'} } inputProps={{style:{fontSize:"15px"},maxLength: 150}} size='small' multiline  rows={3} label={'Наименование'} variant={'standard'} />
                </div>
            </div>
            
            <div style={{ margin: '17px' }}>

                <Stack direction={'row'} spacing={5}>
                    <BasicSelect {...formik.getFieldProps("systemType")}  minWidth={200} maxWidth={300} items={state.systemTypes}  label='Тип системы'/>
                    <TextField  size='small'  {...formik.getFieldProps("systemCode")} disabled  items={state.systemBlocks} label='Код процесса' />
                </Stack>
            </div>
            <div style={{ margin: '15px' }}>
                <div style={{ display: 'flex' }}>
                    <div style={ { display: 'flex', flexDirection: 'column' } }>
                        <TextField size='small' {...formik.getFieldProps("clientTypeId")}  style={ { width: '297px', marginBottom: '15px' } } fullWidth select variant={'outlined'} label={'Тип клиента процесса'}>
                            {
                                clientTypes.map(x => <MenuItem key={x.id} value={x.id}>{x.code}-{x.name}</MenuItem> )
                            }
                        </TextField>
                        <div style={{ width:'500px' }}>
                            <Typography variant={'h7'}>Субъекты</Typography>
                            { 
                             getSubjects({...formik.getFieldProps("clientTypeId")}.value).length > 0 ?
                             getSubjects({...formik.getFieldProps("clientTypeId")}.value).map(x => <div key={x.id} style={{ display: 'flex', alignItems: 'center' }}>
                             <Checkbox size='small' checked={checkedSubjects.some(z => z.id === x.id)} onChange={event => handleChangeSubject(x, event.target.checked)}/>
                             <Typography width={70}  variant='21' fontSize={'small'} >{x.name}</Typography>
                             {
                                checkedSubjects.map(z => {
                                    if(z.id === x.id) {
                                        return (
                                            <div key={z.id} style={{ display:'flex',justifyContent:'center' }}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Checkbox size='small' checked={z.clientTypes[1]} onChange={event =>  handleChangePin(event.target.checked,1,z.id)}/>
                                                    <Typography variant='h9'>Нет ПИНа</Typography>
                                                </div>
                                                 <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Checkbox size='small' checked={z.clientTypes[0]} onChange={event =>  handleChangePin(event.target.checked,0,z.id)}/>
                                                    <Typography variant='h9' >Есть ПИН</Typography>
                                                </div>
                                                
                                            </div>
                                        )
                                    }
                                    return null
                                })
                             }
                            </div>) : 
                            <Typography>Не выбран тип клиента</Typography> }
                        </div>
                        <Divider/>
                    </div>
                </div>
                {
                    hidden &&
                        <Button onClick={() => handleGet()} variant={'contained'} color={'primary'}>Извлечь</Button>
                }<div style={{display:'flex', justifyContent:'flex-end', margin:'10px'}}>
                { alert ? 
                <Alert severity="success"  style={{width:'500px'}} 
                    action={
                        <ClearIcon
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setAlert(false)
                            }}
                        ></ClearIcon>
                    }>
                Процесс успешно сохранен</Alert> : null}</div>
                
                { !hidden && <>
                <ProcessTable
                
                        stepNumberField={formik.values.steps} 
                        reset={reset} makeLoadHandler={makeLoadHandler} 
                        sendDataHandler={sendDataHandler} 
                        updateProhibitionCodesHandler={updateProhibitionCodesHandler} 
                        checks={state.checks} setEditableHandler={setEditableHandler} 
                        setDefaultSubjectsHandler={setDefaultSubjectsHandler}
                        handleGet={handleGet} 
                        checkedSubjects={checkedSubjects} /> 
                <BlockTechnologistContainer checks={state.checks}  />
                    <div>
                        <div>
                            <label>Блок технологов</label>
                        </div>
                       
                        <TextField  style={ { width: '500px' }} {...formik.getFieldProps("blockTechnologist")} inputProps={{style:{fontSize:"15px"}}} size='small' multiline  rows={5}  variant={'outlined'}/>
                    </div>
                </> }
            </div>
        </div>
    )
}


const ProcessTable = ({checks, sendDataHandler,reset,makeLoadHandler, checkedSubjects,updateProhibitionCodesHandler,handleGet,setEditableHandler,setDefaultSubjectsHandler  }) => {

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: '#000010',
          color: 'rgb(255,255,255)',
          boxShadow: '1px 1px 4px black',
          border: '1px solid black',
        }
    }));


    const StyleTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.selected,
        },
        // hide last border
        '&td, &th': {
          border: 'none',
        },
    }));
   
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '15px' }}>
            <Button style={{ marginLeft: '20px' }} onClick={() => makeLoadHandler(checks)} variant={'contained'} size='small' color={'primary'}>Скачать в Excel</Button>
                <Button  style={{ marginLeft: '15px' }} variant={'outlined'} onClick={reset}  size='small' color={'primary'}>Сброс</Button>
                <Button style={{ marginLeft: '20px' }} onClick={() => handleGet()} variant={'contained'} size='small' color={'primary'}>Обновить</Button>
                <Button style={{ marginLeft: '15px' }} variant={'contained'} onClick={() => sendDataHandler(checks)} size='small' color={'primary'}>Сохранить</Button>
            </div>
            <TableContainer sx={{ width: '100%', overflow: 'auto', maxHeight:(770-109) }}>
            <Table onDoubleClickCapture={() => setDefaultSubjectsHandler()} stickyHeader size='small' aria-label="sticky table"  >
                <TableHead>
                    <StyledTableCell width={150}>Блок проверки</StyledTableCell>
                    <StyledTableCell width={150}>Комплаенс-проверка</StyledTableCell>
                    <StyledTableCell width={150}>Параметры</StyledTableCell>
                    { checkedSubjects.map(x =>
                    <>   
                        {x.clientTypes[1] && <StyledTableCell width={300}><div>{x.name}</div> (Нет ПИН)</StyledTableCell>}
                        {x.clientTypes[0] && <StyledTableCell width={300}><div>{x.name}</div> (Есть ПИН)</StyledTableCell>}
                    </>
                     
                    )}
                </TableHead>
                <TableBody>{
                        checks.map(x => (
                        <>
                        <StyleTableRow key={x.id}>
                                <TableCell>{x.block.name}</TableCell>
                                <TableCell><strong>{x.shortName}</strong></TableCell>
                                <TableCell>Код проверки</TableCell>
                                {    
                                    x.subjects.map(y =>  <>
                                    {(y.value[1].validationCodes.length !== 0) ?
                                        <TableCell width={300}>
                                            {y.value[1].validationCodes.map(x => x.name).join()}
                                        </TableCell> : 
                                        
                                        (checkedSubjects.filter(s => s.name === y.subjectName && s.clientTypes[1]).length !== 0) ?
                                        <TableCell width={300}><Close color='error'/></TableCell> 
                                        : null
                                    } 
                                        {(y.value[0].validationCodes.length !== 0) ?
                                        <TableCell width={300}>
                                            {y.value[0].validationCodes.map(x => x.name).join()}
                                        </TableCell> : 
                                        (checkedSubjects.filter(s => s.name === y.subjectName && s.clientTypes[0]).length !== 0) ?
                                        <TableCell width={300}><Close color='error'/></TableCell> 
                                        : null
                                        }
                                        
                                    </>)

                                }
                            </StyleTableRow>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>Коды запретов</TableCell>
                                  {
                                    x.subjects.map(y =>  <>
                                    {(y.value[1].validationCodes.length !== 0) ?
                                        <TableCell onClickCapture={() => setEditableHandler({id:x.id,name:y.subjectName,index:1,editable:true})} width={300}>
                                            {y.value[1].editable ? 
                                            <MultipleSelectUncontrolled 
                                                                width={110} 
                                                                items={y.value[1].validationCodes.map(x => x.prohibitionCodes).flat()} 
                                                                value={y.value[1].validationCodes.map(x => x.newProhibitionCodes.map(x => x.name)).flat().length ?
                                                                y.value[1].validationCodes.map(x => x.newProhibitionCodes).flat() : y.value[1].validationCodes.map(x => x.prohibitionCodes.filter(x => x.default)).flat()} 
                                                                onChanged={(value) => updateProhibitionCodesHandler({id:x.id,name:y.subjectName,index:1,value})} 
                                                                name='Коды запрета' size='small' />
                                            
                                                : !y.value[1].update ? 
                                                y.value[1].validationCodes.map(x => x.prohibitionCodes.filter(x => x.default).map(x => x.name).join()).join() 
                                                : y.value[1].validationCodes.map(x => x.newProhibitionCodes.map(x => x.name).join()).join() }
                                        </TableCell> : 
                                        (checkedSubjects.filter(s => s.name === y.subjectName && s.clientTypes[1]).length !== 0) ?
                                        <TableCell width={300}>
                                            {y.value[1].validationCodes.length ? y.value[1].validationCodes.map(x => x.prohibitionCodes.filter(x => x.default).map(x => x.name).join()).join() : '' }
                                        </TableCell> : null
                                    } 
                                       {(y.value[0].validationCodes.length !== 0) ?
                                        <TableCell onClickCapture={() => setEditableHandler({id:x.id,name:y.subjectName,index:0,editable:true})} width={300}>
                                            {y.value[0].editable ? 
                                            <MultipleSelectUncontrolled 
                                                                width={110} 
                                                                height={490}
                                                                items={y.value[0].validationCodes.map(x => x.prohibitionCodes).flat()} 
                                                                value={y.value[0].validationCodes.map(x => x.newProhibitionCodes.map(x => x.name)).flat().length ?
                                                                y.value[0].validationCodes.map(x => x.newProhibitionCodes).flat(): y.value[0].validationCodes.map(x => x.prohibitionCodes.filter(x => x.default)).flat()} 
                                                                onChanged={(value) => updateProhibitionCodesHandler({id:x.id,name:y.subjectName,index:0,value})} 
                                                                name='Коды запрета' size='small' /> :   
                                            !y.value[0].update ? 
                                               y.value[0].validationCodes.map(x => x.prohibitionCodes.filter(x => x.default).map(x => x.name).join()).join() 
                                        : y.value[0].validationCodes.map(x => x.newProhibitionCodes.map(x => x.name).join()).join() }
                                        </TableCell> 
                                        : 
                                        (checkedSubjects.filter(s => s.name === y.subjectName && s.clientTypes[0]).length !== 0) ?
                                        <TableCell width={300}>
                                            {y.value[0].validationCodes.length ? y.value[0].validationCodes.map(x => x.prohibitionCodes.filter(x => x.default).map(x => x.name).join()).join() : '' }
                                        </TableCell> : null

                                        }
                                        
                                    </>)
                                  }  
                            </TableRow>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>Маршрут</TableCell>
                                {
                                    x.subjects.map(y =>  <>
                                     {
                                            (y.value[1].validationCodes.length !== 0) ?
                                                <TableCell width={300}>
                                                {y.value[1].validationCodes.some(z => z.prohibitionCodes.length !== 0) ? 
                                                     (y.value[1].validationCodes.map(z => z.newProhibitionCodes).flat().length !== 0) ?
                                                      y.value[1].validationCodes.map(z => z.newProhibitionCodes.map(s => `${s.name}-${s.routes.map(v => v.code).join()}`)).join(): y.value[1].validationCodes.map(z => z.prohibitionCodes.filter(x => x.default).map(s => `${s.name}-${s.routes.map(v => v.code).join()}` ).join())   
                                                    
                                                : y.value[1].validationCodes.map(z => z.routes.map(h => h.code)).join()}
                                                </TableCell>  : 
                                            (checkedSubjects.filter(s => s.name === y.subjectName && s.clientTypes[1]).length !== 0) ?
                                            <TableCell width={300}>
                                                {y.value[1].validationCodes.length ? y.value[1].validationCodes.map(x => x.prohibitionCodes.map(x => x.name).join()).join() : '' }
                                            </TableCell> : null
                                    }
                                        {
                                            (y.value[0].validationCodes.length !== 0) ?
                                            <TableCell width={300}>
                                                {y.value[0].validationCodes.some(z => z.prohibitionCodes.length !== 0) ? 
                                                (y.value[0].validationCodes.map(z => z.newProhibitionCodes).flat().length !== 0) ? 
                                                     y.value[0].validationCodes.map(z => z.newProhibitionCodes.map(s => `${s.name}-${s.routes.map(v => v.code).join()}`)).join() 
                                                     : y.value[0].validationCodes.map(z => z.prohibitionCodes.filter(x => x.default).map(s => `${s.name}-${s.routes.map(v => v.code).join()}` ).join())   
                                                :  y.value[0].validationCodes.map(z => z.routes.map(h => h.code)).join()}
                                            </TableCell> : 
                                            (checkedSubjects.filter(s => s.name === y.subjectName && s.clientTypes[0]).length !== 0) ?
                                            <TableCell width={300}>
                                                {y.value[0].validationCodes.length ? y.value[0].validationCodes.map(x => x.prohibitionCodes.filter(x => x.default).map(x => x.name).join()).join() : '' }
                                            </TableCell> : null
                                        }
                                       
                                </>)
                                }
                            </TableRow>

                        </>
                        ))
                    }
                    
                </TableBody>
            </Table>
            </TableContainer>
        
        </div>
    )
}

export default ProcessNew;