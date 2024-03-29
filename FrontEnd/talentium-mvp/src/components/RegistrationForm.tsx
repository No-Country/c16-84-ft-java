import { useForm, SubmitHandler } from 'react-hook-form';import { RegistrationFormProps } from '../interfaces/RegistrationFormTypes';
import { toast } from 'react-toastify';

import useUserServices from '../hooks/useUserServices';

const Specialities = [
    'Plumber',
    'Electrician',
    'Construction_Worker',
    'Painter',
    'Gardener',
    'Gasman',
    'Teacher',
    'Programmer',
    'Designer',
    'Nanny',
];

const RegistrationForm: React.FC<RegistrationFormProps> = ({
    userType,
    user,
}) => {
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
    } = useForm<RegistrationFormProps>();

    const { updateUser } = useUserServices();

    const filterEmptyFields = (data) => {
        const filteredData = {};

        // Iterate through the fields in the data
        for (const key in data) {
            // Check if the field is not empty
            if (data[key] !== '') {
                // Add the non-empty field to the filteredData object
                filteredData[key] = data[key];
            }
        }

        return filteredData;
    };

    const onSubmit: SubmitHandler<RegistrationFormProps> = async (
        updatedUserData
    ) => {
        try {
            const filteredData = filterEmptyFields(updatedUserData);

            console.log('Submitting form for userType:', userType);
            console.log('Updated user data:', filteredData);

            if (user.id && userType) {
                const userUpdated = await updateUser(
                    user.id,
                    userType,
                    filteredData
                );

                if (userUpdated) {
                    console.log(filteredData);

                    toast.success('Perfil actualizado exitosamente');
                } else {
                    toast.error(
                        'Hubo un error al actualizar el perfil. Vuelve a intentarlo.'
                    );
                }
            } else {
                toast.error(
                    'Hubo un error al actualizar el perfil. Vuelve a intentarlo.'
                );
            }
        } catch (error) {
            console.error('Error during profile update:', error);
            toast.error(
                'Ha ocurrido un error inesperado al actualizar el perfil'
            );
        }
    };

    return (
        <div className='flex justify-center items-center w-full p-8'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={`bg-white/45 w-full xl:w-3/4 2xl:w-3/5 rounded-lg shadow-lg grid grid-cols-2 p-8 h-full`}
                style={{ gridTemplateRows: '40px auto 40px' }}
            >
                <h2 className='text-xl font-bold text-center w-full col-span-2'>
                    Perfil &gt; {`${userType}`}
                </h2>

                <div className='col-span-1 p-4 flex flex-col gap-4'>
                    <label className='text-xs font-bold'>
                        Nombre
                        <input
                            {...register('name', {
                                minLength: {
                                    value: 3,
                                    message: 'Debes ingresar mínimo 3 letras',
                                },
                                pattern: {
                                    value: /^[A-Za-z]+$/i,
                                    message: 'Solo puedes ingresar letras',
                                },
                            })}
                            placeholder='Ingrese su nombre'
                            className='text-base w-full rounded-sm outline-none px-2 py-1 mt-1 bg-white/80 font-normal'
                        />
                        {errors.name?.message && (
                            <p
                                role='alert'
                                className='text-red-500 mb-1 col-2 text-center'
                            >
                                {errors.name.message}
                            </p>
                        )}
                    </label>

                    <label className='text-xs w-full font-bold'>
                        Apellido
                        <input
                            {...register('lastname', {
                                minLength: {
                                    value: 3,
                                    message: 'Debes ingresar mínimo 3 letras',
                                },
                                pattern: {
                                    value: /^[A-Za-z]+$/i,
                                    message: 'Solo puedes ingresar letras',
                                },
                            })}
                            placeholder='Ingrese su apellido'
                            className='text-base w-full rounded-sm outline-none px-2 py-1 mt-1 bg-white/80 font-normal'
                        />
                        {errors.lastname?.message && (
                            <p
                                role='alert'
                                className='text-center text-red-500 mb-1'
                            >
                                {errors.lastname.message}
                            </p>
                        )}
                    </label>

                    {userType === 'Cliente' && (
                        <>
                            <label className='text-xs w-full font-bold'>
                                DNI
                                <input
                                    {...register('dni', {
                                        required:
                                            'Debe ingresar su número de DNI',
                                        minLength: {
                                            value: 8,
                                            message:
                                                'Debes ingresar mínimo 8 caracteres',
                                        },
                                    })}
                                    maxLength={9}
                                    placeholder='Ingrese su DNI'
                                    className='text-base w-full rounded-sm outline-none px-2 py-1 mt-1 bg-white/80 font-normal'
                                />
                                {errors.dni?.type === 'required' && (
                                    <p
                                        role='alert'
                                        className='text-center text-red-500 mb-1 w-full'
                                    >
                                        {errors.dni?.message}
                                    </p>
                                )}
                            </label>
                        </>
                    )}

                    <label className='text-xs w-full font-bold'>
                        Email
                        <input
                            {...register('email', {
                                required: 'Debes ingresar un Email válido',
                            })}
                            aria-invalid={errors.email ? 'true' : 'false'}
                            placeholder='ejemplo@mail.com'
                            className='text-base w-full rounded-sm outline-none px-2 py-1 mt-1 bg-white/80 font-normal'
                        />
                        {errors.email?.message && (
                            <p
                                role='alert'
                                className='text-center text-red-500 mb-1'
                            >
                                {errors.email.message}
                            </p>
                        )}
                    </label>

                    <label className='text-xs w-full font-bold'>
                        Contraseña
                        <input
                            {...register('contrasenia', {
                                minLength: {
                                    value: 8,
                                    message:
                                        'La contraseña debe tener al menos 8 caracteres',
                                },
                                pattern: {
                                    value: /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[!@#$%^&()_+])[A-Za-z\d!@#$%^&()_+]+$/,
                                    message:
                                        'La contraseña no cumple con los requisitos de seguridad',
                                },
                            })}
                            placeholder='Ingrese su contraseña'
                            className='text-base w-full rounded-sm outline-none px-2 py-1 mt-1 bg-white/80 font-normal'
                            type='password'
                        />
                        {errors.contrasenia?.message && (
                            <p
                                role='alert'
                                className='text-red-500 mb-1 text-center md:w-96 flex'
                            >
                                {errors.contrasenia.message}
                            </p>
                        )}
                    </label>

                    {userType === 'Profesional' && (
                        <>
                            <label className='text-xs w-full font-bold'>
                                CUIT
                                <input
                                    {...register('cuit', {
                                        required: 'Debes ingresar tu CUIT',
                                        minLength: {
                                            value: 12,
                                            message:
                                                'Debes ingresar mínimo 12 caracteres',
                                        },
                                    })}
                                    maxLength={13}
                                    placeholder='Ingrese su CUIT'
                                    className='text-base w-full rounded-sm outline-none px-2 py-1 mt-1 bg-white/80 font-normal'
                                />
                                {errors.cuit?.type === 'required' && (
                                    <p
                                        role='alert'
                                        className='text-center text-red-500 mb-1 w-full'
                                    >
                                        {errors.cuit?.message}
                                    </p>
                                )}
                            </label>
                        </>
                    )}
                </div>

                <div className='col-span-1 p-4 flex flex-col gap-4'>
                    <label className='text-xs w-full font-bold'>
                        Calle
                        <input
                            {...register('direction.street', {
                                minLength: {
                                    value: 3,
                                    message: 'Debes ingresar mínimo 3 letras',
                                },
                            })}
                            placeholder='Ingrese la calle'
                            className='text-base w-full rounded-sm outline-none px-2 py-1 mt-1 bg-white/80 font-normal'
                        />
                        {errors.direction?.street?.message && (
                            <p
                                role='alert'
                                className='text-red-500 mb-1 col-2 text-center'
                            >
                                {errors.direction.street.message}
                            </p>
                        )}
                    </label>

                    <label className='text-xs w-full font-bold'>
                        Número
                        <input
                            {...register('direction.number', {
                                minLength: {
                                    value: 3,
                                    message:
                                        'Debes ingresar mínimo 3 caracteres',
                                },
                            })}
                            placeholder='Ingrese el número'
                            className='text-base w-full rounded-sm outline-none px-2 py-1 mt-1 bg-white/80 font-normal'
                        />
                        {errors.direction?.number?.message && (
                            <p
                                role='alert'
                                className='text-red-500 mb-1 col-2 text-center'
                            >
                                {errors.direction.number.message}
                            </p>
                        )}
                    </label>

                    <label className='text-xs w-full font-bold'>
                        Provincia
                        <input
                            {...register('direction.province', {
                                minLength: {
                                    value: 3,
                                    message: 'Debes ingresar mínimo 3 letras',
                                },
                            })}
                            placeholder='Ingrese la provincia'
                            className='text-base w-full rounded-sm outline-none px-2 py-1 mt-1 bg-white/80 font-normal'
                        />
                        {errors.direction?.province?.message && (
                            <p
                                role='alert'
                                className='text-red-500 mb-1 col-2 text-center'
                            >
                                {errors.direction.province.message}
                            </p>
                        )}
                    </label>

                    <label className='text-xs w-full font-bold'>
                        Localidad
                        <input
                            {...register('direction.location', {
                                minLength: {
                                    value: 3,
                                    message: 'Debes ingresar mínimo 3 letras',
                                },
                            })}
                            placeholder='Ingrese la localidad'
                            className='text-base w-full rounded-sm outline-none px-2 py-1 mt-1 bg-white/80 font-normal'
                        />
                        {errors.direction?.location?.message && (
                            <p
                                role='alert'
                                className='text-red-500 mb-1 col-2 text-center'
                            >
                                {errors.direction.location.message}
                            </p>
                        )}
                    </label>

                    {userType === 'Profesional' && (
                        <>
                            <label className='text-xs w-full font-bold'>
                                CBU
                                <input
                                    {...register('cbu', {
                                        required: 'Debes ingresar tu CBU',
                                        minLength: {
                                            value: 22,
                                            message:
                                                'Debes ingresar 22 dígitos',
                                        },
                                    })}
                                    aria-invalid={errors.cbu ? 'true' : 'false'}
                                    minLength={22}
                                    maxLength={22}
                                    placeholder='Ingrese su CBU'
                                    className='text-base w-full rounded-sm outline-none px-2 py-1 mt-1 bg-white/80 font-normal'
                                />
                                {errors.cbu?.type === 'required' && (
                                    <p
                                        role='alert'
                                        className='text-center text-red-500 mb-1 w-full'
                                    >
                                        {errors.cbu?.message}
                                    </p>
                                )}
                            </label>

                            <label className='text-xs w-full font-bold'>
                                Especialidad
                                <select
                                    {...register('speciality', {
                                        required:
                                            'Debes elegir una especialidad',
                                    })}
                                    className='text-base w-full rounded-sm outline-none px-2 py-1 mt-1 bg-white/70 font-normal'
                                >
                                    <option value=''>
                                        Seleccione una especialidad
                                    </option>
                                    {Specialities.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                {errors.speciality?.type === 'required' && (
                                    <p
                                        role='alert'
                                        className='text-center text-red-500 mb-1 w-full'
                                    >
                                        {errors.speciality?.message}
                                    </p>
                                )}
                            </label>
                        </>
                    )}
                </div>

                <button
                    type='submit'
                    disabled={isSubmitting}
                    className={`bg-sky-600/90 text-white hover:text-black hover:bg-sky-500/40 shadow-md p-2 h-full rounded-md w-2/4 mx-auto col-span-2`}
                >
                    {isSubmitting ? 'Updating...' : 'Actualizar perfil'}
                </button>
            </form>
        </div>
    );
};

export default RegistrationForm;
