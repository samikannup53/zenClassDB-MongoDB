// To Find Users who are Absent between 15 oct-2020 and 31-oct-2020:

db.attendance.aggregate([
  { $match: { status: "Absent" } },
  {
    $lookup: {
      from: "topics",
      localField: "topicID",
      foreignField: "_id",
      as: "topicDetails",
    },
  },
  { $unwind: "$topicDetails" },
  {
    $match: { "topicDetails.date": { $gte: "2020-10-15", $lte: "2020-10-31" } },
  },
  {
    $group: {
      _id: "$userID",
      noOfDaysAbsent: { $sum: 1 },
      absentDetails: {
        $push: { date: "$topicDetails.date", topic: "$topicDetails.topic" },
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
      studentName: "$userDetails.studentName",
      totalAbsent: "$noOfDaysAbsent",
      details: "$absentDetails",
      _id: 0,
    },
  },
]);
