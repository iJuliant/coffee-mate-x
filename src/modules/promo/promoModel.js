const connection = require('../../config/mysql')

module.exports = {
  getDataAll: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * fROM promo', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM promo WHERE promo_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  updateData: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE promo SET ? WHERE promo_id = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              id: id,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  createData: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO promo SET ?', setData, (error, result) => {
        // !error ? resolve({id: result.inserId, ...setData}) : reject(new Error(error))
        // console.log(error);
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...setData
          }
          resolve(newResult)
        } else {
          // console.log(error)
          reject(new Error(error))
        }
      })
    })
  },
  deleteData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM promo WHERE promo_id = ?', id, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      }
      )
    })
  }
}
