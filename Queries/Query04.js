// To Find all Company Drives & students Appeared for Placement:

db.company_drives.aggregate([
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
