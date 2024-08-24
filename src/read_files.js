const fs = require('fs').promises;
const path = require('path');
const YAML = require('yaml')
const utils = require('./utils');
const yaml = require('js-yaml');
const fs1 = require('fs');
const fs2 = require('fs').promises;
const moment = require('moment');
const lockfile = require('proper-lockfile');

async function readFilesFromDirectory(directoryPath){
  try {

    const files = await fs.readdir(directoryPath);
    const readPromises = files.map(file => fs.readFile(path.join(directoryPath, file), 'utf8'));
    return await Promise.all(readPromises);
  }
  catch (err) {
    console.error('Error reading files:', err);
  }
}

async function readFileFromDirectory(directoryPath, filename){
  try {

    const files = await fs.readdir(directoryPath)
    const modelFile = files.filter(f=>f==filename)  
    const readPromises = modelFile.map(file => fs.readFile(path.join(directoryPath, file), 'utf8'));
    return await Promise.all(readPromises);

  }
  catch (err) {
    console.error('Error reading files:', err);
  }
}

async function readFilesFromDirectory_Filter(directoryPath, list){
  try {

    let filesAll = await fs.readdir(directoryPath);
    const files = filesAll.filter((file) => list.includes(file.split('.')[0]));    
    const readPromises = files.map(file => fs.readFile(path.join(directoryPath, file), 'utf8'));
    return await Promise.all(readPromises);
  }
  catch (err) {
    console.error('Error reading files:', err);
  }
}


async function readFilesFromDirectory1(directoryPath) {
    try {

    const files = await fs.readdir(directoryPath);
    const readPromises = files.map(file => fs.readFile(path.join(directoryPath, file), 'utf8'));
    const contents = await Promise.all(readPromises);
    
    
    let x=1
    let y=0
    arr_nodes=[]
    arr_edges=[]
    return_obj={}
    contents.forEach((content, index) => {
    y++
    if(y==10){  
        x=x+110
        y=1
    }

    //node object
    let yaml_obj= YAML.parse(content);
    file_obj={}

    file_obj.id=yaml_obj['cubes'].name
    file_obj.type='tableNode'
    file_obj.position={ x: x, y: y*70  }
    file_obj.data={'name':yaml_obj['cubes'].name,'dimensions':yaml_obj['cubes'].dimensions.map(({ name, type }) => ({ name, type }))}
    arr_nodes.push(file_obj)      

    //edge object
    yaml_obj['cubes'].joins.forEach(element => {
        
        let source=yaml_obj['cubes'].name
        let edge_obj={}
        edge_obj.id=source +'_'+element.name
        edge_obj.source=source
        edge_obj.target=element.name        
        arr_edges.push(edge_obj)    
    })   
    });

    return {'nodes':arr_nodes,
         'edges':arr_edges
        };
  } catch (err) {
    console.error('Error reading files:', err);
  }
}

async function readFilesFromDirectory_multi_handlers(directoryPath) {
    try {

    const files = await fs.readdir(directoryPath);
    const readPromises = files.map(file => fs.readFile(path.join(directoryPath, file), 'utf8'));
    const contents = await Promise.all(readPromises);
    
    
    let x=1
    let y=0
    arr_nodes=[]
    arr_edges=[]
    return_obj={}
    contents.forEach((content, index) => {
    y++
    if(y==10){  
        x=x+110
        y=1
    }

    //node object
    let yaml_obj= YAML.parse(content);
    file_obj={}

    file_obj.id=yaml_obj['cubes'].name
    file_obj.type='tableNode'
    file_obj.position={ x: x, y: y*70  }
    file_obj.data={'name':yaml_obj['cubes'].name,'dimensions':yaml_obj['cubes'].dimensions.map(({ name, type }) => ({ name, type }))}
    arr_nodes.push(file_obj)      

    //edge object
    yaml_obj['cubes'].joins.forEach(element => {
        
        let source=yaml_obj['cubes'].name
        let sql = element.sql.replace(/ AND /g, '@AND@')
        sql = sql.replace(/{CUBE}/g, source)
        let arr_sql = sql.split(/[=,@AND@]/).filter(item => item.trim() !== '')

        const dupleArray = arr_sql.reduce((acc, curr, index, array) => {
            if (index % 2 === 0) {
              acc.push([curr]);
            } else {
              acc[acc.length - 1].push(curr);
            }
            return acc;
          }, []);

          dupleArray.forEach(item => {
            if (item.length==2)
            {
                let edge_obj={}
                edge_obj.source=source
                edge_obj.target=element.name
                edge_obj.sourceHandle=item[0].trim()
                edge_obj.targetHandle=item[1].trim()
                arr_edges.push(edge_obj)

                if (source=="ir_section")
                    {
                        console.log(edge_obj)
                    }

            }
        })      

    })   
    });

    return {'nodes':arr_nodes,
         'edges':arr_edges
        };
  } catch (err) {
    console.error('Error reading files:', err);
  }
}


async function readFilesFromDirectory_All(directoryPath) {
  try {

  const files = await fs.readdir(directoryPath);
  const readPromises = files.map(file => fs.readFile(path.join(directoryPath, file), 'utf8'));
  const contents = await Promise.all(readPromises);
  
  
  let x=1
  let y=0
  arr_nodes=[]
  arr_edges=[]
  return_obj={}
  contents.forEach((content, index) => {
  y++
  if(y==17){  
      x=x+250
      y=1
  }

  //node object
  let yaml_obj= YAML.parse(content);
  file_obj={}

  file_obj.id=yaml_obj['cubes'].name
  file_obj.type='CustomNodeAll'
  file_obj.position={ x: x, y: y*40  }
  file_obj.data={'name':yaml_obj['cubes'].name}
  arr_nodes.push(file_obj)      

  //edge object
  yaml_obj['cubes'].joins.forEach(element => {
      
      let source=yaml_obj['cubes'].name
      let edge_obj={}
      edge_obj.id=source +'_'+element.name
      edge_obj.source=source
      edge_obj.target=element.name        
      arr_edges.push(edge_obj)    
  })   
  });

  return {'nodes':arr_nodes,
       'edges':arr_edges
      };
} catch (err) {
  console.error('Error reading files:', err);
}
}

async function readFilesFromDirectory_node_list(directoryPath) {
    try {
    const files = await fs.readdir(directoryPath);
    const readPromises = files. map(file => fs.readFile(path.join(directoryPath, file), 'utf8'));
    const contents = await Promise.all(readPromises);
    
    let arr_nodes=[]
    contents.forEach((content, index) => {  
      let yaml_obj= YAML.parse(content);
      arr_nodes.push(yaml_obj['cubes'].name)  
    });
    return arr_nodes
  } catch (err) {
    console.error('Error reading files:', err);
  }
}


async function get_join_nodes(contents)
{
  try{
        arr_nodes1=[]
        contents.forEach((content, index) => {
        //node object
        let yaml_obj= YAML.parse(content);
        file_obj={}
      
        file_obj.id=yaml_obj['cubes'].name
        file_obj.type='specificNodes'
        file_obj.position={ x: 1, y: 1  }
        file_obj.data={'name':yaml_obj['cubes'].name,'dimensions':yaml_obj['cubes'].dimensions.map(({ name, type }) => ({ name, type }))}
        arr_nodes1.push(file_obj) 
    })
    return arr_nodes1;
  }
  catch (err) {
    console.error('Error reading files:', err);
  }
}

async function readFilesFromDirectory_specific_nodes(directoryPath, nodelist) {
  try {

  const contents = await readFilesFromDirectory_Filter(directoryPath, nodelist)  
  
  let x=1
  let y=0
  arr_nodes=[]
  arr_edges=[]
  return_obj={}
  contents.forEach((content, index) => {
  y++
  if(y==10){  
      x=x+110
      y=1
  }

  //node object
  let yaml_obj= YAML.parse(content);
  file_obj={}

  file_obj.id=yaml_obj['cubes'].name
  file_obj.type='specificNodes'
  file_obj.position={ x: x, y: y*70  }
  file_obj.data={'name':yaml_obj['cubes'].name,'dimensions':yaml_obj['cubes'].dimensions.map(({ name, type }) => ({ name, type }))}
  arr_nodes.push(file_obj)      

  //edge object
  yaml_obj['cubes'].joins.forEach(element => {
      
      let source=yaml_obj['cubes'].name
      let sql = element.sql.replace(/ AND /g, '@AND@')
      sql = sql.replace(/{CUBE}/g, source)
      let arr_sql = sql.split(/[=,@AND@]/).filter(item => item.trim() !== '')

      const dupleArray = arr_sql.reduce((acc, curr, index, array) => {
          if (index % 2 === 0) {
            acc.push([curr]);
          } else {
            acc[acc.length - 1].push(curr);
          }
          return acc;
        }, []);

        dupleArray.forEach(item => {
          if (item.length==2)
          {
              let edge_obj={}
              edge_obj.source=source
              edge_obj.target=element.name
              edge_obj.animated=true,
              //edge_obj.style={ stroke: 'red' },
              //edge_obj.sourceHandle=item[0].trim() + '_l'
              //edge_obj.targetHandle=item[1].trim() + '_r'
              edge_obj.type='specificNodes'
              edge_obj.id = item[0].trim()  + '.' + item[1].trim()   
              edge_obj.label='test test'          
              arr_edges.push(edge_obj)
          }
      })      

  })   
  });
  
  let join_nodes = arr_edges.map(item=>item.target)
  const join_node_contents = await readFilesFromDirectory_Filter(directoryPath, join_nodes)    
  let join_nodes_obj = await get_join_nodes(join_node_contents)

  arr_nodes.forEach(node=>{
    node.position.x=-200
    node.position.y=500
  })
  
const legth=join_nodes_obj.length
if (legth > 0)
{
  const numRows =3; 
  const startCol=300
  const startRow=300  
  const colStartPos=0
  const param={legth, numRows,startCol,startRow, colStartPos}
  const arrXY=utils.get_position(param)  

  arrXY.forEach((item,index)=>{
    join_nodes_obj[index].position.x=item.x
    join_nodes_obj[index].position.y=item.y
  })
}
  
let nodes = [...arr_nodes,...join_nodes_obj]



  return {'nodes':nodes,
       'edges':arr_edges
      };
} catch (err) {
  console.error('Error reading files:', err);
}
}



async function readFilesFromDirectory_get_node(directoryPath, nodelist) {
  try {
  
  const contents = await readFilesFromDirectory_Filter(directoryPath, nodelist)  
  
  let x=1
  let y=0
  arr_nodes=[]
  arr_edges=[]
  return_obj={}
  contents.forEach((content, index) => {
  y++
  if(y==10){  
      x=x+110
      y=1
  }

  //node object
  let yaml_obj= YAML.parse(content);
  file_obj={}

  file_obj.id=yaml_obj['cubes'].name
  file_obj.type='specificNodes'
  file_obj.position={ x: x, y: y*70  }
  file_obj.data={'name':yaml_obj['cubes'].name,'dimensions':yaml_obj['cubes'].dimensions.map(({ name, type }) => ({ name, type }))}
  arr_nodes.push(file_obj)  
})
  
const legth=arr_nodes.length
if (legth > 0)
{
  const numRows =3; 
  const startCol=300
  const startRow=300  
  const colStartPos=4
  const param={legth, numRows,startCol,startRow, colStartPos}
  const arrXY=utils.get_position(param)  

  arrXY.forEach((item,index)=>{
    arr_nodes[index].position.x=item.x
    arr_nodes[index].position.y=item.y
  })
}

return arr_nodes;


}
  catch(err){
    console.error('Error reading files:', err);
  } 
}

const get_directory_path=()=>{
    return './yaml_files';
  } 

  
const get_backup_directory_path=()=>{
  return './backup';
} 

async function call_read_files(){
  const directoryPath = get_directory_path();
    return await readFilesFromDirectory(directoryPath)
}

async function read_all_nodes_edges(){
  const directoryPath = get_directory_path();
    return await readFilesFromDirectory_All(directoryPath)
}

async function get_node_list(){
  const directoryPath = get_directory_path();
  return await readFilesFromDirectory_node_list(directoryPath)
}


async function get_specific_nodes(nodelist){
  const directoryPath = get_directory_path();
  return await readFilesFromDirectory_specific_nodes(directoryPath, nodelist)
}


async function get_node(nodelist){
  const directoryPath = get_directory_path();
  return await readFilesFromDirectory_get_node(directoryPath, nodelist)
}

async function get_node_options(nodelist){
  const directoryPath = get_directory_path();
  let nodes = await readFilesFromDirectory_get_node(directoryPath, nodelist)
  return nodes
}

function model_file_backup(directoryPath, source){
  try{
    const now = moment();
    let datestamp=now.format('MM_DD_YYYY_hh_mm_ss')

    const sourceFilePath = path.join(directoryPath, source + '.yaml');
    let backup_directoryPath = get_backup_directory_path()

    if (!fs1.existsSync(backup_directoryPath)) {
      fs1.mkdirSync(backup_directoryPath, { recursive: true });
    }

    let model_file_backup = source + '_' + 'Guest1_' + datestamp + '.yaml'
    let targetFilePath = path.join(backup_directoryPath, model_file_backup);
    
    fs1.copyFile(sourceFilePath, targetFilePath, (err) => {
      if (err) {
        return {'status_code':500,'error':err.message}
      }
      console.log('File copied successfully!');
    });
    return {'status_code':200}
  } 
  catch (err) {    
    return {'status_code':500,'error':err.message}
  }
}

async function writeAsync_file(filepath , doc) {

  return_status={}
  try{

    let triesCounter = 0;
    while(triesCounter < 2){
      const checkFile = await lockfile.check(filepath);
      if (checkFile){
        await lockingUtility.sleep(1000);
        console.log('File is locked. Retrying in 1 second...');
        if (triesCounter==1){
          return_status= {'status_code':500,'error':'file is locked'}
        }
      }
      else{
        await lockfile.lock(filepath);      
        await fs.writeFile(filepath, yaml.dump(doc));    
        await lockfile.unlock(filepath);
      }
      triesCounter ++;
    }
    
    return_status={'status_code':200}
  }
  catch (err) {    
    return_status= {'status_code':500,'error':err.message}
  }
  return return_status
}

async function update_edges(data){
  const directoryPath = get_directory_path();
  let error=''
  let model_file=data.edge.source + '.yaml'
  let edgeCount=0 
  let is_join_removed=false;   
  
    try {
      const doc = yaml.load(fs1.readFileSync(path.join(directoryPath, model_file), 'utf8'));
      let indexOfTarget=doc.cubes.joins.findIndex(f=>f.name===data.edge.target)      
      let sql=''
     
      data.items.forEach(item=>{
        edgeCount++
        if (sql=='')
        {
          sql = '{CUBE}.' + item.sourcehandle + '=' + item.target + '.' + item.targethandle
        }
        else{
          sql += ' AND {CUBE}.' + item.sourcehandle + '=' + item.target + '.' + item.targethandle
        }        
      })
      
      if (indexOfTarget !=-1)
      {

        if (data.items.legth==undefined || data.items.legth==0)
        {
          is_join_removed=true;
          doc.cubes.joins.splice(indexOfTarget, 1);          
        }
        else{
          if (sql===''){
            doc.cubes.joins.splice(indexOfTarget, 1);            
          }
          else{
            doc.cubes.joins[indexOfTarget].sql=sql
          }          
        }        
      }
      else if (indexOfTarget==-1) {
        doc.cubes.joins.push({'name':data.edge.target,'sql':sql,'relationship': 'one_to_many'})
      }
      else{
        error='invalid yaml file'
      }

      if (error=='') {        
        let backup_status = model_file_backup(directoryPath, data.edge.source)

        if (backup_status.status_code==200)
        {
         
         let return_status1=await writeAsync_file(path.join(directoryPath, model_file), doc)
         return_status1.status_code==200? error='': error=return_status1.error
        }
        else{
          error=backup_status.error
        }
      }
      
    } catch (e) {
      console.error(e);
      error=e.message
    }

    if (error==''){
      if (is_join_removed){
        return {'status_code':200,'msg':`deleted 1 join, modal file name: ${model_file}` }
      }      
      return {'status_code':200,'msg':`Updated ${edgeCount} field(s) mapping, modal file name: ${model_file}`}
    }
    else{
      return {'status_code':500,'msg':error}
    }
  }

module.exports = {
    readFilesFromDirectory, call_read_files,read_all_nodes_edges,get_node_list,get_specific_nodes, get_node,
    get_node_options, update_edges
}


