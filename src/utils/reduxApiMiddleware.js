import { normalize } from 'normalizr'
import { camelizeKeys } from 'humps'

export const CALL_API = 'Call API'

function createApiMiddleware(extraArgument) {
    return ({ dispatch, getState }) => next => action => {
        const callAPI = action[CALL_API]
        if (typeof callAPI === 'undefined') {
            return next(action)
        }

        const { prom, promParams, types, schema, apiType, key } = callAPI;

        if (!Array.isArray(types) || types.length !== 3) {
            throw new Error('Expected an array of three action types.')
        }

        if (!types.every(type => typeof type === 'string')) {
            throw new Error('Expected action types to be strings.')
        }

        if (!schema && apiType !== 'command') {
            throw new Error('Specify one of the exported Schemas.');
        }

        if (apiType === 'list' && !key) {
            throw new Error('Expected key parameter for list api call type.');
        }

        const actionWith = data => {
            const finalAction = Object.assign({}, action, data)
            delete finalAction[CALL_API]
            return finalAction
        }

        const [requestType, successType, failureType] = types
        next(actionWith(getRequestTypeData(requestType, callAPI)));

        prom(...Object.values(promParams)).then(
            response => {
                //const json = JSON.stringify(response);                                
                if (apiType === 'command') {
                    next(actionWith(getSuccessTypeData(successType, callAPI, promParams)));
                    const { commandCallback } = callAPI;
                    if (commandCallback){                        
                        dispatch(commandCallback());
                    }
                    
                    return;
                }

                const camelizedJson = camelizeKeys(response);
                let payload = Object.assign({}, normalize(camelizedJson, schema));
                
                return next(actionWith(getSuccessTypeData(successType, callAPI, payload)))
            },
            error => next(actionWith(getFailureTypeData(failureType, callAPI, error.message || 'Something bad happened'))));
    };
}

const getRequestTypeData = (type, callAPI) => {
    const { apiType, key } = callAPI;
    if (apiType === 'list')
        return { type, key };
    return { type, key };
}

const getFailureTypeData = (type, callAPI, error) => {
    const { apiType, key } = callAPI;
    if (apiType === 'list')
        return { type, key, error };
    return { type, key, error };
}

const getSuccessTypeData = (type, callAPI, payload) => {
    const { apiType, key } = callAPI;
    if (apiType === 'list') {
        const { page, pageSize } = callAPI;
        return { type, key, page, pageSize, ...payload };
    }
    return { type, key, ...payload };
}

const api = createApiMiddleware();
api.withExtraArgument = createApiMiddleware;

export default api;