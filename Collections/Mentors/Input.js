//To Create and Insert Documents(Data) into Mentors Collection(Table)//

db.mentors.insertMany([
    { _id: 'MID001', mentorName: 'Saran', mentorEmail: "saran@zen.com"},
    { _id: 'MID002', mentorName: 'Thiru', mentorEmail: "thiru@zen.com"},
  ])