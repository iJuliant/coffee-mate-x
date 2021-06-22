const connection = require('../../config/mysql')

module.exports = {

  getInvoice: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM invoice WHERE user_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  deleteInvoice: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM invoice WHERE invoice_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }

}
