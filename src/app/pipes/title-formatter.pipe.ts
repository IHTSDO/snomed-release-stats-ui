import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'titleFormatter' })
export class TitleFormatterPipe implements PipeTransform {

    transform(title: string): string {
        if (!title) {
            return '';
        }

        title = title.slice(title.indexOf('|') + 1);
        return title;
    }

}
