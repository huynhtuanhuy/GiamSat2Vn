import api from '../api';

export const getDataDaily = () => {
    return api.callApi(`api/dataDaily`, 'GET');
}