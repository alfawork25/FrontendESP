import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";



export default function BlockTechnologist({formik,blockList}) {

    
    let validationCodes = blockList.map(x => x.validationCodes);
    
    return <div style={{display:'flex'}}>
    <Table style={{border:'1px dashed black',margin:'25px'}} size="small" aria-label="a dense table">
        <TableHead>
            {
                blockList.map(x => (
                <>
                    {x.validationCodes[1].checkCodes.length !== 0 && <TableCell>{x.subjectName} Нет ПИН</TableCell>}
                    {x.validationCodes[0].checkCodes.length !== 0 && <TableCell>{x.subjectName} Есть ПИН</TableCell>}
                </>
                ))
            }
        </TableHead>
        <TableBody>
           <TableRow>
                {
                    validationCodes.map(x => (
                        <>
                            {x[1].checkCodes.length ? <TableCell  style={{wordBreak:'break-word'}}  variant="body">{[...new Set(x[1].checkCodes)].join()}</TableCell> : <TableCell></TableCell>}
                            {x[0].checkCodes.length ? <TableCell style={{wordBreak:'break-word'}}  variant="body">{[...new Set(x[0].checkCodes)].join()}</TableCell> : <TableCell></TableCell>}
                        </>
                    ))
                }
           </TableRow>
           <TableRow>
                {
                    validationCodes.map(x => (
                        <>
                            {x[1].prohibitionCodes.length ? <TableCell style={{wordBreak:'break-word'}}  variant="body">{x[1].prohibitionCodes.join()}</TableCell> : <TableCell></TableCell>}
                            {x[0].prohibitionCodes.length ? <TableCell style={{wordBreak:'break-word'}}  variant="body">{x[0].prohibitionCodes.join()}</TableCell> : <TableCell></TableCell>}
                        </>
                    ))
                }
           </TableRow>
        </TableBody>
    </Table>
    </div>
}