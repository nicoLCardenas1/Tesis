import React from 'react'

export const GetHttpRequest = async ({ route, parametro }) => {
    const url = route + parametro;
    try {
        const response = await fetch(`${url}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*"
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
        return [];
    }
}