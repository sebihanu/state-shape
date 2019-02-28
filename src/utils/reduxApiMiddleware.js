import { normalize } from 'normalizr'
import { camelizeKeys } from 'humps'

export const CALL_API = 'Call API'

function createApiMiddleware(extraArgument) {
    return ({ dispatch, getState }) => next => action => {
        const callAPI = action[CALL_API]
        if (typeof callAPI === 'undefined') {
            return next(action)
        }

        const { prom, promParams, types, schema, apiType } = callAPI;

        if (!Array.isArray(types) || types.length !== 3) {
            throw new Error('Expected an array of three action types.')
        }

        if (!types.every(type => typeof type === 'string')) {
            throw new Error('Expected action types to be strings.')
        }

        if (!schema) {
            throw new Error('Specify one of the exported Schemas.');
        }

        const actionWith = data => {
            const finalAction = Object.assign({}, action, data)
            delete finalAction[CALL_API]
            return finalAction
        }

        const [requestType, successType, failureType] = types
        next(actionWith({ type: requestType }))

        prom(...Object.values(promParams)).then(
            response => {
                //const json = JSON.stringify(response);
                const camelizedJson = camelizeKeys(response);
                let payload = Object.assign({}, normalize(camelizedJson, schema));

                if (apiType === 'list') {
                    const { mapIdsKey, page, pageSize } = callAPI;
                    return next(actionWith({ type: successType, mapIdsKey, page, pageSize, ...payload }));
                }

                return next(actionWith({ type: successType, ...payload }))
            },
            error => next(actionWith({ type: failureType, error: error.message || 'Something bad happened' })));
    };
}

const api = createApiMiddleware();
api.withExtraArgument = createApiMiddleware;

export default api;