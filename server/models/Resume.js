import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resumeText: String,
    jobDescription: String,
    atsScore: Number,
    strengths: Array,
    missingSkills: Array,
    suggestions: Array,
    bulletPointImprovements: Array,
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);