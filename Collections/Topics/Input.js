//To Create and Insert Documents(Data) into Topics Collection(Table)//

db.topics.insertMany([
    { _id:'TPC001', date:"2020-10-10", topic: "HTML"},
    { _id:'TPC002', date:"2020-10-11", topic: "CSS"},
    { _id:'TPC003', date:"2020-10-17", topic: "Tailwind CSS"},
    { _id:'TPC004', date:"2020-10-18", topic: "Javascript"},
    { _id:'TPC005', date:"2020-10-24", topic: "Github"},
    { _id:'TPC006', date:"2020-10-25", topic: "React JS"},
    { _id:'TPC007', date:"2020-10-31", topic: "Redux"},
    { _id:'TPC008', date:"2020-11-01", topic: "SQL"},
    { _id:'TPC009', date:"2020-11-06", topic: "MongoDB"},
    { _id:'TPC010', date:"2020-11-07", topic: "Node JS"},
  ])