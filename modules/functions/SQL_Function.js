module.exports = (MAIN, sql, data, logSuccess, logError) => {
  return new Promise(resolve => {
  	MAIN.pbd.query(sql, data, function (error, result, fields) {
  		if(error){ console.error(logError,error); }
      if(logSuccess){ console.info(logSuccess); }
      return resolve(result);
  	}); return;
  });
}
