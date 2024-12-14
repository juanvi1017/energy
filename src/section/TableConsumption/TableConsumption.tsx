import { FunctionComponent, useEffect, useContext, useState } from 'react';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Footer from '../../components/Footer/Footer';

import ContextDB from '../../hook/contextDB';

import './style.css';

const TableConsumption: FunctionComponent = () => {

    const db: any = useContext(ContextDB);

    const [data, setData] = useState<any>([])

    const list = () => { // para obtener la ultima key
        const request = db.transaction('consumption')
            .objectStore('consumption')
            .getAll()

        request.onsuccess = () => {
            const cursor = request.result;
            console.log(cursor)
            setData(cursor)
        }
        request.onerror = () => {
            console.error(`Error al obtener los resultados`)
        }
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
                <Paper elevation={3} style={{ height: '100%'}}>
                    <div className='information-Consumption-table'>
                        {data.map((value: any) => (
                            <Card className='card' key={value.id}>
                                <CardContent className='card-content'>
                                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                        {value.mes}
                                    </Typography>
                                    <Typography variant="h6" component="h6">
                                        Consumo: {value.consumo} kwh
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary', mb: 0.5 }}>Precio kWh: {value.precio_kwh} pesos</Typography>
                                    <Typography variant="body2">
                                        {value.observacion}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        className='buttom-table-consumption'
                                        startIcon={<DeleteIcon />}
                                        variant="contained"
                                        onClick={() => deleteValue(value.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </CardActions>
                            </Card>
                        ))}
                    </div>
                </Paper>
            </div>
            <Footer />
        </div>
    )
}

export default TableConsumption;