//To Create and Insert Documents(Data) into Users Collection(Table)//

db.users.insertMany([
    {_id:'UID001', studentName:'Logu', email:'logu@gmail.com', batch:'B01WD', mentorID:'MID001'},
    {_id:'UID002', studentName:'Sami', email:'sami@gmail.com', batch:'B01WD', mentorID:'MID001'},
    {_id:'UID003', studentName:'Karthi', email:'karthi@gmail.com', batch:'B01WD', mentorID:'MID001'},
    {_id:'UID004', studentName:'Ramu', email:'ramu@gmail.com', batch:'B02WE', mentorID:'MID002'},
    {_id:'UID005', studentName:'Nandhu', email:'nandhu@gmail.com', batch:'B02WE', mentorID:'MID002'},
    {_id:'UID006', studentName:'Deepak', email:'deepak@gmail.com', batch:'B02WE', mentorID:'MID002'},
    {_id:'UID007', studentName:'Selva', email:'selva@gmail.com', batch:'B02WE', mentorID:'MID002'},
    {_id:'UID008', studentName:'Rishi', email:'rishi@gmail.com', batch:'B02WE', mentorID:'MID002'},
    {_id:'UID009', studentName:'Sri', email:'sri@gmail.com', batch:'B02WE', mentorID:'MID002'},
    {_id:'UID010', studentName:'Gokul', email:'gokul@gmail.com', batch:'B02WE', mentorID:'MID002'}
  ])