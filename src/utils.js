
get_position=({legth, numRows, startCol, startRow,colStartPos})=>{    
    let nodes=new Array(legth).fill(undefined);
     nodes.forEach((node, index) => {        
        const row = index % numRows;
        const col = Math.floor(index / numRows);
        let col1=(col+1 + colStartPos) * startCol
        let row1=(row+1)* startRow
        nodes[index]={x:col1,y:row1}            
    });
    return nodes;
}
// const legth=9
// const numRows =3; 
// const startCol=200
// const startRow=200  
// const colStartPos=1
// const param={legth, numRows,startCol,startRow, colStartPos}
// let arr=get_position(param)   

const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
        // Extract the key to group by
        const groupKey = currentValue[key];
  
        // Initialize the group if it doesn't exist
        if (!result[groupKey]) {
            result[groupKey] = [];
        }
  
        // Push the current element into the correct group
        result[groupKey].push(currentValue);
  
        return result;
    }, {});
  };
  //const groupedData = groupBy(data, 'category');


module.exports = {
    get_position, groupBy
}
