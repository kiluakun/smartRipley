import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { BillModel } from 'src/app/models/bill-model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore
  ) { }
  //Crea una nueva boleta
  public createBill(data: {
    idBill: string, active: false, itemCount: string,
    /* items: ItemModel[];  */totals: string
  }) {
    return this.firestore.collection('boletas').add(data);
  }
  //Obtiene una boleta
  public getBill(documentId: string) {
    return this.firestore.collection('boletas').doc(documentId).snapshotChanges();
  }
  //Obtiene todas las boletas
  public getBills() {
    return this.firestore.collection('boletas').snapshotChanges();
  }
  //Actualiza una boleta
  public updateBill(documentId: string, data: {
    idBill: string, active: false, itemCount: string,
    /* items: ItemModel[];  */totals: string
  }) {
    return this.firestore.collection('boletas').doc(documentId).set(data);
  }

  //Borra una boleta
  public deleteBill(documentId: string) {
    return this.firestore.collection('boletas').doc(documentId).delete();
  }
}