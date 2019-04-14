import { ItemModel } from './item-model';

export class BillModel {
    idBill: string;
    active: false;
    itemCount: string;
    // items: ItemModel[];
    totals: string;

    constructor(id: string,
        idBill: string,
        itemCount: string,
        // items: ItemModel[],
        totals: string
    ) {
        this.idBill = idBill;
        this.itemCount = itemCount;
        // this.items = items;
        this.active = false;
        this.totals = totals;
    }
}
