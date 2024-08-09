import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from "@nestjs/common";

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();

        const exceptionResponse = exception.getResponse() as | string | {
            message: string[]; error:string
        }

        let customResponse:{
            status:boolean,
            message: string | string[]
        };

        if(typeof exceptionResponse === 'string'){
            customResponse = {
                status:false,
                message: exceptionResponse
            }
        } else if(typeof exceptionResponse === 'object') {
            customResponse = {
                status:false,
                message: exceptionResponse.message
            }
        }
        //  else {
        //     customResponse = {
        //         status:false,
        //         message: exceptionResponse.message.join(", ")
        //     }
        // }
        response.status(status).json(customResponse);
    }
}