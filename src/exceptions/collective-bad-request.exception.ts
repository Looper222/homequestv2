import { BadRequestException, HttpException } from "@nestjs/common";

export class CollectiveBadRequestException extends BadRequestException {
    constructor(errors: BadRequestException[]) {
        const collectiveError = [...errors];
        const collectiveMessage: BadRequestException[] = [];
        for (let i = 0; i < collectiveError.length; i++) {
            collectiveMessage.push(collectiveError[i]['response']['message']);
        }
        super(collectiveMessage.toString());
    }
}