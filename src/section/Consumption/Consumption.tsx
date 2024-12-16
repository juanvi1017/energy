import React, { FunctionComponent, useState, useContext } from 'react';
import Footer from '../../components/Footer/Footer';
import Alert from '../../components/Alert';
import Paper from '@mui/material/Paper';
import { Grid2, TextField, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { createObject } from '../../server';

import ContextDB from '../../hook/ContextDB';

import './style.css';


const Consumption: FunctionComponent = () => {

    const db: any = useContext(ContextDB);

    const [consumo, setConsumo] = useState('')
    const [observation, setObservation] = useState('')
    const [month, setMonth] = useState(`${new Date().getFullYear()}-${new Date().getMonth() + 1}`)
    const [valueConsumo, setValueConsumo] = useState('')

    const reset = () => {
        setConsumo('');
        setObservation('');
        setMonth(`${new Date().getFullYear()}-${new Date().getMonth() + 1}`);
        setValueConsumo('');
    }


    const handleChange = (event: any) => {
        if (event.target.name === 'consumo') {
            setConsumo(event.target.value)
        } else if (event.target.name === 'valueConsumo') {
            setValueConsumo(event.target.value)
        } else if (event.target.name === 'month') {
            setMonth(event.target.value)
        } else if (event.target.name === 'observation') {
            setObservation(event.target.value)
        }
    }

    const submit = () => {
        let error = false;
        let msg = "";
        if (consumo === '') {
            error = true;
            msg = 'Debe ingresar consumo, recuerde que si su consumo es 0 no debe ingresar el registro de este mes'
        } else if (valueConsumo === '') {
            error = true;
            msg = 'Debe ingresar valor del kWh';
        } else if (month === '') {
            error = true;
            msg = 'Debe ingresar mes';
        }

        if (error) {
            Alert.fire({ icon: 'error', title: msg })
        } else {
            listValidate()
        }
    }

    const listValidate = () => {

        let transaction = db.transaction("consumption").objectStore("consumption");
        let mesIndex = transaction.index("mes_idx");
        let request = mesIndex.get(month);

        request.onsuccess = function() {
            if (request.result !== undefined) {
                Alert.fire({ icon: 'error', title: 'Ya cuenta con un registro del mes y año seleccionado' })
            } else {
                create();
            }
          };
    }

    const create = () => {
        let transaction = db.transaction("consumption", "readwrite");
        let consumption = {
            consumo: parseInt(consumo, 10),
            precio_kwh: parseInt(valueConsumo, 10),
            mes: month,
            observacion: observation,
            created: new Date()
        };
        let request = createObject(transaction, consumption)
        request.onsuccess = function () {
            Alert.fire({ icon: 'success', title: "Consumo agregado" })
            reset();
        };

        request.onerror = function () {
            Alert.fire({ icon: 'error', title: request.error })
        };
    }

    return (
        <div className='card-Consumption'>
            <div className='resumen'>
                <Paper elevation={3} >
                    <div className='information-Consumption'>
                        <form className='form'>
                            <Grid2 container spacing={2} justifyContent='center'>
                                <Grid2 size={{ md: 6, xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        type='number'
                                        size='small'
                                        name='consumo'
                                        required
                                        value={consumo}
                                        onChange={handleChange}
                                        label="Consumo en kWh"
                                    />
                                </Grid2>
                                <Grid2 size={{ md: 6, xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        type='number'
                                        name='valueConsumo'
                                        required
                                        value={valueConsumo}
                                        onChange={handleChange}
                                        label="Valor del kWh"
                                    />
                                </Grid2>
                                <Grid2 size={{ md: 12, xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        type='month'
                                        name='month'
                                        required
                                        value={month}
                                        onChange={handleChange}
                                        label="Ingrese mes"
                                    />
                                </Grid2>
                                <Grid2 size={{ md: 12, xs: 12 }}>
                                    <TextField
                                        multiline
                                        rows={4}
                                        fullWidth
                                        size='small'
                                        name='observation'
                                        value={observation}
                                        onChange={handleChange}
                                        label="Observaciones"
                                    />
                                </Grid2>
                                <Grid2 size={{ md: 12, xs: 12 }}>
                                    <Button
                                        className='buttom-consumption'
                                        startIcon={<CloudUploadIcon />}
                                        variant="contained"
                                        onClick={() => submit()}
                                    >
                                        Agregar
                                    </Button>
                                </Grid2>
                            </Grid2>
                        </form>
                    </div>
                </Paper>
            </div>
            <Footer />
        </div>
    )
}

export default Consumption;