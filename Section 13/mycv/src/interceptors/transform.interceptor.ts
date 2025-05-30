import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseFormat<T> {
    status: number;
    message: string;
    data: T;
}

export function TransformResponse() {
    return UseInterceptors(new TransformInterceptor());
}

export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, handler: CallHandler): Observable<ResponseFormat<any>> {
        return handler.handle().pipe(
            map((response: any) => {

                console.log(response);
                console.log(typeof response);
                
                // If response is already in the correct format, return it
                if (response && 'status' in response && 'message' in response && 'data' in response) {
                    return response;
                }

                // If response is a string, treat it as a message
                if (typeof response === 'string') {
                    return {
                        status: 200,
                        message: response,
                        data: null,
                    };
                }

                // If response is an object with a message property
                if (response && typeof response === 'object' && 'message' in response) {
                    return {
                        status: 200,
                        message: response.message,
                        data: response.user || response.data || null,
                    };
                }

                // if response is a plain object
                if (typeof response === 'object') {
                    return {
                        message: response.message
                    }
                }

                // Default case: treat the entire response as data
                return {
                    status: 200,
                    message: 'Success',
                    data: response,
                };
            }),
        );
    }
} 