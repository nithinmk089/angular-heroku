import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as sha1 from 'js-sha1';
import { Guid } from 'guid-typescript';
import * as converter from 'xml-js';

@Component({
  selector: 'app-realex',
  templateUrl: './realex.component.html',
  styleUrls: ['./realex.component.css']
})
export class RealexComponent implements OnInit {

  paymentStatus : string;
  merchantInfo: any;
  
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

  headerDict = {
    'Access-Control-Allow-Origin':  "https://angular-payment-test.herokuapp.com/",
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  }
  
  requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders(this.headerDict), 
  };

  ngOnInit(): void {
  }
  pay() {
    var MERCHANT_ID = "dev9810090608698918651";
    //var MERCHANT_ID = "oshomedia";
    var globalpaymentsSharedSecret = "qo5wjnot6S";
    var amount = "";
    //var globalpaymentsSharedSecret = "o9Ems7WJ8o";
    var CURRENCY = "";
    var PAYER_REF = "test-customer-reference";
    var PMT_REF = "test-customer-reference";
    var d = new Date();
    var dateFormat = d.getFullYear() + ('0' + (d.getMonth()+1)).slice(-2) +
    ('0' + d.getDate()).slice(-2);
    var timestamp = dateFormat + ('0' + d.getHours()).slice(-2) + 
          ('0' + d.getMinutes()).slice(-2) + ('0' + d.getSeconds()).slice(-2);
          var ORDER_ID =sha1(timestamp);
    var hashing_string1 = timestamp +"."+ MERCHANT_ID +"."+ORDER_ID +"."+ amount + "."+ CURRENCY+"."+PAYER_REF;
    console.log(hashing_string1);
    var hash1 = sha1(hashing_string1);
    console.log(hash1);
    var hashing_string2 = hash1 + "." + globalpaymentsSharedSecret;
    var hash2 = sha1(hashing_string2);

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
      MERCHANT_RESPONSE_URL:"https://mynodetester.herokuapp.com/api/realex/confirm",
      CARD_PAYMENT_BUTTON:"Pay Invoice",
      CUSTOM_FIELD_NAME:"",
      PAYER_REF : PAYER_REF,
      PMT_REF: PMT_REF,
      SHA1HASH: hash2
    }
    console.log(req);
    debugger;
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

  recurringPayment() {
    var xmlBody = "";
    //this.http.get("https://localhost:3000/api/realex/get").subscribe(function(response) { 
      this.merchantInfo = {data : { merchantid : "oshomedia", sharedsecret : "o9Ems7WJ8o"}};
      var MERCHANT_ID = this.merchantInfo.data.merchantid;
      var SharedSecret = this.merchantInfo.data.sharedsecret;
      var CURRENCY = "";
      var AMOUNT = "";
      var d = new Date();
      var dateFormat = d.getFullYear() + ('0' + (d.getMonth()+1)).slice(-2) +
            ('0' + d.getDate()).slice(-2);
      var timestamp = dateFormat + ('0' + d.getHours()).slice(-2) + 
          ('0' + d.getMinutes()).slice(-2) + ('0' + d.getSeconds()).slice(-2);
      var ORDER_ID =sha1(timestamp);
      var PAYER_REF = Guid.create();
      var title = "Mr.";
      var firstname ="James";
      var surname = "Mason";
      var company = "Global Payments";
      var line1 = "Flat 123";
      var line2 = "House 456";
      var line3 = "The Cul-De-Sac";
      var city = "Halifax";
      var county = "West Yorkshire";
      var postcode = "W6 9HR";
      var country_code="GB";
      var country = "United Kingdom";
      var homeNo = "+35312345678";
      var workNo = "+3531987654321";
      var faxNo = "+124546871258";
      var mobileNo = "+25544778544";
      var email = "text@example.com";
      var dateofbirth = "19851222";
      var state = "Yorkshire and the Humber";
      var passphrase = "montgomery";
      var vatnumber = "GB 123456789";
      var varref = "Car Part HV";
      var custnum = "E8953893489";
      var hashing_string1 = timestamp +"."+ MERCHANT_ID +"."+ORDER_ID +"."+ AMOUNT + "."+ CURRENCY+"."+PAYER_REF;
      var hash1 = sha1(hashing_string1);
      var hashing_string2 = hash1 + "." + SharedSecret;
      var hash2 = sha1(hashing_string2);
      xmlBody = '<?xml version="1.0" encoding="UTF-8"?>'+
                  '<request type="payer-new" timestamp="'+timestamp+'">'+
                  '<merchantid>'+MERCHANT_ID+'</merchantid>'+
                  '<account>internet</account>'+
                  '<orderid>'+ORDER_ID+'</orderid>'+
                  '<payer ref="'+PAYER_REF+'" type="Retail">'+
                    '<title>'+title+'</title>'+
                    '<firstname>'+firstname+'</firstname>'+
                    '<surname>'+surname+'</surname>'+
                    '<company>'+company+'</company>'+
                    '<address>'+
                      '<line1>'+line1+'</line1>'+
                      '<line2>'+line2+'</line2>'+
                      '<line3>'+line3+'</line3>'+
                      '<city>'+city+'</city>'+
                      '<county>'+county+'</county>'+
                      '<postcode>'+postcode+'</postcode>'+
                      '<country code="'+country_code+'">'+country+'</country>'+
                    '</address>'+
                    '<phonenumbers>'+
                      '<home>'+homeNo+'</home>'+
                      '<work>'+workNo+'</work>'+
                      '<fax>'+faxNo+'</fax>'+
                      '<mobile>'+mobileNo+'</mobile>'+
                    '</phonenumbers>'+
                    '<email>'+email+'</email>'+
                    '<dateofbirth>'+dateofbirth+'</dateofbirth>'+
                    '<state>'+state+'</state>'+
                    '<passphrase>'+passphrase+'</passphrase>'+
                    '<vatnumber>'+vatnumber+'</vatnumber>'+
                    '<varref>'+varref+'</varref>'+
                    '<custnum>'+custnum+'</custnum>'+
                  '</payer>'+
                  '<sha1hash>'+hash2+'</sha1hash>'+
                '</request>';
      console.log(xmlBody);
      
   // });
    this.createUser(xmlBody);
    //Step 1 - Create User in RealEx

  }
  createUser(xmlData){
    this.http.post<any>('https://api.sandbox.realexpayments.com/epage-remote.cgi', xmlData, this.requestOptions).subscribe(data => {
      //let result1 = converter.xml2json(data, {compact: true, spaces: 2});
      //const JSONData = JSON.parse(result1);
      console.log(data);
    });
    return;
  }
}
