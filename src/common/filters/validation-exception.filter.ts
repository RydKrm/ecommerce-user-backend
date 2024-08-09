import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { Response } from 'express';

interface ValidationErrorResponse {
    message: string | string[];
    error: string;
}

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(ValidationExceptionFilter.name);

    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        // Ensure the response follows the ValidationErrorResponse structure
        const exceptionResponse = exception.getResponse() as ValidationErrorResponse | string;

        const customResponse = this.createCustomResponse(exceptionResponse);

        response.status(status).json(customResponse);
    }

    private createCustomResponse(exceptionResponse: ValidationErrorResponse | string): { status: boolean, message: string } {
        if (typeof exceptionResponse === 'string') {
            return {
                status: false,
                message: exceptionResponse,
            };
        }

        // Handle the case where the message is an array by joining it into a single string
        const message = Array.isArray(exceptionResponse.message)
            ? exceptionResponse.message.join(', ')
            : exceptionResponse.message;

        return {
            status: false,
            message,
        };
    }
}
