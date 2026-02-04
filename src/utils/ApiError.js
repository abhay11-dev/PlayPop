class ApiError extends Error {
    constructor(message, statusCode, errors = []) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.success = false;
        this.errors = errors
    }   
}
export default ApiError;