// To Find Users who are Not Submitted Task between 15 oct-2020 and 31-oct-2020:

db.tasks.aggregate([
  {
    $match: {
      status: "Pending",
      dueDate: { $gte: "2020-10-15", $lte: "2020-10-31" },
    },
  },
  {
    $group: {
      _id: "$assignedTo",
      pendingTaskCount: { $sum: 1 },
      pendingTaskDetails: {
        $push: { taskName: "$taskName", dueDate: "$dueDate" },
      },
    },
  },
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "_id",
      as: "userDetails",
    },
  },
  { $unwind: "$userDetails" },
  {
    $project: {
      _id: 0,
      studentName: "$userDetails.studentName",
      noOfTasksPending: "$pendingTaskCount",
      pendingTaskDetails: "$pendingTaskDetails",
    },
  },
]);
