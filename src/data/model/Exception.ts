import { Exception } from "../../client";

export class ExceptionData implements Exception {

    constructor(
        public code: number,
        public message: string,
        public errors?: any,
    ) {
        this.code = code
        this.errors = errors
        this.message = message
    }
}