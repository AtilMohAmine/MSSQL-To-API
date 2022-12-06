const sql = require("../db/connect.js");

const Create = async (req, res) => {
  
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  tableName = req.params.tableName
  columns = Object.keys(req.body)
  values = Object.values(req.body)
  values.forEach((value, index) => {
    values[index] = `'${value}'`;
  });

  sql.query(`INSERT INTO ${tableName} (${columns.join(',')}) VALUES(${values.join(',')});`, function (err) {
            
    if (err) 
      res.status(500).send({ 
        message:
          err.message || "Some error occurred while creating new row."
      });
    else 
      res.status(200).send({
        message: "Success"
      })
  });
}

const find = async (req, res) => {
  tableName = req.params.tableName
  condition = ''
  if(Object.keys(req.query).length != 0) {
    conditionList = []
    Object.entries(req.query)
      .forEach(([key, value]) => conditionList.push(` ${key} = '${value}'`))
    condition = `Where ${conditionList.join(' AND')}`
  }

  sql.query(`SELECT * FROM ${tableName} ${condition!=''?condition:''};`, function (err, recordset) {
            
    if (err) 
      res.status(500).send({ 
        message:
          err.message || "Some error occurred while getting rows."
      });
    else 
      res.status(200).send({
        message: "Success",
        rows: recordset.recordset
      })
  });
    
}

const deleteById = async (req, res) => {

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  tableName = req.params.tableName

  condition = ''
  if(Object.keys(req.body).length != 0) {
    conditionList = []
    Object.entries(req.body)
      .forEach(([key, value]) => conditionList.push(` ${key} = '${value}'`))
    condition = `Where ${conditionList.join(' AND')}`
  }
  sql.query(`DELETE FROM ${tableName} ${condition!=''?condition:''};`, function (err) {
            
    if (err) 
      res.status(500).send({ 
        message:
          err.message || "Some error occurred while deleting rows."
      });
    else 
      res.status(200).send({
        message: "Success"
      })
  });
}

const updateById = async (req, res) => {

  // Validate request
  if (!req.body.newData || !req.body.oldData) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  tableName = req.params.tableName
  oldData = req.body.oldData
  newData = req.body.newData

  setList = []
  Object.entries(newData)
    .forEach(([key, value]) => setList.push(`${key} = '${value}'`))
  
  condition = ''
  if(Object.keys(oldData).length != 0) {
    conditionList = []
    Object.entries(oldData)
      .forEach(([key, value]) => conditionList.push(` ${key} = '${value}'`))
    condition = `Where ${conditionList.join(' AND')}`
  }

  sql.query(`UPDATE ${tableName} SET ${setList.join(', ')} ${condition!=''?condition:''};`, function (err) {
            
    if (err) 
      res.status(500).send({ 
        message:
          err.message || "Some error occurred while updating rows."
      });
    else 
      res.status(200).send({
        message: "Success"
      })
  });
}

module.exports = {
    Create,
    find,
    deleteById,
    updateById
}