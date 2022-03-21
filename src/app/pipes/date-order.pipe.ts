import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dateOrder',
    pure: false
})
export class DateOrderPipe implements PipeTransform {

    transform(items: any[], param: string): any {
        if (!items) {
            return [];
        }

        items = items.sort((item1, item2) => {
            if (item1[param] < item2[param]) {
                return 1;
            }

            if (item1[param] > item2[param]) {
                return -1;
            }

            return 0;
        });

        return items;
    }
}
