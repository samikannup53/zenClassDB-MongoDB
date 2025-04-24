// To find All the Topics which are thought in the month of October:

db.topics.find({ date: { $gte: "2020-10-01", $lte: "2020-10-31" } });
