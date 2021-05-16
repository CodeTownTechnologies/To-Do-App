import { crudConstants } from '../constants';
import { apiConfig } from "../../api";

export const crudActions = {    
    _getAll,
    _get,
    _post,
    _put,
    _delete,    
};


function _get(kind, url, id) {
    return dispatch => {        
        dispatch(request());
        apiConfig.get(`${url}/${id}`)
            .then(
                result => {
                    if (result.status === 200) {
                        dispatch(success(result.data))
                    }else{
                        dispatch(failure(result.data))
                    }
                },
                error => {
                    dispatch(failure(error.message));
                }
            );
    };

    function request() { return { type: `${kind}.${crudConstants.GET_REQUEST}` } }
    function success(data) { return { type: `${kind}.${crudConstants.GET_SUCCESS}`, data } }
    function failure(error) { return { type: `${kind}.${crudConstants.GET_FAILURE}`, error } }
}

function _getAll(kind, url, filterData) {
    return dispatch => {        
        dispatch(request());
        apiConfig.get(url, {params:filterData})
            .then(
                result => {
                    if (result.status === 200) {
                        dispatch(success(result.data))
                    }else{
                        dispatch(failure(result.data))
                    }
                },
                error => {
                    dispatch(failure(error.message));
                }
            );
    };

    function request() { return { type: `${kind}.${crudConstants.GET_ALL_REQUEST}` } }
    function success(data) { return { type: `${kind}.${crudConstants.GET_ALL_SUCCESS}`, data } }
    function failure(error) { return { type: `${kind}.${crudConstants.GET_ALL_FAILURE}`, error } }
}

function _post(kind, url, data) {
    return dispatch => {        
        dispatch(request());
        apiConfig.post(url, data)
            .then(
                result => {
                    if (result.status === 200) {                        
                        dispatch(success(result.data))                        
                    }
                    if (result.status === 422) {
                        dispatch(failure(result.data))
                    }
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: `${kind}.${crudConstants.CREATE_REQUEST}` } }
    function success(data) { return { type: `${kind}.${crudConstants.CREATE_SUCCESS}`, data } }
    function failure(error) { return { type: `${kind}.${crudConstants.CREATE_FAILURE}`, error } }
}

function _put(kind, url, id, data) {
    return dispatch => {        
        dispatch(request());
        apiConfig.put(`${url}/${id}`, data)
            .then(
                result => {
                    if (result.status === 200) {                        
                        dispatch(success(result.data))                        
                    }
                    if (result.status === 422) {
                        dispatch(failure(result.data))
                    }
                }, error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: `${kind}.${crudConstants.UPDATE_REQUEST}` } }
    function success(data) { return { type: `${kind}.${crudConstants.UPDATE_SUCCESS}`, data } }
    function failure(error) { return { type: `${kind}.${crudConstants.UPDATE_FAILURE}`, error } }
}

function _delete(kind, url, id) {
    return dispatch => {        
        dispatch(request());
        apiConfig.delete(`${url}/${id}`)
            .then(
                result => {
                    if (result.status === 200) {
                        dispatch(success(result.data))
                    }else{
                        dispatch(failure(result.data))
                    }
                },
                error => {
                    dispatch(failure(error.message));
                }
            );
    };

    function request() { return { type: `${kind}.${crudConstants.DELETE_REQUEST}` } }
    function success(data) { return { type: `${kind}.${crudConstants.DELETE_SUCCESS}`, data } }
    function failure(error) { return { type: `${kind}.${crudConstants.DELETE_FAILURE}`, error } }
}