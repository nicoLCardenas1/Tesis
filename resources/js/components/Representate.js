import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { offers } from './redux/actions/oferts';
import Swal from 'sweetalert2'

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
    const [descripcion, setDescripcion] = useState('')
    const [paginaAdmision, setPaginaAdmision] = useState('')
    const [paginaPlan, setPaginaPlan] = useState('')
    const [urlPrograma, setUrlPrograma] = useState('')

    const user = useSelector(state => state.auth)
    const offer = useSelector(state => state.offer)
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('***', user)
        if (!offer?.offers) dispatch(offers(user.user_id))
    }, [user]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (snies) { getDataProgram(snies,user.ies); }
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [snies]);

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
                metodologia,
                descripcion,
                paginaAdmision,
                paginaPlan,
                urlPrograma
            )
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
        setDescripcion(offer.descripcion)
        setPaginaAdmision(offer.pagina_admision)
        setPaginaPlan(offer.pagina_plan)
        setUrlPrograma(offer.urlPrograma)
    }

    const handleDeleteOffer = (id, e, index) => {
        e.preventDefault();

        Swal.fire({
            title: '??Est?? seguro?',
            text: "Esta acci??n no ser?? reversible",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'S??, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/api/offer/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json; charset=utf-8',
                        'Access-Control-Allow-Origin': '*',
                        "Access-Control-Request-Headers": "*",
                        "Access-Control-Request-Method": "*"
                    }
                })
                    .then(data => data.json())
                    .then(data => {
                        if (data) {
                            Swal.fire(
                                'Eliminado',
                                'La oferta fue eliminada con exito.',
                                'success'
                            );
                            dispatch(offers(user.user_id))
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        Swal.fire({
                            title: 'Upps!',
                            text: 'Se ha presentado un error, intente nuevamente',
                            icon: 'error',
                            confirmButtonText: 'Cerrar'
                        });
                    });
            }
        })
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
            handleUpdateOferts({
                idoffer, ies: user.ies, snies, nombreIes: user.snies, nombrePrograma,
                sector: user.sector, caracterAcademico: user.caracterAcademico, ubicacion, acreditado, jornada, numeroSemestres,
                titulo, nivelAcademico, precio, metodologia, user_id: user?.user_id, descripcion, paginaAdmision, paginaPlan, urlPrograma
            })
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
        metodologia,
        descripcion,
        paginaAdmision,
        paginaPlan,
        urlPrograma
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
                    metodologia,
                    descripcion,
                    paginaAdmision,
                    paginaPlan,
                    urlPrograma
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
        setDescripcion('')
        setPaginaAdmision('')
        setPaginaPlan('')
        setUrlPrograma('')
    }

    const getDataProgram = (snies,ies) => {
        Swal.fire('Buscando informaci??n...');
      
        setTimeout(() => {
            fetch(`/api/programa/${ies}?q=${snies}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Request-Headers": "*",
                    "Access-Control-Request-Method": "*"
                }
            })
                .then(data => data.json())
                .then(data => {
                    setTitulo(data.titulo_otorgado ?? "");
                    setPrecio(data.precio ?? "");
                    setNumeroSemestres(data.numero_semestres ?? "");
                    setNombrePrograma(data.nombre_programa ?? "");
                    setNivelAcademico(data.nivel_academico ?? "");
                    setUbicacion(data.municipio ?? "");
                    setMetodologia(data.modalidad ?? "");
                    setAcreditado(data.reconocimiento?? "");

                    if (data.id) {
                        Swal.close();
                    } else {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        });

                        Toast.fire({
                            icon: 'success',
                            title: 'No se ha encontrando informaci??n para este codigo de snies.'
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }, 1000);
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
                                            <input disabled={nombrePrograma} className="form-control" type='text' placeholder='Nombre de programa' onChange={(e) => setNombrePrograma(e.target.value)} value={nombrePrograma} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>T??tulo otorgado</label>
                                            <input disabled={titulo} className="form-control" type='text' placeholder='T??tulo otorgado' onChange={(e) => setTitulo(e.target.value)} value={titulo} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Nivel acad??mico</label>
                                            <input disabled={nivelAcademico} className="form-control" type='text' placeholder='Nivel acad??mico' onChange={(e) => setNivelAcademico(e.target.value)} value={nivelAcademico} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>Ubicaci??n</label>
                                            <input className="form-control" type='text' placeholder='Ubicaci??n' onChange={(e) => setUbicacion(e.target.value)} value={ubicacion} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Acreditado</label>
                                            <input disabled={acreditado} className="form-control" type='text' placeholder='Reconocimiento del ministerio' onChange={(e) => setTitulo(e.target.value)} value={acreditado} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>Precio</label>
                                            <input className="form-control"  placeholder='Precio' onChange={(e) => setPrecio(e.target.value)} value={precio} />
                                        </div>
                                       

                                        <div className="form-group col-md-6">
                                             <label htmlFor="sector">Jornada</label>
                                             <select className="custom-select custom-select-sm" value={jornada ? jornada : 'DEFAULT'} onChange={(e) => setJornada(e.target.value)}>
                                                     <option value="DEFAULT" required disabled>Tipo de jornada</option>
                                                     <option value="Diurna">Diurna</option>
                                                     <option value="Nocturna">Nocturna</option>
                                                     <option value="Completa">??nica</option>
                                             </select>
                                         </div>





                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>N??mero de Semestres</label>
                                            <input className="form-control" type='number' placeholder='N??mero de Semestres' onChange={(e) => setNumeroSemestres(e.target.value)} value={numeroSemestres} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Metodolog??a</label>
                                            <input className="form-control" type='text' placeholder='Metodolog??a' onChange={(e) => setMetodologia(e.target.value)} value={metodologia} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label>Descripci??n programa</label>
                                            <textarea className="form-control" onChange={(e) => setDescripcion(e.target.value)} value={descripcion}></textarea>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>P??gina admisiones</label>
                                            <input className="form-control" type='text' onChange={(e) => setPaginaAdmision(e.target.value)} value={paginaAdmision} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>P??gina plan de estudio</label>
                                            <input className="form-control" type='text' onChange={(e) => setPaginaPlan(e.target.value)} value={paginaPlan} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>url</label>
                                            <input className="form-control" type='text' onChange={(e) => setUrlPrograma(e.target.value)} value={urlPrograma} />
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
                                    <th scope="col">Codigo SNIES</th>
                                    <th scope="col">N. Programa</th>
                                    <th scope="col">T??tulo otorgado</th>
                                    <th scope="col">Nivel acad??mico</th>
                                    <th scope="col">Ubicaci??n</th>
                                    <th scope="col">??Acreditado?</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Jornada</th>
                                    <th scope="col">Num. Semestres</th>
                                    <th scope="col">Metodolog??a</th>
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
                                                    <td>
                                                        <button className='btn btn-sm mx-1 btn-warning' onClick={(e) => handleUpdateOffer(item, e)}>Editar</button>
                                                        <button className='btn btn-sm mx-1 btn-danger' onClick={(e) => handleDeleteOffer(item.id, e, i)}>Eliminar</button>
                                                    </td>
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
