# 🗂️ MongoDB Management System for ZenClass

This project demonstrates a simple **MongoDB Database Management System** to manage **Users**, **CodeKata** challenges, **Attendance**, **Topics**, **Tasks**, **Company Drives**, and **Mentors**. It allows the creation and management of key collections, sample data, and MongoDB operations to interact with the database.

## 🛠️ **Database Structure**

1. **Users**: Stores user details such as name, email, mentor ID, and batch.
2. **CodeKata**: Contains the number of problems solved by each user.
3. **Attendance**: Records user attendance status for specific dates.
4. **Topics**: Stores the topics taught on specific dates.
5. **Tasks**: Contains tasks assigned to users based on topics.
6. **Company Drives**: Tracks company drives and the students who appeared for them.
7. **Mentors**: Contains mentor details and the students they mentor.

## 📥 **Create and Insert Data into Database**

You can insert sample data into the collections using MongoDB's `insertMany()` method to populate the respective collections with data. This process involves inserting relevant data for users, tasks, codekata problems, and attendance, which will enable you to test queries and data management operations.

## 🔄 **Operations**

This MongoDB Database Management System allows performing various operations such as:

- **Find All Topics** taught in a specific time frame.
- **Find All Tasks** assigned during a particular date range.
- **Find Company Drives** that occurred between specific dates.
- **Retrieve the Total Number of Problems Solved by Each User** from the CodeKata collection.
- **Mentor Information**: Find mentors with a certain number of mentees.

---

<h3 align="center" style="color: fuchsia"><b>👀 Thanks for Exploring My MongoDB Management System Repository! 💖</b></h3>
