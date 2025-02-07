const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  status: { 
    type: String, 
    enum: ["New", "In Progress", "Converted"],  
    default: "New" 
  },
  assignedTo: { 
    type: mongoose.Schema.Types.ObjectId,  
    ref: "User" 
  },  
  company: { 
    type: String 
  },
}, { timestamps: true });

module.exports = mongoose.model("Lead", LeadSchema);
