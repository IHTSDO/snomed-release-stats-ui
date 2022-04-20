import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dateAggregator'
})
export class DateAggregatorPipe implements PipeTransform {

    transform(items: any[], param: boolean): any {
        if (!items) {
            return [];
        }

        if (!param) {
            return items;
        }

        const newItems: any[] = [];
        const skippedItems: any[] = [];

        items.forEach(item => {
            this.addRow(newItems, skippedItems, item);
        });

        skippedItems.forEach(item => {
            newItems.forEach(existingItem => {
                if (existingItem.effectiveTime === item.effectiveTime) {
                    this.addValues(existingItem, item);
                }
            });
        });

        skippedItems.forEach(item => {
            if (!this.isJanuaryRelease(item.effectiveTime) && !this.isJulyRelease(item.effectiveTime)) {
                const nextRelease = this.findNextRelease(item.effectiveTime);

                newItems.find(existingItem => {
                    if (existingItem.effectiveTime === nextRelease) {
                        this.addValues(existingItem, item);
                    }
                });
            }
        });

        return newItems;
    }

    isJanuaryRelease(input: string): boolean {
        return (input.charAt(5) === '1') && (input.charAt(6) === '3') && (input.charAt(7) === '1');

    }

    isJulyRelease(input: string): boolean {
        return (input.charAt(5) === '7') && (input.charAt(6) === '3') && (input.charAt(7) === '1');
    }

    findNextRelease(input: string): string {
        if (input.charAt(4) === '1') {
            return parseInt(input.substring(0, 4), 10) + 1 + '0131';
        } else {
            if (input.charAt(5) < '7') {
                return parseInt(input.substring(0, 4), 10) + '0731';
            } else {
                return parseInt(input.substring(0, 4), 10) + 1 + '0131';
            }
        }
    }

    addRow(newItems: any[], skippedItems: any[], input: any): void {
        if (this.isJanuaryRelease(input.effectiveTime) || this.isJulyRelease(input.effectiveTime)) {
            if (newItems.find(item => item.effectiveTime === input.effectiveTime)) {
                skippedItems.push(input);
            } else {
                newItems.push(input);
            }
        } else {
            skippedItems.push(input);
        }
    }

    addValues(a: any, b: any): void {
        if (b.conceptsNew) {
            a.conceptsNew = parseInt(a.conceptsNew, 10) + parseInt(b.conceptsNew, 10);
        }

        if (b.conceptsModified) {
            a.conceptsModified = parseInt(a.conceptsModified, 10) + parseInt(b.conceptsModified, 10);
        }

        if (b.descriptionsNew) {
            a.descriptionsNew = parseInt(a.descriptionsNew, 10) + parseInt(b.descriptionsNew, 10);
        }

        if (b.descriptionsModified) {
            a.descriptionsModified = parseInt(a.descriptionsModified, 10) + parseInt(b.descriptionsModified, 10);
        }

        if (b.textDefinitionNew) {
            a.textDefinitionNew = parseInt(a.textDefinitionNew, 10) + parseInt(b.textDefinitionNew, 10);
        }

        if (b.textDefinitionModified) {
            a.textDefinitionModified = parseInt(a.textDefinitionModified, 10) + parseInt(b.textDefinitionModified, 10);
        }

        if (b.languageRefsetNew) {
            a.languageRefsetNew = parseInt(a.languageRefsetNew, 10) + parseInt(b.languageRefsetNew, 10);
        }

        if (b.languageRefsetModified) {
            a.languageRefsetModified = parseInt(a.languageRefsetModified, 10) + parseInt(b.languageRefsetModified, 10);
        }

        if (b.axiomNew) {
            a.axiomNew = parseInt(a.axiomNew, 10) + parseInt(b.axiomNew, 10);
        }

        if (b.axiomModified) {
            a.axiomModified = parseInt(a.axiomModified, 10) + parseInt(b.axiomModified, 10);
        }

        if (b.statedNew) {
            a.statedNew = parseInt(a.statedNew, 10) + parseInt(b.statedNew, 10);
        }

        if (b.statedModified) {
            a.statedModified = parseInt(a.statedModified, 10) + parseInt(b.statedModified, 10);
        }

        if (b.inferredNew) {
            a.inferredNew = parseInt(a.inferredNew, 10) + parseInt(b.inferredNew, 10);
        }

        if (b.inferredModified) {
            a.inferredModified = parseInt(a.inferredModified, 10) + parseInt(b.inferredModified, 10);
        }
    }
}
