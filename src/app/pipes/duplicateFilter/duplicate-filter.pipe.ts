import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'duplicateFilter'
})
export class DuplicateFilterPipe implements PipeTransform {

    transform(titles: string[]): string[] {
        if (!titles) {
            return [];
        }

        const slicedTitles = [];

        titles.forEach(title => {
            slicedTitles.push(title.slice(0, title.indexOf('|') + 1));
        });

        return [...new Set(slicedTitles)];
    }
}
