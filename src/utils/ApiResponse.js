class ApiResponse{
    constructor(message, statusCode, data = null) {
        this.message = message;
        this.statusCode = statusCode;
        this.success = true;
        this.data = data;
    }
}

export {ApiResponse};