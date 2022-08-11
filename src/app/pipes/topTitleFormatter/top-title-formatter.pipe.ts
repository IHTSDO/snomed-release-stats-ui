import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'topTitleFormatter'
})
export class TopTitleFormatterPipe implements PipeTransform {

    transform(title: string): string {
        if (!title) {
            return '';
        }

        return title.slice(0, title.indexOf('|'));
    }

}
