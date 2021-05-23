import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { createOffer, offers } from './redux/actions/oferts';

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
    const [sector, setSector] = useState('')
    const [caracterAcademico, setCaracterAcademico] = useState('')
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
        if (!offer?.offers) dispatch(offers())
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            snies !== '' &&
            nombrePrograma !== '' &&
            sector !== '' &&
            caracterAcademico !== '' &&
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
                sector,
                caracterAcademico,
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
        setSector(offer.sector_academico)
        setCaracterAcademico(offer.caracter_academico)
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
            sector !== '' &&
            caracterAcademico !== '' &&
            ubicacion !== '' &&
            acreditado !== '' &&
            jornada !== '' &&
            numeroSemestres !== '' &&
            titulo !== '' &&
            nivelAcademico !== '' &&
            precio !== '' &&
            metodologia !== ''
        ) {
            handleUpdateOferts({ idoffer, ies: user.ies, snies, nombreIes: user.snies, nombrePrograma, sector, caracterAcademico, ubicacion, acreditado, jornada, numeroSemestres, titulo, nivelAcademico, precio, metodologia, user_id: user?.user_id })
        } else {
            alert('Por favor llenar todos los campos')
        }
    }

    const handleSaveOferts = async (
        snies,
        nombrePrograma,
        sector,
        caracterAcademico,
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
                    sector,
                    caracterAcademico,
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
            dispatch(offers())
            if (data.status) triggerForm()
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
            dispatch(offers())
            if (data.status) triggerForm()
        } catch (error) {
            console.log(error)
        }
    }

    const triggerForm = () => {
        setSnies('')
        setNombrePrograma('')
        setSector('')
        setCaracterAcademico('')
        setUbicacion('')
        setAcreditado('')
        setJornada('')
        setNumeroSemestres('')
        setMetodologia('')
        setTitulo('')
        setNivelAcademico('')
        setPrecio('')
    }

    return (
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <div className='col-md-12 mt-4'>
                    {/* <h4 className='text-primary'>Nombre de la IES</h4> */}
                    <h4 className='text-primary'>Bienvenido: <span className='text-dark'>{user?.name}</span></h4>
                    <button className='btn btn-light btn-sm mb-3' onClick={handleSubmit}>Crear Nuevo</button>
                    <button className='btn btn-light btn-sm mb-3' onClick={handleSaveEdit}>Actualizar</button>
                    <table className="table table-hover">
                        <thead className='bg-primary text-light'>
                            <tr className='text-center'>
                                <th scope="col">ID</th>
                                <th scope="col">Codigo SNIES</th>
                                <th scope="col">N. Programa</th>
                                <th scope="col">Título otorgado</th>
                                <th scope="col">Nivel académico</th>
                                <th scope="col">Sector</th>
                                <th scope="col">Carácter Académico</th>
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
                            <TableForm
                                snies={snies}
                                nombrePrograma={nombrePrograma}
                                titulo={titulo}
                                nivelAcademico={nivelAcademico}
                                sector={sector}
                                caracterAcademico={caracterAcademico}
                                ubicacion={ubicacion}
                                acreditado={acreditado}
                                precio={precio}
                                jornada={jornada}
                                numeroSemestres={numeroSemestres}
                                metodologia={metodologia}

                                setSnies={setSnies}
                                setNombrePrograma={setNombrePrograma}
                                setTitulo={setTitulo}
                                setNivelAcademico={setNivelAcademico}
                                setSector={setSector}
                                setCaracterAcademico={setCaracterAcademico}
                                setUbicacion={setUbicacion}
                                setAcreditado={setAcreditado}
                                setPrecio={setPrecio}
                                setJornada={setJornada}
                                setNumeroSemestres={setNumeroSemestres}
                                setMetodologia={setMetodologia}
                                triggerForm={triggerForm}
                            />
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
                                                <td>{item.sector_academico}</td>
                                                <td>{item.caracter_academico}</td>
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
    )
}


const TableForm = ({
    snies,
    nombrePrograma,
    titulo,
    nivelAcademico,
    sector,
    caracterAcademico,
    ubicacion,
    acreditado,
    precio,
    jornada,
    numeroSemestres,
    metodologia,

    setSnies,
    setNombrePrograma,
    setTitulo,
    setNivelAcademico,
    setSector,
    setCaracterAcademico,
    setUbicacion,
    setAcreditado,
    setPrecio,
    setJornada,
    setNumeroSemestres,
    setMetodologia,
    triggerForm,
}) => {
    return (
        <tr className='text-center'>
            <th scope="row">{/* <Input type='text' placeholder='ID' /> */}</th>
            <td><Input type='text' placeholder='Codigo SNIES' onChange={(e) => setSnies(e.target.value)} value={snies} /></td>
            <td><Input type='text' placeholder='Nombre de programa' onChange={(e) => setNombrePrograma(e.target.value)} value={nombrePrograma} /></td>
            <td><Input type='text' placeholder='Título otorgado' onChange={(e) => setTitulo(e.target.value)} value={titulo} /></td>
            <td><Input type='text' placeholder='Nivel académico' onChange={(e) => setNivelAcademico(e.target.value)} value={nivelAcademico} /></td>
            <td><Input type='text' placeholder='Sector' onChange={(e) => setSector(e.target.value)} value={sector} /></td>
            <td><Input type='text' placeholder='Carácter Académico' onChange={(e) => setCaracterAcademico(e.target.value)} value={caracterAcademico} /></td>
            <td><Input type='text' placeholder='Ubicación' onChange={(e) => setUbicacion(e.target.value)} value={ubicacion} /></td>
            <td><Input type='text' placeholder='Acreditado' onChange={(e) => setAcreditado(e.target.value)} value={acreditado} /></td>
            <td><Input type='text' placeholder='Precio' onChange={(e) => setPrecio(e.target.value)} value={precio} /></td>
            <td><Input type='text' placeholder='Jornada' onChange={(e) => setJornada(e.target.value)} value={jornada} /></td>
            <td><Input type='text' placeholder='Número de Semestres' onChange={(e) => setNumeroSemestres(e.target.value)} value={numeroSemestres} /></td>
            <td><Input type='text' placeholder='Metodología' onChange={(e) => setMetodologia(e.target.value)} value={metodologia} /></td>
            <td><button className='btn btn-sm btn-dark' onClick={triggerForm}>Limpiar</button></td>
        </tr>
    )
}