const express = require('express');
const read_file = require('./read_files');
const cors = require('cors')
const config = require('../config');

const app = express();
const PORT = config.httpPORT;
const HOSTNAME = config.HOSTNAME;

app.use(express.json());

app.use(cors())


let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];


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

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});