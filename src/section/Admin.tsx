import { FunctionComponent } from 'react';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Background from '../components/Background';
import './style.css';


const Admin: FunctionComponent<{ children: React.ReactNode }> = (
    props
) => {
    const { children } = props;

    return (
        <>
            <Background />
            <div className='container'>
                <NavBar />
                <Header />
                <div className='content'>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Admin;