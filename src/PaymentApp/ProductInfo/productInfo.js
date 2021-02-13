import React from 'react'
import moment from 'moment'
import './productInfo.css'

function ProductInfo({ paymentInvoice }) {
  return (
    <div className="info-wrapper">
      <div className="info">
        <h2>Super product</h2>
        <div>Date: {`${moment(new Date()).format('DD/MM/yyyy')}`}</div>
        <div>Amount: 1123.03 USD</div>
        {paymentInvoice && paymentInvoice.success && <>
          <div className="response-message success">{paymentInvoice.success.responseMessage}</div>
          <div className="invoiceNo">{paymentInvoice.success.invoiceNo}</div>
        </>}
        {paymentInvoice && paymentInvoice.fail && <>
          <div className="response-message fail">{paymentInvoice.fail.responseMessage}</div>
        </>}
      </div>
    </div>
  )
}

export default ProductInfo