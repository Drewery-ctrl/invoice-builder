import pdfDocument from 'pdfkit';
import data from "../helpers/data";

const fs = require('fs');


export const BuildPdf = ( dataCallback, endCallback ) => {
   const doc = new pdfDocument();
   doc.pipe(fs.createWriteStream('output.pdf'));
   doc.on('data', dataCallback);
   doc.on('end', endCallback);
   doc.image('public/images/invoice.png', {
      fit: [100, 100],
      align: 'center',
      valign: 'center',
   });
   doc.fontSize(25).text('Invoice General Information', 100, 100);
   doc.end()
}


export const getTotal = ( invoice ) => {
   let total = 0;
   let subTotal;

   if (typeof invoice.quantity !== 'undefined' && typeof invoice.amount !== 'undefined') {
      total = invoice.quantity * invoice.amount;
   }
   let salesTax = 0;
   if (typeof invoice.tax !== 'undefined') {
      salesTax = total * invoice.tax / 100;
   }
   subTotal = total + salesTax;
   return { total, subTotal };
}


export const getInvoiceTemplate = async ( templateBody, subTotal, total ) => {
   return `
       <html lang="en">
       <head>
           <title>Invoice Document</title>
           <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
           <style>
               @import url('https://fonts.googleapis.com/css?family=Bree+Serif');

               body, h1, h2, h3, h4, h5, h6 {
                   font-family: 'Bree Serif', serif;
               }
           </style>
       </head>
       <body>
       ${ templateBody }
       </body>
       </html>
   `;
}

export const getTemplateBody = async ( invoice, subTotal, total ) => {
   return `
      <div class="container">
          <div class="row">
              <div class="col-xs-6"></div>
              <div class="col-xs-6 text-right">
                  <h1>INVOICE</h1>
                  <h1>
                      <small>${ invoice.item }</small>
                  </h1>
              </div>
          </div>
          <div class="row">
              <div class="col-xs-5">
                  <div class="panel panel-default">
                      <div class="panel-heading">
                          <h4>From:</h4>
                      </div>
                      <div class="panel-body">
                          <p>
                             
                          </p>
                      </div>
                  </div>
              </div>
              <div class="col-xs-5 col-xs-offset-2 text-right">
                  <div class="panel panel-default">
                      <div class="panel-heading">
                          <h4>
                              To :
                              <a>${ invoice.client.firstName } ${ invoice.client.lastName }</a>
                          </h4>
                      </div>
                      <div class="panel-body">
                          <p>
                              ${ invoice.client.email }
                              <br />
                          </p>
                      </div>
                  </div>
              </div>
          </div>
          <table class="table table-bordered">
              <thead>
                  <tr>
                      <th>
                          <h4>Qty</h4>
                      </th>
                      <th>
                          <h4>Rate</h4>
                      </th>
                      <th>
                          <h4>Tax</h4>
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>${ invoice.quantity }</td>
                      <td>${ invoice.amount }</td>
                      <td>${ invoice.tax }</td>
                  </tr>
              </tbody>
          </table>
          <div class="row text-right">
              <div class="col-xs-2 col-xs-offset-8">
                  <p>
                      <strong>
                          Sub Total :
                          <br />
                          TAX : <br />
                          Total :
                          <br />
                      </strong>
                  </p>
              </div>
              <div class="col-xs-2">
                  <strong>
                      $${ subTotal }
                      <br />
                      $${ invoice.tax } <br />
                      $${ total }
                      <br />
                  </strong>
              </div>
          </div>
      </div>
   `
}