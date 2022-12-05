const {addDirs,swapFiles} = require('./dz1/index')
const {deleteFolder} = require('./dz1_deleteDIR/index')
const path = require('node:path')


// swapFiles('boys','girls','female')
// swapFiles('girls','boys','male')

deleteFolder(path.join(__dirname, 'dz3'));
