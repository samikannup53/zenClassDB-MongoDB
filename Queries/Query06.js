// To Find All Mentors with who has the mentee's count more than 5:

db.users.aggregate([
  { $group: { _id: "$mentorID", menteesCount: { $sum: 1 } } },
  { $match: { menteesCount: { $gt: 5 } } },
  {
    $lookup: {
      from: "mentors",
      localField: "_id",
      foreignField: "_id",
      as: "mentorDetails",
    },
  },
  { $unwind: "$mentorDetails" },
  {
    $project: {
      mentorID: "$_id",
      mentorName: "$mentorDetails.mentorName",
      mentorEmail: "$mentorDetails.mentorEmail",
      menteesCount: "$menteesCount",
      _id: 0,
    },
  },
]);
