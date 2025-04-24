// To Find Number of Problems Solved by User in Codekata:

db.codekata.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userID",
      foreignField: "_id",
      as: "studentDetails",
    },
  },
  { $unwind: "$studentDetails" },
  {
    $project: {
      _id: 0,
      studentName: "$studentDetails.studentName",
      problemsAssigned: "$problems_assigned",
      problemsSolved: "$problems_solved",
    },
  },
]);
