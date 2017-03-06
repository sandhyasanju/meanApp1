var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs("mongodb://mean:meanApp1@ds113660.mlab.com:13660/mean_app1", ["tasks"])

//routing for tasks list page
router.get("/tasks", function(request, response, next) {
    // response.send("TASKS PAGE");
    db.tasks.find(function(error, tasks) {
        if (error) {
            console.log("error in executing query");
            throw error
            response.send(error);
        }
        response.json(tasks);
    });
});

//routing for single task page
router.get("/task/:id", function(request, response, next) {
    // response.send("TASKS PAGE");
    db.tasks.findOne({ _id: mongojs.ObjectId(request.params.id) }, function(error, task) {
        if (error) {
            console.log("error in executing query");
            response.send(error);
            throw error
        }
        response.json(task);
    });
});

//post request for saving the task
router.post("/task", function(request, response, next) {
    var task = request.body;
    console.log(task.title);
    if (!task.title || !(task.doneStatus + "")) {
        response.status(400);
        response.json({
            "error": "wrong data",
        });
    } else {
        db.tasks.save(task, function(error, task) {
            if (error) {
                console.log("error in executing the query");
                response.send(error);
                throw error;
            }
            response.json(task);
        });
    }
});

//deleting a task
router.delete("/task/:id", function(request, response, next) {
    db.tasks.remove({ _id: mongojs.ObjectId(request.params.id) }, function(error, task) {
        if (error) {
            console.log("error in executing query");
            response.send(error);
            throw error
        }
        response.json(task);
    });
});

//updating a task
router.put("/task/:id", function(request, response, next) {
    var task = request.body;
    var updateTask = {};

    if (task.doneStatus) {
        updateTask.doneStatus = task.doneStatus;
    }

    if (task.title) {
        updateTask.title = task.title;
    }

    if (!updateTask) {
        response.status(400);
        response.json({
            "error": "invalid data",
        });
    } else {
        db.tasks.update({ _id: mongojs.ObjectId(request.params.id) }, updateTask, {}, function(error, task) {
            if (error) {
                console.log("error in executing query");
                response.send(error);
                throw error
            }
            response.json(task);
        });
    }
});

//exprting the router module to make use in another module
module.exports = router;