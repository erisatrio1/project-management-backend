export const baseResponse = (code, mesaage = '', data = '') => {
    return {
        code: code,
        message: mesaage,
        results: data,
    }
}

export const dbResult = (result, error) => ({
    data: result,
    error: error
})
