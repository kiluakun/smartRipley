import { Component } from '@angular/core';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { ApiConnectionService, StoreProduct, ProductStock } from '../services/api-connection.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  qrData: string = null;
  createdCode: string = null;
  scannedCode: string = null;
  status:string = 'Acercate a un producto y agregalo a tu bolsa';
  scannedProduct = {};
  private queriedProductStock: ProductStock;
  public currentProduct: StoreProduct;
  itemsOnBag: number = 0;
  apiObject: BagProduct;
  stepOne: boolean = true;
  stepTwo: boolean = false;
  stepThree: boolean = false;
  stepFour: boolean = false;
  currentPrice: number = 0;

  carritoFake: StoreProduct[];

  dummyData: QrDataViewModel = {
    'label': 'BOTIN 16 HRS M130 NG NEGRO 39', 
    'sku': '2000371747984'
  }

  constructor(
    private barcodeScanner: BarcodeScanner,
    private qrCodeModule: NgxQRCodeModule,
    private ripleyService: ApiConnectionService
  ){}

  ngOnInit(){
    this.qrData = JSON.stringify(this.dummyData);
  }

  createCode(){
    this.createdCode = this.qrData;

    // this.ripleyService.getStockAvailability('2000371747984')
    //   .subscribe((product : ProductStock)=>{
    //     this.queriedProductStock = product;
    //     console.log(this.queriedProductStock);
    //   });
    let stock = {
      "codigoSucursal": "10012",
      "descripcionSucursal": "Parque Arauco",
      "sku": "2000371747984",
      "descripcionSku": "BOTIN 16 HRS M130 NG NEGRO 39",
      "stockDisponible": 1,
      "stockReservadoInt": 0,
      "semanaAntiguedad": 3
    }
    this.queriedProductStock = new ProductStock(stock);
  }

  scanCode(){
    this.status = 'entro a scan';
    this.barcodeScanner.scan().then(barcodeData => {

      //this.status = 'ya scaneo codigo';

      let scannedObject: QrDataViewModel = (JSON.parse((JSON.stringify(barcodeData.text))) as QrDataViewModel);
      this.scannedCode = scannedObject.label;
      
      //this.status = 'proceso la data';


      if(this.queriedProductStock.stockDisponible > 0){
        //this.status = 'stock no es 0 ' + this.queriedProductStock.stockDisponible;

        this.stepOne = false;
        this.stepTwo = true;

      // this.scannedProduct = this.ripleyService.getProductData(scannedObject.sku);


        //display item
        let currentProductBeta =  {
          "sucursal": "12",
          "filler": "T",
          "ean13": "2000371747984",
          "descripcion": "BOTIN 16 HRS M130 NG NEGRO 39",
          "division": "0009",
          "area": "0024",
          "depto": "000355",
          "linea": "503122",
          "subLinea": "00526007",
          "evento": "000002430509",
          "prioridad": "01",
          "subPrioridad": "00",
          "precioVigente": "0000000110",
          "ean13Estilo": "00000000000000",
          "tipoArticulo": "00",
          "tipoPropiedad": "00",
          "tipoServicio": "00",
          "indicadores": "0000",
          "numComponentes": "00",
          "lista": "0001",
          "precioMaster": "0000000110",
          "ean13Proveedor": null,
          "procedencia": null,
          "ranPrecio": null,
          "razSocPrvAnt": null,
          "razSocPrvAct": null,
          "temporada": null,
          "marcaPrd": null,
          "marcaPropia": null,
          "marcaPrv": null,
          "concesion": null,
          "fleteDbo": null,
          "tapiceria": null,
          "cicloVida": null,
          "industrializado": null,
          "oreDespachoBt": null,
          "prdInternet": null,
          "tipNegociacion": null,
          "diferenciable": null,
          "revista": null
        }

        this.currentProduct = new StoreProduct(currentProductBeta);
        this.currentPrice = Number(this.currentProduct.precioVigente);

        //this.status = this.currentProduct.descripcion + ' y tiene un precio: ' + this.currentProduct.precioVigente;
      }
      else{
        // display error
        this.status = 'stock es 0 ' + this.queriedProductStock.stockDisponible;

      }
      
    })
  }

  addToBag(){
    this.status = 'entro a addtobag';
    let productToAdd = new StoreProduct(this.currentProduct);
    this.carritoFake.push(productToAdd);

    this.stepOne = true;
    this.stepTwo = false;

    this.status = 'cambio asignaciones';
  }

  payment(){
    //consumir servicio que paga, el cual retorna un qr, que debe ser mostrado en pantalla
  }

  removeFromBag(index){
    this.carritoFake.splice(index, 1);
  }
}

export interface QrDataViewModel{
  sku: string;
  label: string;
}

export interface Prices {
  offerPrice: number;
  listPrice: number;
  discount: number;
  discountPercentage: number;
  ripleyPuntos: number;
  $$cache: {
    cached: boolean;
    created: number;
  },
  formattedOfferPrice: string;
  formattedListPrice: string;
  formattedDiscount: string;
}

export interface Items {
  quantity: number;
  orderItemId: number;
  product: {
    partNumber: number;
    name: string;
    thumbnail: string; //home.ripley.cl/store/Attachment/WOP/D317/2000373030879/2000373030879_2.jpg,
    prices: Prices;
    selectedOptions: string[];
    url: string; //https://simple.ripley.cl/zapatilla-adidas-terrex-eastrail-bc0975-2000373030909
  },
  adjustment: []
}

export interface BagProduct{
  itemCount: number;
  itemCountWithExtras: number;
  totals: {
    isUncertain: boolean;
    card: number;
    offer: number;
    discount: number;
  },
  appliedCodes: [],
  items:Items []
}

export interface Carrito {
  products: BagProduct[];
}
