import { FunctionComponent} from 'react';
import './style.css';

const Footer: FunctionComponent = () => {

    return (
        <div className='card-footer'>
            <div className='footer'>
                <h2>Supervisión de consumo electrico en hogares</h2>
                <p>Desarrollado con React Js, TypeScript y Material UI, almacenamiento de datos local con IndexedDB que
                    es una base de datos construida dentro del navegador, mucho más potente que localStorage.
                </p>
                <p>Desarrollado y mantenida por Ing. Juan Cáceres.</p>
            </div>
        </div>
    )
}

export default Footer;