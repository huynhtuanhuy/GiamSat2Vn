import api from '../api';

export const getDataRealTime = () => {
    return api.callApi(`api/dataRealtime`, 'GET');
}