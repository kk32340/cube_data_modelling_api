const utils = require('./utils');

const numRows =3; 
  const startCol=300
  const startRow=300  
  const colStartPos=0
  const legth=13
  const param={legth, numRows,startCol,startRow, colStartPos}
  const arrXY=utils.get_position(param)  
  console.log(arrXY)