import { Method } from 'axios';
import config from '@/config';

export const getLocalStorageToken = () => {
    const token = localStorage.getItem(`${config.APP_NAME}:access`);

    return token ? token : false;
}

export const getLocalStorage = (key: string) => {
    return localStorage.getItem(`${config.APP_NAME}:${key}`) || false
}

export const setLocalStorage = (name: string, token: string) => {
    localStorage.setItem(
        `${config.APP_NAME}:${name}`,
        token
    );
};

export const clearStorage = () => {
    localStorage.clear()
    sessionStorage.clear()
}

    
type APIConfig = {
    [key: string]:
    | { url: string; method: Method } 
    | ((id: any) => { url: string; method: Method }); 
};

export const defineAPIConfig = <T extends APIConfig>(config: T): T => config;

export const tableSettings = {
    onHeaderCell: () => (
        {
            style: {
                backgroundColor: "#ffce08",
                color: "#2f4858",
                fontWeight: 'bold'
            },
        }
    )
}




export const tableTextFormatter = (text: any) => text || "-"
