import { Exception } from "../../../client/toteco";

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