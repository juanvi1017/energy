import React, { FunctionComponent, useEffect, useState, useContext } from 'react';
import Paper from '@mui/material/Paper';
import BasicEchart from '../../components/Echart';
import BasicEchartBar from '../../components/Echart/BasicEchartBar';
import Footer from '../../components/Footer/Footer';
import IconButton from '@mui/material/IconButton';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import luces from '../../assets/luces.jpg';
import electronico from '../../assets/electronico.jpg';
import sol from '../../assets/sol.jpg';
import { green } from '@mui/material/colors';


import ContextDB from '../../hook/ContextDB';

import './style.css';

const listData = [
    {
        id: "rC8K8tzdjac",
        title: "Luces",
        text: 'Apaga las luces cuando no las necesites, como cuando salgas de un lugar o de tu casa.',
        small: luces
    },
    {
        id: "stcl1Pj2WzY",
        title: "Aparatos electronicos",
        text: "Desconecta los aparatos electronicos que no estes utilizando, ejem: Licuadora, televisores.",
        small: electronico
    },
    {
        id: "stcl1Pj2WzYe",
        title: "Luz natural",
        text: "Aprovechar la luz natural y usar la energía eléctrica solo cuando sea necesario, utiliza la luz del sol.",
        small: sol
    }
]


const Home: FunctionComponent = () => {

    const db: any = useContext(ContextDB);

    const [category, setCategory] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [dataEchart, setDataEchart] = useState<number[]>([]);
    const [dataEchartPrice, setDataEchartPrice] = useState<number[]>([]);
    const [average, setAverage] = useState<number>(0);
    const [averagePrice, setAveragePrice] = useState<number[]>([]);
    const [payLast, setPayLast] = useState({ consumo: 0, precio_kwh: 0 });
    const [payBeforeLast, setBeforePayLast] = useState({ consumo: 0, precio_kwh: 0 });

    const list = async () => {
        try {
            setLoading(true);
            const request = db.transaction('consumption')
                .objectStore('consumption')
                .getAllKeys(IDBKeyRange.lowerBound(0, true));

            request.onsuccess = () => {
                const cursor = request.result;
                if (cursor.length > 0) {
                    getValue(cursor[cursor.length - 7]);
                } else {
                    setLoading(false);
                    alert("No tiene consumos ingresados");
                }
            };
            request.onerror = () => {
                console.error('Error al obtener los resultados');
            };
        } catch (error) {
            console.error('Error en la transacción:', error);
            setLoading(false);
        }
    };

    const getValue = async (key: any) => {
        if (key) {
            try {
                const request = db.transaction('consumption')
                    .objectStore('consumption')
                    .getAll(IDBKeyRange.lowerBound(key, true), [6]);

                request.onsuccess = () => {
                    const data = request.result;
                    processResults(data);
                };
                request.onerror = () => {
                    console.error('Error al obtener los resultados');
                };
            } catch (error) {
                console.error('Error en la transacción:', error);
                setLoading(false);
            }
        } else {
            try {
                const request = db.transaction('consumption')
                    .objectStore('consumption')
                    .getAll();

                request.onsuccess = () => {
                    const data = request.result;
                    processResults(data);
                };
                request.onerror = () => {
                    console.error('Error al obtener los resultados');
                };
            } catch (error) {
                console.error('Error en la transacción:', error);
                setLoading(false);
            }
        }
    };

    const processResults = (data: any[]) => {
        let auxCategory: string[] = [];
        let auxEchart: number[] = [];
        let auxEchartPrice: number[] = [];
        let sum = 0;
        let sumPrice = 0;

        data.forEach((value) => {
            auxCategory.push(value.mes);
            auxEchart.push(value.consumo);
            auxEchartPrice.push(value.precio_kwh);
            sum += value.consumo;
            sumPrice += value.precio_kwh;
        });

        const info = sumPrice / data.length;
        const axisLine = new Array(data.length).fill(info);

        setCategory(auxCategory);
        setDataEchart(auxEchart);
        setDataEchartPrice(auxEchartPrice);
        setAverage(sum / data.length);
        setAveragePrice(axisLine);
        setPayLast(data[data.length - 1]);
        if (data.length > 1) {
            setBeforePayLast(data[data.length - 2]);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (db !== null) {
            list();
        }
    }, [db]);

    return (
        !loading && (
            <div className='card-home'>
                <div className='echart'>
                    <Paper elevation={3}>
                        <label className='label-echart'>Consumo energético</label>
                        <BasicEchart category={category} data={dataEchart} />
                    </Paper>
                </div>
                <div className='resumen'>
                    <Paper elevation={3} >
                        <div className='information-home'>
                            <div className='pay'>
                                <p>Último pago</p>
                                <h2>$ {payLast.consumo * payLast.precio_kwh}</h2>
                            </div>
                            <div className='last'>
                                <p>Último consumo</p>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    aria-label="menu"
                                >
                                    <BatteryChargingFullIcon style={{ color: green[500] }} />
                                    <h6>{payLast.consumo}kWh</h6>
                                </IconButton>
                                {payBeforeLast.consumo > 0 && (
                                    <>
                                        {(payLast.consumo * 100) / payBeforeLast.consumo > 100 && (
                                            <IconButton
                                                size="large"
                                                edge="start"
                                                aria-label="menu"
                                                style={{ color: 'red' }}
                                            >
                                                <ArrowDropUpIcon />
                                                <h6>{Math.round(((payLast.consumo * 100) / payBeforeLast.consumo) - 100)}%</h6>
                                            </IconButton>
                                        )}
                                        {(payLast.consumo * 100) / payBeforeLast.consumo < 100 && (
                                            <IconButton
                                                size="large"
                                                edge="start"
                                                aria-label="menu"
                                                style={{ color: 'green' }}
                                            >
                                                <ArrowDropDownIcon />
                                                <h6>{Math.round(100 - ((payLast.consumo * 100) / payBeforeLast.consumo))}%</h6>
                                            </IconButton>
                                        )}
                                    </>
                                )}
                            </div>
                            <div className='average'>
                                <p>Consumo promedio</p>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    aria-label="menu"
                                >
                                    <BatteryChargingFullIcon style={{ color: green[500] }} />
                                    <h6>{Math.round(average)} kWh</h6>
                                </IconButton>
                            </div>
                        </div>
                    </Paper>
                </div>
                <div className='echart2'>
                    <Paper elevation={3}>
                        <label className='label-echart'>Precio KwH</label>
                        <BasicEchartBar category={category} data={dataEchartPrice} average={averagePrice} />
                    </Paper>
                </div>
                <div className='sug'>
                    <h4>Sugerencias para ahorrar energia</h4>
                </div>
                {listData.map((value) => (
                    <div className='recomendation' key={value.id}>
                        <Paper elevation={3} className='recomendation-content' >
                            <h3>{value.title}</h3>
                            <h5>Ahorro energético</h5>
                            <p>{value.text}</p>
                            <img
                                className="card-image"
                                src={value.small}
                                alt={value.id}
                            />
                        </Paper>
                    </div>
                ))}
                <Footer />
            </div>
        )
    )
}

export default Home;