import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { createOffer, offers } from './redux/actions/oferts';
import Swal from 'sweetalert2'

const Input = styled.input`
  border: none;
  height: 100%;
  min-height: 35px;
  width: 100%;
  margin: 0;
  padding: 0;
  border-radius: 4px;
  text-align: center;
  color: gray;
`;

export const Representate = () => {
    const [idoffer, setIdoffer] = useState(null)
    const [snies, setSnies] = useState('')
    const [titulo, setTitulo] = useState('')
    const [nivelAcademico, setNivelAcademico] = useState('')
    const [precio, setPrecio] = useState('')
    const [nombrePrograma, setNombrePrograma] = useState('')
    const [ubicacion, setUbicacion] = useState('')
    const [acreditado, setAcreditado] = useState('')
    const [jornada, setJornada] = useState('')
    const [numeroSemestres, setNumeroSemestres] = useState('')
    const [metodologia, setMetodologia] = useState('')
    const user = useSelector(state => state.auth)
    const offer = useSelector(state => state.offer)
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('***', offer?.offers)
        if (!offer?.offers) dispatch(offers(user.user_id))
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            snies !== '' &&
            nombrePrograma !== '' &&
            ubicacion !== '' &&
            acreditado !== '' &&
            jornada !== '' &&
            numeroSemestres !== '' &&
            titulo !== '' &&
            nivelAcademico !== '' &&
            precio !== '' &&
            metodologia !== ''
        ) {
            handleSaveOferts(snies,
                nombrePrograma,
                ubicacion,
                acreditado,
                jornada,
                numeroSemestres,
                titulo,
                nivelAcademico,
                precio,
                metodologia)
        } else {
            alert('Por favor llenar todos los campos')
        }

    }

    const handleUpdateOffer = (offer, e) => {
        e.preventDefault();
        setIdoffer(offer.id)
        setSnies(offer.codigo_snies)
        setNombrePrograma(offer.nombre_programa)
        setUbicacion(offer.ubicacion)
        setAcreditado(offer.acreditado)
        setJornada(offer.jornada)
        setNumeroSemestres(offer.numero_semestres)
        setMetodologia(offer.metodologia)
        setTitulo(offer.titulo_otorgado)
        setNivelAcademico(offer.nivel_academico)
        setPrecio(offer.precio)
    }

    const handleSaveEdit = () => {
        if (
            idoffer !== null &&
            snies !== '' &&
            nombrePrograma !== '' &&
            ubicacion !== '' &&
            acreditado !== '' &&
            jornada !== '' &&
            numeroSemestres !== '' &&
            titulo !== '' &&
            nivelAcademico !== '' &&
            precio !== '' &&
            metodologia !== ''
        ) {
            handleUpdateOferts({ idoffer, ies: user.ies, snies, nombreIes: user.snies, nombrePrograma, sector: user.sector, caracterAcademico: user.caracterAcademico, ubicacion, acreditado, jornada, numeroSemestres, titulo, nivelAcademico, precio, metodologia, user_id: user?.user_id })
        } else {
            alert('Por favor llenar todos los campos')
        }
    }

    const handleSaveOferts = async (
        snies,
        nombrePrograma,
        ubicacion,
        acreditado,
        jornada,
        numeroSemestres,
        titulo,
        nivelAcademico,
        precio,
        metodologia
    ) => {
        try {
            const response = await fetch(`/api/save/ofert`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Request-Headers": "*",
                    "Access-Control-Request-Method": "*"
                },
                body: JSON.stringify({
                    user_id: user?.user_id,
                    ies: user?.ies,
                    nombreIes: user.snies,
                    snies,
                    nombrePrograma,
                    sector: user.sector,
                    caracterAcademico: user.caracterAcademico,
                    ubicacion,
                    acreditado,
                    jornada,
                    numeroSemestres,
                    titulo,
                    nivelAcademico,
                    precio,
                    metodologia
                })
            });
            const data = await response.json();
            console.log('******||******', data)
            dispatch(offers(user.user_id))
            if (data.status) triggerForm()
            else {
                Swal.fire({
                    title: 'Upps!',
                    text: data.message,
                    icon: 'error',
                    confirmButtonText: 'Cerrar'
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdateOferts = async (offer) => {
        try {
            const response = await fetch(`/api/update/ofert`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Request-Headers": "*",
                    "Access-Control-Request-Method": "*"
                },
                body: JSON.stringify(offer)
            });
            const data = await response.json();
            console.log('update||******', data)
            dispatch(offers(user.user_id))
            if (data.status) triggerForm()
        } catch (error) {
            console.log(error)
        }
    }

    const triggerForm = () => {
        setSnies('')
        setNombrePrograma('')
        setUbicacion('')
        setAcreditado('')
        setJornada('')
        setNumeroSemestres('')
        setMetodologia('')
        setTitulo('')
        setNivelAcademico('')
        setPrecio('')
    }

    const styleTable = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    const table = {
        overflowX: 'auto',
        display: 'block',
        width: 'max-content'
    }

    return (
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <div className='col-md-12 mt-4'>
                    <h4 className='text-primary'>Bienvenido: <span className='text-dark'>{user?.name}</span></h4>
                    <div className="accordion" id="accordionExample">
                        <div className="card">
                            <div className="card-header" id="headingOne">
                                <h2 className="mb-0">
                                    <button className="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Ingresar oferta
                            </button>
                                </h2>
                            </div>

                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div className="card-body">
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>Codigo SNIES</label>
                                            <input className="form-control" type='number' placeholder='Codigo SNIES' onChange={(e) => setSnies(e.target.value)} value={snies} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Nombre de programa</label>
                                            <input className="form-control" type='text' placeholder='Nombre de programa' onChange={(e) => setNombrePrograma(e.target.value)} value={nombrePrograma} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>Título otorgado</label>
                                            <input className="form-control" type='text' placeholder='Título otorgado' onChange={(e) => setTitulo(e.target.value)} value={titulo} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Nivel académico</label>
                                            <input className="form-control" type='text' placeholder='Nivel académico' onChange={(e) => setNivelAcademico(e.target.value)} value={nivelAcademico} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>Ubicación</label>
                                            <input className="form-control" type='text' placeholder='Ubicación' onChange={(e) => setUbicacion(e.target.value)} value={ubicacion} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Acreditado</label>
                                            <input className="form-control" type='text' placeholder='Acreditado' onChange={(e) => setAcreditado(e.target.value)} value={acreditado} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>Precio</label>
                                            <input className="form-control" type='number' placeholder='Precio' onChange={(e) => setPrecio(e.target.value)} value={precio} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Jornada</label>
                                            <input className="form-control" type='text' placeholder='Jornada' onChange={(e) => setJornada(e.target.value)} value={jornada} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>Número de Semestres</label>
                                            <input className="form-control" type='number' placeholder='Número de Semestres' onChange={(e) => setNumeroSemestres(e.target.value)} value={numeroSemestres} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Metodología</label>
                                            <input className="form-control" type='text' placeholder='Metodología' onChange={(e) => setMetodologia(e.target.value)} value={metodologia} />
                                        </div>
                                    </div>

                                    <div>
                                        <button className='btn btn-success mx-2' onClick={handleSubmit}>Crear Nuevo</button>
                                        <button className='btn btn-primary mx-2' onClick={handleSaveEdit}>Actualizar</button>
                                        <button className='btn btn-dark mx-2' onClick={triggerForm}>Limpiar</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={styleTable}>
                        <table className="table table-hover" style={table}>
                            <thead className='bg-primary text-light'>
                                <tr className='text-center'>
                                    <th scope="col">ID</th>
                                    <th scope="col">Codigo SNIES</th>
                                    <th scope="col">N. Programa</th>
                                    <th scope="col">Título otorgado</th>
                                    <th scope="col">Nivel académico</th>
                                    <th scope="col">Ubicación</th>
                                    <th scope="col">¿Acreditado?</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Jornada</th>
                                    <th scope="col">Num. Semestres</th>
                                    <th scope="col">Metodología</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    offer?.offers
                                        ? offer?.offers.length
                                            ?
                                            offer?.offers.map((item, i) => (
                                                <tr key={i} className='text-center'>
                                                    <th scope="row">{item.id}</th>
                                                    <td>{item.codigo_snies}</td>
                                                    <td>{item.nombre_programa}</td>
                                                    <td>{item.titulo_otorgado}</td>
                                                    <td>{item.nivel_academico}</td>
                                                    <td>{item.ubicacion}</td>
                                                    <td>{item.acreditado}</td>
                                                    <td>{item.precio}</td>
                                                    <td>{item.jornada}</td>
                                                    <td>{item.numero_semestres}</td>
                                                    <td>{item.metodologia}</td>
                                                    <td><button className='btn btn-sm btn-warning' onClick={(e) => handleUpdateOffer(item, e)}>Editar</button></td>
                                                </tr>
                                            ))
                                            : <tr>
                                                <td colSpan={11}>No hay ofertas disponibles</td>
                                            </tr>
                                        : <tr>
                                            <td colSpan={11}>Cargando ofertas</td>
                                        </tr>
                                }
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div >
    )
}
