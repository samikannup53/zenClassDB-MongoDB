# MongoDB Management System for ZenClass 🗂️

This project demonstrates a simple **MongoDB Database Management System** to manage **Users**, **CodeKata** challenges, **Attendance**, **Topics**, **Tasks**, **Company Drives**, and **Mentors**. It allows the creation and management of key collections, sample data, and MongoDB operations to interact with the database.

## **Database Structure** 🛠️

The **ZenClassDB** contains the following collections:

1. **Users**: Stores user details such as name, email, mentor ID, and batch.
2. **CodeKata**: Contains the number of problems solved by each user.
3. **Attendance**: Records user attendance status for specific dates.
4. **Topics**: Stores the topics taught on specific dates.
5. **Tasks**: Contains tasks assigned to users based on topics.
6. **Company Drives**: Tracks company drives and the students who appeared for them.
7. **Mentors**: Contains mentor details and the students they mentor.

> 🚨 **Kindly Check my Notes Folder for Sample Collection and Documents which are used here and done Query.**

## MongoDB Operations ⚙️

### Database and Collection Setup 💾📚

#### 1. Switch to the Database
```bash
 use zenClassDB
```

 If the database doesn't exist, MongoDB will automatically create it when data is inserted.
  
---

#### 2. Create Collection
```bash
 db.createCollection('collectionName')
```
Use this to create a collection in database. Replace collectionName with the desired name of your collection.

---

#### 3. Insert Sample Date into Collection
```bash
 db.collectionName.insertMany([{document1}, {document2}, ...])
```
Insert multiple documents into the specified collection. Each document can be a JSON object.

---

## Queries 🔍

#### 1. To find All the Topics which are thought in the month of October:
```bash
db.topics.find({date:{$gte:'2020-10-01', $lte:'2020-10-31'}})
```

#### Sample Output
```bash
{
  _id: 'TPC001',
  date: '2020-10-10',
  topic: 'HTML'
}
```
---

#### 2. To find All the Tasks which are Assigned in the month of October:
```bash
db.tasks.aggregate([
  {$match:{dueDate:{$gte:'2020-10-01',$lte:'2020-10-31'}}},
  {$group:{_id:{taskId:'$taskId', taskName:'$taskName',dueDate:'$dueDate'}}},
  {$project:{taskId:'$_id.taskId', taskName:'$_id.taskName', dueDate:'$_id.dueDate', _id:0}},
  {$sort:{taskId:1}} 
])
```

#### Sample Output
```bash 
{
  taskId: 'TSK001',
  taskName: 'HTML Tags',
  dueDate: '2020-10-12'
}
```
---

#### 3. To Find all Company Drives Appeared between 15 oct-2020 & 31-oct-2020:
```bash
db.company_drives.aggregate([
  {$match:{driveDate:{$gte:'2020-10-15', $lte:'2020-10-31'}}},
  {$lookup:{from:'users', localField:'studentsAppeared', foreignField:'_id', as:'appearedStudents'}},
  {$unwind:'$appearedStudents'},
  {$group:{_id:'$_id', company:{$first:'$company'}, driveDate:{$first:'$driveDate'},
    appearedStudentsDetails:{$push:'$appearedStudents.studentName'}}}
])
```
#### Sample Output
```bash 
{
  _id: 'CD002',
  company: 'Amazon',
  driveDate: '2020-10-25',
  appearedStudentsDetails: ['Logu','Sami','Ramu','Nandhu','Deepak','Rishi','Sri']
}
```
---

#### 4. To Find all Company Drives & students Appeared for Placement:
```bash
db.company_drives.aggregate([
  {$lookup:{from:'users', localField:'studentsAppeared', foreignField:'_id', as:'appearedStudents'}},
  {$unwind:'$appearedStudents'},
  {$group:{_id:'$_id', company:{$first:'$company'}, driveDate:{$first:'$driveDate'},
    appearedStudentsDetails:{$push:'$appearedStudents.studentName'}
  }}
])
```
#### Sample Output
```bash 
{
  _id: 'CD003',
  company: 'Zoho',
  driveDate: '2020-11-01',
  appearedStudentsDetails: ['Logu','Sami','Karthi','Ramu','Nandhu','Deepak','Selva','Rishi','Sri','Gokul']
}
```
---

#### 5. To Find Number of Problems Solved by User in Codekata:
```bash
db.codekata.aggregate([
  {$lookup:{from:'users', localField:'userID', foreignField:'_id', as:'studentDetails'}},
  {$unwind:'$studentDetails'},
  {$project:{
    _id:0, studentName:'$studentDetails.studentName', 
    problemsAssigned:'$problems_assigned', 
    problemsSolved:'$problems_solved'
  }}
])
```
#### Sample Output
```bash 
{
  studentName: 'Gokul',
  problemsAssigned: 10,
  problemsSolved: 6
}
```
---

#### 6. To Find All Mentors with who has the mentee's count more than 5:
```bash
db.users.aggregate([
  {$group:{_id:'$mentorID', menteesCount:{$sum:1}}},
  {$match:{menteesCount:{$gt:5}}},
  {$lookup:{from:'mentors', localField:'_id', foreignField:'_id', as:'mentorDetails'}},
  {$unwind:'$mentorDetails'},
  {$project:{
    mentorID:'$_id', 
    mentorName:'$mentorDetails.mentorName', 
    mentorEmail:'$mentorDetails.mentorEmail', 
    menteesCount:'$menteesCount',_id:0
  }}
])
```
#### Sample Output
```bash 
{
  mentorID: 'MID002',
  mentorName: 'Thiru',
  mentorEmail: 'thiru@zen.com',
  menteesCount: 7
}
```
---

#### 7. To Find Users who are Absent between 15 oct-2020 and 31-oct-2020:
```bash
db.attendance.aggregate([
  {$match:{status:'Absent'}},
  {$lookup:{from:'topics', localField:'topicID', foreignField:'_id', as:'topicDetails'}},
  {$unwind:"$topicDetails"},
  {$match:{'topicDetails.date':{$gte:'2020-10-15', $lte:'2020-10-31'}}},
  {$group:{_id:'$userID', noOfDaysAbsent:{$sum:1},
    absentDetails:{$push:{date:'$topicDetails.date', topic:'$topicDetails.topic'}}}},
  {$lookup:{from:'users', localField:'_id', foreignField:'_id', as:'userDetails'}},
  {$unwind:'$userDetails'},
  {$project: {
    studentName: "$userDetails.studentName",
    totalAbsent: "$noOfDaysAbsent",
    details: "$absentDetails",
    _id: 0
  }}
])
```
#### Sample Output
```bash 
{
  studentName: 'Sami',
  totalAbsent: 1,
  details: [
    {
      date: '2020-10-25',
      topic: 'React JS'
    }
  ]
}
```
---

#### 8. To Find Users who are Not Submitted Task between 15 oct-2020 and 31-oct-2020:
```bash
db.tasks.aggregate([
  {$match:{status:'Pending', dueDate:{$gte:'2020-10-15', $lte:'2020-10-31'}}},
  {$group:{_id:'$assignedTo', pendingTaskCount:{$sum:1},
    pendingTaskDetails:{$push:{taskName:'$taskName', dueDate:'$dueDate'}}}
  },
  {$lookup:{from:'users', localField:'_id', foreignField:'_id', as:'userDetails'}},
  {$unwind:'$userDetails'},
  {$project:{
    _id:0, studentName:'$userDetails.studentName',
    noOfTasksPending:'$pendingTaskCount',
    pendingTaskDetails:'$pendingTaskDetails'}
  }
])
```
#### Sample Output

```bash 
{
  studentName: 'Sri',
  noOfTasksPending: 2,
  pendingTaskDetails: [
    {
      taskName: 'JS Functions',
      dueDate: '2020-10-20'
    },
    {
      taskName: 'React App',
      dueDate: '2020-10-27'
    }
  ]
}
```
---

<h3 align="center" style="color: fuchsia"><b>👀 Thanks for Exploring Repository! 💖</b></h3>
