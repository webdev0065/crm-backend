const Lead = require("../models/LeadModel");

exports.createdLead = async (req, res) => {
    try {

      if (!req.body.name || !req.body.email) {
        return res.status(400).json({ message: "Name and email are required" });
      }
  
      
      const lead = new Lead({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone || '',
        company: req.body.company || '', 
        status: req.body.status || "New",  
        assignedTo: req.user.id || '', 
      });
  
      await lead.save();
      res.status(201).json(lead); 
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({ assignedTo: req.user.id });
    res.json(leads); // Send retrieved leads
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getLeadsById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.json(lead); // Send the found lead
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
    
  }
};

exports.updateLead = async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id, // Correct parameter for finding the lead by ID
      req.body, // Update data
      { new: true } // Return the updated lead
    );
    if (!updatedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.json(updatedLead); // Send updated lead
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.json({ message: "Lead deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
