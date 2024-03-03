import React, { useState } from 'react';
import { Order, CreateOrdersProps } from '../interfaces/OrdersProps';
import { useNavigate } from 'react-router-dom';
import CustomButton from './CustomButton';
import { FaArrowLeft } from 'react-icons/fa';

const CreateOrdersClient: React.FC<CreateOrdersProps> = ({ cliente }) => {
    const navigate = useNavigate();

    const [orden, setOrden] = useState<Order>({
        description: "nueva orden test",
        cliente_id: cliente.clienteId,
        date: '03/03/2024',
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setOrden({ ...orden, description: e.target.value });
    };

    const handleSubmit = () => {
        console.log('Orden:', orden);
    };

    const handleback = () => {
        navigate('/DashboardCliente');
    };

    return (
        <div className='flex flex-col items-center justify-center gap-4 p-4'>
            <div className='flex'>
                <CustomButton
                    onClick={handleback}
                    customClass={
                        'z-50 absolute top-20 left-96 md:left-64 xl:left-72 w-24 text-white text-md md:text-xl font-bold cursor-pointer '
                    }
                >
                    <FaArrowLeft className='h-10 w-10 p-2' />
                    atrás
                </CustomButton>
            </div>
            <div>
            <textarea className='flex flex-col rounded-md bg-royal-blue-100/50 shadow-md '
                name="descripcion"
                placeholder="Escribe la descripción de la orden aquí..."
                cols={30}
                rows={8}
                value={orden.description}
                onChange={handleChange}
            />
            </div>
            <div>
                <CustomButton
                        onClick={handleSubmit}
                        customClass='flex align-center justify-center bg-royal-blue-600 lg:bg-royal-blue-500 rounded-md shadow-md p-2'
                    >
                        Crear Orden
                    </CustomButton>
            </div>
        </div>
    );
};

export default CreateOrdersClient;