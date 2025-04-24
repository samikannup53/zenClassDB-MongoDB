// To Find all Company Drives Appeared between 15 oct-2020 & 31-oct-2020:

db.company_drives.aggregate([
  { $match: { driveDate: { $gte: "2020-10-15", $lte: "2020-10-31" } } },
  {
    $lookup: {
      from: "users",
      localField: "studentsAppeared",
      foreignField: "_id",
      as: "appearedStudents",
    },
  },
  { $unwind: "$appearedStudents" },
  {
    $group: {
      _id: "$_id",
      company: { $first: "$company" },
      driveDate: { $first: "$driveDate" },
      appearedStudentsDetails: { $push: "$appearedStudents.studentName" },
    },
  },
]);
