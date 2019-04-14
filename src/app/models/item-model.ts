export class ItemModel {
    uniqueId: string;
    name: string;
    fullImage: string;
    stock: string;
    price: string;
    active: false;
    constructor(
        uniqueId: string,
        name: string,
        fullImage: string,
        stock: string,
        price: string,
    ) {
        this.uniqueId = uniqueId;
        this.name = name;
        this.fullImage = fullImage;
        this.stock = stock;
        this.price = price;
        this.active = false;
    }
}
