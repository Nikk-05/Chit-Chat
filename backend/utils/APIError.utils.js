class APIError extends Error {
    constructor(message, statusCode, errors, stack) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.errors = errors;
        this.success = false

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}
export {APIError}