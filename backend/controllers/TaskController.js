import TaskModel from "../models/Task.js";

export const getAll = async (req, res) => {
  try {
    const tasks = await TaskModel.find().populate("user").exec();
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error occured when getting all task",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const taskId = req.params.id;
    TaskModel.findOneAndUpdate(
      {
        _id: taskId,
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Can't get a task",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Task not found",
          });
        }

        res.json(doc);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error occured when getting task",
    });
  }
};

export const getUserTasks = async (req, res) => {
  try {
    const userId = req.params.id;
    TaskModel.find(
      {
        user: userId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Can't get user's tasks",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "User tasks not found",
          });
        }

        res.json(doc);
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error occured when getting user's tasks",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    TaskModel.findOneAndRemove(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Can't delete a task",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Task for deleting not found",
          });
        }

        res.json({ success: true });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error occured when deleting task",
    });
  }
};

export const update = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
      return res.status(500).json({
        message: "No data to update",
      });
    }
    const postId = req.params.id;
    await TaskModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        text: req.body.text,
        completed: req.body.completed,
        user: req.userId,
      },
      {
        new: true,
      }
    )
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Task not found",
          });
        }
        res.json(doc);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: "Can't return task",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Eror occured when updating task",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new TaskModel({
      text: req.body.text,
      user: req.userId,
      completed: req.body.completed || false,
    });

    const post = await doc.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Can't create a task",
    });
  }
};
