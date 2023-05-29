class ErrorHandler extends Error {

    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}


export const errorMiddleware = (err,req,res,next)=>{              //error handling middleware

    err.message = err.message || "Internal Sever Error";
    err.statusCode = err.statusCode || 500;

    return res.status(err.statusCode).json({
        success:false,
        message: err.message,
    });

};

export default ErrorHandler;