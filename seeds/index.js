const mongoose = require('mongoose');
const Job = require('../models/job');

mongoose.connect('mongodb://localhost:27017/job-portel',
    {
        useNewUrlParser: true,
        // useCreateIndex: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Database Connected successfully");
});

// const seedDB = async () => {
//     const j1 = new Job({
//         company: "Avaya", position: "Chief Financial Officer (CFO) ", salary: 250000, vacancy: 4, reruirement: "CA(Chartered Accountant)"
//     });
//     await j1.save();
//     console.log(j1);
// }
// seedDB();

// Job.deleteOne({ company: "Avaya" }).then(() => {
//     console.log("Data Deleted.")
// })
//     .catch((err) => {
//         console.log("Something went wrong!!", err);
//     })

// Job.updateOne({ company: "Nvidia" },
//     { Description: "xyz" }).then(() => {
//         console.log("Data updated.");
//     }).catch((err) => {
//         console.log("Something went wrong, err");
//     })