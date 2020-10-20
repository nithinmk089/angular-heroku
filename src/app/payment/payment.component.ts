import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  title = 'Tour of Heroes';
paymentStatus : string;
  constructor(private http: HttpClient,private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(param => {
      if (Object.keys(param).length) {
          this.paymentStatus = param['status'];
          if(this.paymentStatus == "success"){
            console.log(param);
          }
          else if(this.paymentStatus == "cancel"){
            console.log(param);
          }
      }
  });
  }
  
  ngOnInit(){
    alert(1);
  }

  encRequest : string;
  accessCode: string;
  formData: any;
  pay() {
    var req = {
      merchant_id: '193261',
      order_id: '12345',
      currency: 'INR',
      amount: '1.00',
      redirect_url: 'https://localhost:3000/api/ccavenue/ccavResponseHandler',
      cancel_url: 'https://localhost:443/payment?status=cancel',
      language: 'EN',
      billing_name: 'Peter',
      billing_address: 'Santacruz',
      billing_city: 'Mumbai',
      billing_state: 'MH',
      billing_zip: '400054',
      billing_country: 'India',
      billing_tel: '9876543210',
      billing_email: 'testing@domain.com',
      delivery_name: 'Sam',
      delivery_address: 'Vile Parle',
      delivery_city: 'Mumbai',
      delivery_state: 'Maharashtra',
      delivery_zip: '400038',
      delivery_country: 'India',
      delivery_tel: '0123456789',
      merchant_param1: 'additional Info.',
      merchant_param2: 'additional Info.',
      merchant_param3: 'additional Info.',
      merchant_param4: 'additional Info.',
      merchant_param5: 'additional Info.',
      promo_code: '',
      customer_identifier: 'OshoTest123'
    }
    //this.encRequest = "256f5a6e7a72fbd030b622cff80a4522af2e89ad3437430836ba45efd3e20b59c96195f177a6af982dbc86ab08fed78ad709fb3303a5fa300fed11aedf92128f45f8f60b2bcbc4904eee070aebff7c22aabd63e480edfbf5dc009db6fb35c4d4f6af05370dc237002578a43f5c450be60af155a7dd03b0abdc126084afab1fd648dfe134b8cdc12c1f767d875d04a15f228fb78488bd4a0d303af1f684a17f457348446cf9cdc5230693281f406758b838c3fc7f0d1f30d253a5ae585fb6813301268c23c4fbc67694a8dfd06ee1e68b254bd988228eb7145f346eaeaae17c3d6849580676b5a906590b41b049b9fdb99c870c6356b923df3f1f6070100dc8e54d64396c400a64446b2afb72bbe66ce1525b0994c635307ecea312d663903df26dcf2b8d70bc3f311a22f3a8dffeb9b868061cc01a97611aa5ee4bf82ba1c97aebe0365df092a95b891929180c2a3d2d1c763a610e0962c078671a7b8796765000e9b58b9742130feeeb5f6a6304f39ad77a3d3c363c96cb194b666d2064bd54fb14e64697e80fb2a114b041cd44be43ae17c516849f779f6fc7e49ba0963fe4976ae87a26ed9bfa67875a8f4c1d2b4e977ef53a6479954bcb7c4e0737cc6e6712e3686f4ae68739354f980e4dce518cb4ae115a3afc15b589e39752df338f7ec721229ba0277dc7259924506f60a2554eccfd23f3c9a90b8fab7ff6379f3bb2dab88dc65b4facb33a29f03641fab7ee8e0b6d4346c06c9bc6175a3db433785ab7b9c48aee33db3e718f40808fa06376a20f4b01a586dfcfbaf8e8df7ac717f6";
    this.accessCode = "AVOE95HJ83AS22EOSA";
        // this.formData = this.sanitizer.bypassSecurityTrustHtml(dataSanitize);
        alert(2);
    this.http.post<any>('https://localhost:3000/api/ccavenue/ccavRequestHandler', req).subscribe(response => {
        this.encRequest = response.data;
        console.log(response);
        var form = document.createElement("form");
        var element1 = document.createElement("input"); 
        var element2 = document.createElement("input");  
        form.method = "POST";
        form.action = "https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction";   
        element1.type = "hidden";
        element1.value=this.encRequest;
        element1.name="encRequest";
        form.appendChild(element1);  
        element2.type = "hidden";
        element2.value=this.accessCode;
        element2.name="access_code";
        form.appendChild(element2);
        document.body.appendChild(form);
        form.submit();
    })
    
    return;
  }

  paymentSuccess() {
    console.log("Success");
    return;
  }

}
