import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectionService {

  url:string = 'https://clripley-qa.azure-api.net/';
  apiKey = ''; // <-- Enter your own key here!
 
  constructor(private http: HttpClient) { }
  /*
  getProductData(sku: string){
    let productUrl:string = '';
    productUrl = `${this.url}productos/api/Producto/12?ean13=0${sku}`;

    const headerDict = {
      "Accept": "application/json",
      "RIPLEY-APP-VERSION": "10.0.0.58",
      "RIPLEY-SUCURSAL": "0012",
      "RIPLEY-VENDEDOR": "613794502",
      "RIPLEY-POS": "359878063204677",
      "Ocp-Apim-Subscription-Key": "2533a22c550e481aae376c2bfcd43d0f"
    }

    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    return this.http
          .get(`${productUrl}`, requestOptions)
          .pipe(
            map(results => {
              console.log('what im getting: ', results);
              return results;
            }),
            catchError(err => {
              console.error(err.message);
              console.log("Error is handled");
              return err;
            })
          ).subscribe(el => console.log('el', el),
              err => console.error('err', err),
              () => console.log("Processing Complete.")
          ); 
  };

  getProductStock(sku: string){
    //https://clripley-qa.azure-api.net/stock/api/stock/10012?sku=2000371747984

    const headerDict = {
      'Ocp-Apim-Subscription-Key': '2533a22c550e481aae376c2bfcd43d0f',
      'Access-Control-Allow-Origin': 'http://localhost:8200, *',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
      'Content-Type': 'application/json; charset=UTF-8'
    }

    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    let productUrl:string = '';
    productUrl = `${this.url}stock/api/stock/10012?sku=${sku}`;
    console.log('productUrl', productUrl);

    return this.http
          .get(productUrl, requestOptions)
          .pipe(
              map(results => {
                debugger;
                console.log('what im getting: ', results);
                return results;
              }),
              catchError(err => {
                debugger;
                console.error(err);
                console.log("Error is handled");
                return err;
                // return {
                //   "codigoSucursal": "10012",
                //   "descripcionSucursal": "Parque Arauco",
                //   "sku": "2000371747984",
                //   "descripcionSku": "BOTIN 16 HRS M130 NG NEGRO 39",
                //   "stockDisponible": 1,
                //   "stockReservadoInt": 0,
                //   "semanaAntiguedad": 3
                // }
              })
            ).subscribe(el => {
              debugger;
              console.log('el', el),
              err => console.error('err', err),
              () => console.log("Processing Complete.")
            }); 

  }
*/
  

  getStockAvailability(sku: string): Observable<ProductStock> {
    const headerDict = {
      'Ocp-Apim-Subscription-Key': '2533a22c550e481aae376c2bfcd43d0f',
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    let productUrl:string = '';
    productUrl = `${this.url}stock/api/stock/10012?sku=${sku}`;

    return this.http.get(productUrl, requestOptions)
    .pipe(
        map((res) => {
          return new ProductStock(res)
        })
    )
    
  }
  
}

export class ProductStock{

  codigoSucursal: string;
  descripcionSucursal: string;
  sku: string;
  descripcionSku: string;
  stockDisponible: number;
  stockReservadoInt: number;
  semanaAntiguedad: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

export class StoreProduct{
  
    sucursal: string;
    filler: string;
    ean13: string;
    descripcion: string;
    division: string;
    area: string;
    depto: string;
    linea: string;
    subLinea: string;
    evento: string;
    prioridad: string;
    subPrioridad: string;
    precioVigente: string;
    ean13Estilo: string;
    tipoArticulo: string;
    tipoPropiedad: string;
    tipoServicio: string;
    indicadores: string;
    numComponentes: string;
    lista: string;
    precioMaster: string;
    ean13Proveedor: string;
    procedencia: string;
    ranPrecio: string;
    razSocPrvAnt: string;
    razSocPrvAct: string;
    temporada: string;
    marcaPrd: string;
    marcaPropia: string;
    marcaPrv: string;
    concesion: string;
    fleteDbo: string;
    tapiceria: string;
    cicloVida: string;
    industrializado: string;
    oreDespachoBt: string;
    prdInternet: string;
    tipNegociacion: string;
    diferenciable: string;
    revista: string;
  
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
}
