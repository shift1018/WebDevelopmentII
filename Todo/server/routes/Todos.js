const express = require("express");

const router = express.Router();
const { Todos } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


// GET /api/todos
router.get("/",  async (req, res) => {
  const listOfTodos = await Todos.findAll();
  res.json(listOfTodos);
});


router.get('/byId/:id', async (req,res)=>{
  const id = req.params.id;
  const td = await Todos.findByPk(id);
  res.json(td);

})


// POST /api/Todos
router.post("/", validateToken, async (req, res) => { 
  const td = req.body;
  td.username = req.user.username;
  td.UserId = req.user.id;
  await Todos.create(td);
  res.json(td);
});

router.put("/update/:id", validateToken, async(req,res)=>{
  const id = req.params.id;
  const td = req.body;
  await Todos.update({ task: td.task, dueDate: td.dueDate ,isDone: td.isDone}, { where: { id: id } });
  res.json(req.body);
 
  });



router.delete("/delete/:id", validateToken, async(req,res)=>{
  const aucid = req.params.id;
  await Todos.destroy({
    where:{
      id: aucid
    }
  });
  res.json("delete")
});


module.exports = router;

