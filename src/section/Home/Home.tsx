import { FunctionComponent, useEffect, useState, useContext } from 'react';
import Paper from '@mui/material/Paper';
import BasicEchart from '../../components/Echart';
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

    const [category, setCategory] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [dataEchart, setDataEchart] = useState<number[]>([])
    const [average, setAverage] = useState<number>(0)
    const [payLast, setPayLast] = useState({ 'consumo': 0, 'precio_kwh': 0 })

    const list = () => { // para obtener la ultima key
        setLoading(true)
        const request = db.transaction('consumption')
            .objectStore('consumption')
            .getAllKeys(IDBKeyRange.lowerBound(0, true))

        request.onsuccess = () => {
            const cursor = request.result;
            getValue(cursor[cursor.length - 7])
        }
        request.onerror = () => {
            console.error(`Error al obtener los resultados`)
        }
        setLoading(false)
    }

    const getValue = (key: any) => { // traer los ultimos 6 registros
        if (key) {
            const request = db.transaction('consumption')
                .objectStore('consumption')
                .getAll(IDBKeyRange.lowerBound(key, true), [6])

            request.onsuccess = () => {
                const data = request.result;
                let auxCategory: any[] = []
                let auxEchart: any[] = []
                let sum = 0;
                data.forEach((value: any) => {
                    auxCategory.push(value.mes)
                    auxEchart.push(value.consumo)
                    sum += value.consumo
                });
                setCategory(auxCategory)
                setDataEchart(auxEchart)
                setAverage(sum / data.length)
                setPayLast(data[data.length - 1])
            }
            request.onerror = () => {
                console.error(`Error al obtener los resultados`)
            }
        } else {
            const request = db.transaction('consumption')
                .objectStore('consumption')
                .getAll()

            request.onsuccess = () => {
                const data = request.result;
                let auxCategory: any[] = []
                let auxEchart: any[] = []
                let sum = 0;
                data.forEach((value: any) => {
                    auxCategory.push(value.mes)
                    auxEchart.push(value.consumo)
                    sum += value.consumo
                });
                setCategory(auxCategory)
                setDataEchart(auxEchart)
                setAverage(sum / data.length)
                setPayLast(data[data.length - 1])
            }
            request.onerror = () => {
                console.error(`Error al obtener los resultados`)
            }
        }
    }

    useEffect(() => {
        if (db !== null) {
            list()
        }
    }, [db])

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
                                {(payLast.consumo * 100) / average > 100 && (
                                    <IconButton
                                        size="large"
                                        edge="start"
                                        aria-label="menu"
                                        style={{ color: 'red' }}
                                    >
                                        <ArrowDropUpIcon />
                                        <h6>{Math.round(((payLast.consumo * 100) / average) - 100)}%</h6>
                                    </IconButton>
                                )}
                                {(payLast.consumo * 100) / average < 100 && (
                                    <IconButton
                                        size="large"
                                        edge="start"
                                        aria-label="menu"
                                        style={{ color: 'green' }}
                                    >
                                        <ArrowDropDownIcon />
                                        <h6>{Math.round((payLast.consumo * 100) / average)}%</h6>
                                    </IconButton>
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
                                    <h6>{average} kWh</h6>
                                </IconButton>
                            </div>
                        </div>
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