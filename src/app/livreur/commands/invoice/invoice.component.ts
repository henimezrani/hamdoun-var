import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import { FormatPipe } from 'src/app/services/format.pipe';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  @Input()
  command: any

  products:any;
  date:Date;
  myDate:string;
  billId:string;
  constructor(private formatPipe: FormatPipe) { }

  ngOnInit() {
    this.products=this.command.products;
    this.billId=this.command.client_uid.toString().substr(0,7);
    this.date=new Date();
    this.date.getDate();
    this.date.getFullYear();
    this.date.getMonth();
    if(this.date.getDate()==1)
    {
     this.myDate="1st "+this.date.getMonth()+", "+this.date.getFullYear();
    }else{
      this.myDate=this.date.getDate()+" "+this.date.getMonth()+", "+this.date.getFullYear();
    }
  }
  formatUserNumber(num) {
    return this.formatPipe.transform(num);
}
  printBill() {
    let printContents, popupWin;
    printContents = document.getElementById('bill').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=50%,height=' + screen.height + ',width=' + screen.width);
    popupWin.document.open();
    popupWin.document
    .write(`<html>
     ${$('head').clone().html()}
    <body onload="window.print();window.close()">${printContents}</body></html>`);
    //popupWin.document.close();
    }

}
