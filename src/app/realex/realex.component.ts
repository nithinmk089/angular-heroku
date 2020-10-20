import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as sha1 from 'js-sha1';

@Component({
  selector: 'app-realex',
  templateUrl: './realex.component.html',
  styleUrls: ['./realex.component.css']
})
export class RealexComponent implements OnInit {

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

  ngOnInit(): void {
  }
  pay() {
    var MERCHANT_ID = "dev9810090608698918651";
    //var MERCHANT_ID = "oshomedia";
    var globalpaymentsSharedSecret = "qo5wjnot6S";
    var amount = 100;
    //var globalpaymentsSharedSecret = "o9Ems7WJ8o";
    var CURRENCY = "USD";
    var PAYER_REF = "test-customer-reference";
    var PMT_REF = "test-customer-reference";
    var d = new Date();
    var dateFormat = d.getFullYear() + ('0' + (d.getMonth()+1)).slice(-2) +
    ('0' + d.getDate()).slice(-2);
    var timestamp = dateFormat + ('0' + d.getHours()).slice(-2) + 
          ('0' + d.getMinutes()).slice(-2) + ('0' + d.getSeconds()).slice(-2);
          var ORDER_ID =sha1(timestamp);
    var hashing_string1 = timestamp +"."+ MERCHANT_ID +"."+ORDER_ID +"."+ amount + "."+ CURRENCY;
    console.log(hashing_string1);
    var hash1 = sha1(hashing_string1);
    console.log(hash1);
    var hashing_string2 = hash1 + "." + globalpaymentsSharedSecret;
    var hash2 = sha1(hashing_string2);
    console.log(hash2);
    debugger;
    var req = {
      TIMESTAMP: timestamp,
      MERCHANT_ID: MERCHANT_ID,
      ACCOUNT:"internet",
      ORDER_ID: ORDER_ID,
      AMOUNT:amount,
      CURRENCY:"USD",
      AUTO_SETTLE_FLAG:"1",
      COMMENT1:"Mobile Channel",
      HPP_VERSION:"2",
      HPP_CHANNEL:"ECOM",
      HPP_LANG:"en",
      scheduleref : "58de618b3279c",
      schedule : "monthly",
      startdate : dateFormat,
      numtimes : "12",
      //Begin 3D Secure 2 Mandatory and Recommended Fields -->
      HPP_CUSTOMER_EMAIL:"test@example.com",
      HPP_CUSTOMER_PHONENUMBER_MOBILE:"",
      HPP_BILLING_STREET1:"Flat 123",
      HPP_BILLING_STREET2:"House 456",
      HPP_BILLING_STREET3:"Unit 4",
      HPP_BILLING_CITY:"Halifax",
      HPP_BILLING_POSTALCODE:"W5 9HR",
      HPP_BILLING_COUNTRY:"826",
      HPP_SHIPPING_STREET1:"Apartment 852",
      HPP_SHIPPING_STREET2:"Complex 741",
      HPP_SHIPPING_STREET3:"House 963",
      HPP_SHIPPING_CITY:"Chicago",
      HPP_SHIPPING_STATE:"IL",
      HPP_SHIPPING_POSTALCODE:"50001",
      HPP_SHIPPING_COUNTRY:"840",
      HPP_ADDRESS_MATCH_INDICATOR:"FALSE",
      HPP_CHALLENGE_REQUEST_INDICATOR:"NO_PREFERENCE",
      // End 3D Secure 2 Mandatory and Recommended Fields -->
      // Begin Fraud Management and Reconciliation Fields -->
      BILLING_CODE:"59|123",
      BILLING_CO:"GB",
      SHIPPING_CODE:"50001|Apartment 852",
      SHIPPING_CO:"US",
      CUST_NUM:"6e027928-c477-4689-a45f-4e138a1f208a",
      VAR_REF:"Acme Corporation",
      PROD_ID:"SKU1000054",
      // End Fraud Management and Reconciliation Fields -->
      MERCHANT_RESPONSE_URL:"https://mynodetester.herokuapp.com/realex",
      CARD_PAYMENT_BUTTON:"Pay Invoice",
      CUSTOM_FIELD_NAME:"",
      PAYER_REF : PAYER_REF,
      PMT_REF: PMT_REF,
      SHA1HASH: hash2
    }

    var form = document.createElement("form");
    form.method = "POST";
        form.action = "https://pay.sandbox.realexpayments.com/pay"; 
        for (const [key, value] of Object.entries(req)) {
          var element = document.createElement("input");
          element.type = "hidden";
          element.name = key;
          element.value =value;
          form.appendChild(element);
        }
        document.body.appendChild(form);
        form.submit();
    
    return;
  }
}
