import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import './index.css';

const Title = styled.h3`
    background: lightblue;
    width: 30%;
    color: black;
    padding: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
`

export const OrientacionVocacional = () => {
    const [resulText, setResulText] = useState('...')
    useEffect(() => {
        document.body.addEventListener('pbItemEvent', function (e) {
            if (e.detail.data?.resultText) setResulText(e.detail.data?.resultText);
            console.log('*******************', e.detail.data?.resultText);
        });
    }, [setResulText])
    return (
        <div className='container-fluid m-0 p-0'>
            <Title className='text-center'>Orientacion vocacional: {resulText}</Title>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className="playbuzz" data-id="eb5acf2a-19a5-442a-a72c-64d288a8937c"></div>
                </div>
            </div>
        </div>
    )
}
