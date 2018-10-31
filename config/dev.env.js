//開發中的環境
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APIPATH: '"https://vue-course-api.hexschool.io"', //伺服器路徑
  CUSTOMPATH: '"utest"' //自定義的路徑
})
