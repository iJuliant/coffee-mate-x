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
  // getDataByProductId: (idd) => {
  //   return new Promise((resolve, reject) => {
  //     connection.query('SELECT * FROM product WHERE product_id = ?',
  //       idd, (error, result) => {
  //         // console.log(error)
  //         // console.log(result)
  //         !error ? resolve(result) : reject(new Error(error))
  //       }
  //     )
  //   })
  // },
  // getDataByIdCondition: (id, idd) => {
  //   return new Promise((resolve, reject) => {
  //     connection.query(`SELECT promo.promo_name, promo.promo_discount, promo.promo_desc, promo.promo_code, promo.promo_expire_end, product.product_name, product.product_image FROM promo INNER JOIN product ON promo.promo_type = product.product_category where promo.promo_id = ${id} AND product.product_id = ${idd}`,
  //       [id, idd], (error, result) => {
  //         // console.log(error)
  //         // console.log(result)
  //         !error ? resolve(result) : reject(new Error(error))
  //       }
  //     )
  //   })
  // },
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
  }
}
