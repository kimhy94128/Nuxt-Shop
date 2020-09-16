const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')

const databaseName = 'shop' 
const user = 'root'         
const password = 'h00k'         
const options = {
    host: '127.0.0.1',      
    dialect: 'mysql'        
}

let sequelize = new Sequelize(databaseName, user, password, options)
let db        = {};

fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(function(file) {
        let model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sql = sequelize;
db.S = Sequelize;

sequelize.sync(); 

module.exports = db;
