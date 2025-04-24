//To find All the Tasks which are Assigned in the month of October:

db.tasks.aggregate([
  { $match: { dueDate: { $gte: "2020-10-01", $lte: "2020-10-31" } } },
  {
    $group: {
      _id: { taskId: "$taskId", taskName: "$taskName", dueDate: "$dueDate" },
    },
  },
  {
    $project: {
      taskId: "$_id.taskId",
      taskName: "$_id.taskName",
      dueDate: "$_id.dueDate",
      _id: 0,
    },
  },
  { $sort: { taskId: 1 } },
]);
