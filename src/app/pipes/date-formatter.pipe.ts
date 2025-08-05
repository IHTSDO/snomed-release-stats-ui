import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateFormatter' })
export class DateFormatterPipe implements PipeTransform {

    transform(title: string): string {
        if (!title) {
            return '';
        }

        title = [title.slice(0, 4), '/', title.slice(4, 6), '/', title.slice(6, 8)].join('');

        return title;
    }
}
