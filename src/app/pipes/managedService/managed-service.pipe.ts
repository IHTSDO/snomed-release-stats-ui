import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'managedService'
})
export class ManagedServicePipe implements PipeTransform {

    transform(items: any[]): any {
        if (!items) {
            return [];
        }

        items = items.filter(item => {
            if (item.shortName === 'SNOMEDCT') {
                return item;
            } else if (item.maintainerType === 'Managed Service') {
                return item;
            }
        });

        items = items.filter(item => {
            if (item.shortName !== 'SNOMEDCT-US' &&
                item.shortName !== 'SNOMEDCT-AU') {
                return item;
            }
        });

        return items;
    }
}
