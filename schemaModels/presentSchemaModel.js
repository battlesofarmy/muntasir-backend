const mongoose = require("mongoose");

const presentSchema = mongoose.Schema({
  course: {
    type: String,
    required: true, // Course name is mandatory
  },
  date: {
    day: {
      type: String,
      required: true, // Day is mandatory
    },
    month: {
      type: String,
      required: true, // Month is mandatory
    },
  },
  present: [
    {
      type: String,
      enum: ["p", "a"], // Only 'p' (present) or 'a' (absent) is allowed
      required: true, // Attendance entry must be valid
    },
  ],
}, {versionKey : false});

const PresentModel = mongoose.model("Present", presentSchema);

module.exports = PresentModel;
