import React, { useState } from 'react'
import PaymentForm from './PaymentForm/paymentForm'
import ProductInfo from './ProductInfo/productInfo'
import './paymentApp.css'

function PaymentApp() {
  const [paymentInvoice, setPaymentInvoice] = useState(null)

  return (
    <section className="payment-section">
      <ProductInfo paymentInvoice={paymentInvoice} />
      
      {!paymentInvoice &&
        <PaymentForm setPaymentInvoice={setPaymentInvoice} />
      }
    </section>

  )
}

export default PaymentApp
