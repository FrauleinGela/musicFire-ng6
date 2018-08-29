import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';


@Injectable()
export class CustomValidator {
    // TODO: make an expression more robust to find valid urls
    validateLink(input: FormControl) {
        const isLink = input.value.trim().match(/^(http|https):\/\//);
        return isLink ? null : { invalidLink: true };
    }
}
