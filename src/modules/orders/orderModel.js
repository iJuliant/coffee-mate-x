const connection = require('../../config/mysql')

module.exports = {

  postOrders: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO orders SET ?',
        setData,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        })
    })
  },

  postInvoice: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO invoice SET ?',
        setData,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getInvoiceByCode: (code) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM invoice WHERE invoice_code = ?',
        code,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getInvoiceById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM invoice WHERE invoice_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  updateOrder: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE orders SET ? WHERE invoice_id = ?',
        [setData, id],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }

}
