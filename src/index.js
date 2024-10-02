const express = require('express');
const read_file = require('./read_files');
const cube_file = require('./cube_files');
const cors = require('cors')
const { spawn } = require('child_process');
const { CognitoJwtVerifier } = require('aws-jwt-verify');
const config = require('../config');

const app = express();
const PORT = config.httpPORT;
const HOSTNAME = config.HOSTNAME;

app.use(express.json());

app.use(cors())


const verifier = CognitoJwtVerifier.create({
  userPoolId: "us-east-1_koFA1ckBa",
  tokenUse: "access",
  clientId: "46a24s5i84rogfpop4ok6kcr8e",
});

// Middleware to verify the token
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; 
    const payload = await verifier.verify(token);
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).send('Unauthorized');
  }
};

app.use(verifyToken);


let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];


app.get('/cubefile', async (req, res) => {
  let obj_return = await cube_file.get_cube_file()
  res.json(obj_return);
});

app.get('/allnodes', async (req, res) => {
  let obj_return = await read_file.read_all_nodes_edges()
  res.json(obj_return);
});

app.post('/specificnodes', async (req, res) => {
  const nodelist=req.body;
  let obj_return = await read_file.get_specific_nodes(nodelist)
  res.json(obj_return);
});


app.post('/nodeOptions', async (req, res) => {
  const nodelist=req.body;
  let obj_return = await read_file.get_node_options(nodelist)
  res.json(obj_return);
});

app.post('/update_edge', async (req, res) => {
  const data=req.body;
  let return_status = await read_file.update_edges(data)  
  res.json(return_status);
});

app.post('/addnode', async (req, res) => {
  const node=req.body;
  let obj_return = await read_file.get_node(node)
  res.json(obj_return);
});


app.get('/nodelist', async (req, res) => {
    let obj_return = await read_file.get_node_list()
    res.json(obj_return);
});


app.get('/nodes', async (req, res) => {
  let obj_return = await read_file.call_read_files()
  res.json(obj_return);
});

app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');
  res.json(item);
});

app.get('/items1', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');
  res.json(item);
});

app.put('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');

  item.name = req.body.name;
  res.json(item);
});

app.delete('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');

  const index = items.indexOf(item);
  items.splice(index, 1);

  res.json(item);
});


const server = app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});
