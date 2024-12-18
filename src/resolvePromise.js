export function resolvePromise(prms, promiseState) {
    if (!prms) {
        promiseState.promise = null;
        promiseState.data = null;
        promiseState.error = null;
        return;
    }

    promiseState.promise = prms;
    promiseState.data = null;
    promiseState.error = null;

    prms.then(resolvedACB).catch(rejectedACB);

    async function resolvedACB(result) {
        if (promiseState.promise === prms) {
            promiseState.data = result;
        }
    }

    async function rejectedACB(error) {
        if (promiseState.promise === prms) {
            promiseState.error = error;
        }
    }
}
