import React, { FunctionComponent, useEffect, useContext, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Footer from '../../components/Footer/Footer';


import ContextDB from '../../hook/ContextDB';

import './style.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const TableConsumption: FunctionComponent = () => {

    const db: any = useContext(ContextDB);

    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(true)

    const list = () => { // para obtener la ultima key
        const request = db.transaction('consumption')
            .objectStore('consumption')
            .getAll()

        request.onsuccess = () => {
            const cursor = request.result;
            setData(cursor)
        }
        request.onerror = () => {
            console.error(`Error al obtener los resultados`)
        }
        setLoading(false)
    }

    const deleteValue = (value: number) => {
        const request = db.transaction("consumption", "readwrite")
            .objectStore('consumption')
            .delete(value)
        request.onsuccess = () => {
            list()
        }
        request.onerror = () => {
            console.error(`Error al obtener los resultados`)
        }
    }

    useEffect(() => {
        if (db !== null) {
            list()
        }
    }, [db])

    return (
        <div className='card-Consumption-table'>
            <div className='resumen-table'>
                <Paper elevation={3} style={{ height: '100%' }}>
                    <div className='information-Consumption-table'>
                        {!loading && (
                            <>
                                <TableContainer component={Paper} style={{ maxWidth: '90vw', minWidth: '350px', maxHeight: '70vh', minHeight: '70vh'}}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Mes</StyledTableCell>
                                                <StyledTableCell>Consumo KwH</StyledTableCell>
                                                <StyledTableCell>Precio KwH</StyledTableCell>
                                                <StyledTableCell></StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data.map((value: any) => (
                                                <TableRow
                                                    key={value.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <StyledTableCell component="th" scope="row">
                                                        {value.mes}
                                                    </StyledTableCell>
                                                    <StyledTableCell component="th" scope="row">
                                                        {value.consumo}
                                                    </StyledTableCell>
                                                    <StyledTableCell component="th" scope="row">
                                                        {value.precio_kwh}
                                                    </StyledTableCell>
                                                    <StyledTableCell component="th" scope="row">
                                                        <Button
                                                            className='buttom-table-consumption'
                                                            startIcon={<DeleteIcon />}
                                                            variant="contained"
                                                            onClick={() => deleteValue(value.id)}
                                                        >
                                                            Eliminar
                                                        </Button>
                                                    </StyledTableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>
                        )}
                    </div>
                </Paper>
            </div>
            <Footer />
        </div>
    )
}

export default TableConsumption;