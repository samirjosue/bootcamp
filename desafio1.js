const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

function logRequest(req, res, next){
  console.count("Número de requisições");

  return next();
}

function checkProjectExists(req, res, next){
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if(!project){
    return res.status(400).json({error: 'Project not found'});
  }

  return next();
}

server.get('/projects', (req, res)=>{
  return res.json(projects);
});

server.get('/projects/:id', checkProjectExists, (req, res)=>{
  const { id } = req.params;
  const index = projects.find(p => p.id == id);

  return res.json(index);
});

server.post('/projects', (req, res)=>{
  const { id, title } = req.body;
  
  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);

});

server.post('/projects/:id/tasks', checkProjectExists, (req, res)=>{
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  console.log(project);
  project.tasks.push(title);

  return res.json(project);
});

server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body
  const project = projects.find(p => p.id == id);
  
  project.title = title;

  return res.json(project);

});

server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.find(p => p.id == id);

  projects.splice(projectIndex, 1);
  return res.send();
})

server.listen(3000);