import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore/firestore.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BillModel } from '../models/bill-model';



@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  public bills = [];

  public documentId = null;
  public currentStatus = 1;
  public newBillForm = new FormGroup({
    idBill: new FormControl('', Validators.required),
    itemCount: new FormControl('', Validators.required),
    items: new FormControl(''),
    totals: new FormControl(''),
    active: new FormControl(''),
    id: new FormControl('')
  });


  constructor(
    private firestoreService: FirestoreService
  ) {
    this.newBillForm.setValue({
      id: '',
      idBill: '',
      itemCount: '',
      items: '',
      totals: '',
      active: ''
    });
  }
  ngOnInit() {
    this.firestoreService.getBills().subscribe((billSnapshot) => {
      this.bills = [];
      billSnapshot.forEach((billData: any) => {
        this.bills.push({
          id: billData.payload.doc.id,
          data: billData.payload.doc.data()
        });
        console.log(this.bills);
      })
    });
  }

  public newBill(form, documentId = this.documentId) {
    console.log(`Status: ${this.currentStatus}`);
    if (this.currentStatus == 1) {
      let data = {
        idBill: form.idBill,
        itemCount: form.itemCount,
        items: form.items,
        totals: form.totals,
        active: form.active
      }
      this.firestoreService.createBill(data).then(() => {
        console.log('Documento creado exitósamente!');
        this.newBillForm.setValue({
          idBill: '',
          itemCount: '',
          items: '',
          totals: '',
          active: '',
          id: ''
        });
      }, (error) => {
        console.error(error);
      });
    } else {
      let data = {
        idBill: form.idBill,
        itemCount: form.itemCount,
        items: form.items,
        totals: form.totals,
        active: form.active
      }
      this.firestoreService.updateBill(documentId, data).then(() => {
        this.currentStatus = 1;
        this.newBillForm.setValue({
          idBill: '',
          itemCount: '',
          items: '',
          totals: '',
          active: '',
          id: ''
        });
        console.log('Documento editado exitósamente');
      }, (error) => {
        console.log(error);
      });
    }
  }

  public editBill(documentId) {
    let editSubscribe = this.firestoreService.getBill(documentId).subscribe((billData: any) => {
      this.currentStatus = 2;
      this.documentId = documentId;
      this.newBillForm.setValue({
        id: documentId,
        idBill: billData.payload.data().idBill,
        itemCount: billData.payload.data().itemCount,
        items: billData.payload.data().items,
        totals: billData.payload.data().totals,
        active: billData.payload.data().active
      });
      editSubscribe.unsubscribe();
    });
  }

  public deleteBill(documentId) {
    this.firestoreService.deleteBill(documentId).then(() => {
      console.log('Documento eliminado!');
    }, (error) => {
      console.error(error);
    });
  }
}


