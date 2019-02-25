export const CALL_API = 'Call API'

function createApiMiddleware(extraArgument) {
    return ({ dispatch, getState }) => next => action => {
        const callAPI = action[CALL_API]
        if (typeof callAPI === 'undefined') {
            return next(action)
        }
        
        let { prom, types } = callAPI;

        if (!Array.isArray(types) || types.length !== 3) {
            throw new Error('Expected an array of three action types.')
        }

        if (!types.every(type => typeof type === 'string')) {
            throw new Error('Expected action types to be strings.')
        }

        const actionWith = data => {
            const finalAction = Object.assign({}, action, data)
            delete finalAction[CALL_API]
            return finalAction
        }

        const [requestType, successType, failureType] = types
        next(actionWith({ type: requestType }))

        prom().then(
            response => next(actionWith({ type: successType, payload: response })),
            error => next(actionWith({ type: failureType, error: error.message || 'Something bad happened' })));      
    };
}

const api = createApiMiddleware();
api.withExtraArgument = createApiMiddleware;

export default api;