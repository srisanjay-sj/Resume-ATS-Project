import { parseResume } from "../utils/resumeParser.js";
import { extractKeywords } from "../utils/keywordExtractor.js";
import { calculateATSScore } from "../utils/atsScore.js";
import { analyzeWithGemini } from "../utils/aiAnalyzer.js";
import Resume from "../models/Resume.js";

export const uploadResume = async (req, res) => {
  try {
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const text = await parseResume(req.file.buffer);

    res.json({
      success: true,
      preview: text.substring(0, 500),
      text: text,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const analyzeResume = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({ error: "Missing resumeText or jobDescription" });
    }

    const jdKeywords = extractKeywords(jobDescription);
    const resumeKeywords = extractKeywords(resumeText);

    const atsScore = calculateATSScore(jdKeywords, resumeKeywords);
    const aiSuggestions = await analyzeWithGemini(resumeText, jobDescription);

    const report = aiSuggestions?.analysis ?? aiSuggestions ?? {};

    const savedResume = await Resume.create({
      userId: req.user.id,
      resumeText,
      jobDescription,
      atsScore,
      strengths: report.strengths || [],
      missingSkills: report.missingSkills || [],
      suggestions: report.suggestions || [],
      bulletPointImprovements: report.bulletPointImprovements || [],
    });

    res.json({
      success: true,
      atsScore,
      suggestions: aiSuggestions,
      savedId: savedResume._id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getResumeHistory = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id }).sort({ createdAt: -1 });

    res.json({
      success: true,
      resumes,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};