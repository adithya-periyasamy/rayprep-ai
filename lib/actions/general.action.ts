"use server";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";

import { feedbackSchema } from "@/constants";
import { db } from "@/firebase/admin";

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript, feedbackId } = params;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    // Create Google AI instance with explicit API key
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });

    const { object } = await generateObject({
      model: google("gemini-2.5-flash"),
      schema: feedbackSchema,
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
        `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
    });

    const feedback = await db.collection("feedback").add({
      interviewId: interviewId,
      userId: userId,
      totalScore: object.totalScore,
      categoryScores: object.categoryScores,
      strengths: object.strengths,
      areasForImprovement: object.areasForImprovement,
      finalAssessment: object.finalAssessment,
      createdAt: new Date().toISOString(),
    });

    // let feedbackRef;

    // if (feedbackId) {
    //   feedbackRef = db.collection("feedback").doc(feedbackId);
    // } else {
    //   feedbackRef = db.collection("feedback").doc();
    // }

    // await feedbackRef.set(feedback);

    return { success: true, feedbackId: feedback.id };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return { success: false };
  }
}

// export async function createFeedback(params: CreateFeedbackParams) {
//   const { interviewId, userId, transcript, feedbackId } = params;

//   console.log("=== CREATE FEEDBACK START ===");
//   console.log("Params:", {
//     interviewId,
//     userId,
//     transcriptLength: transcript?.length,
//     feedbackId,
//   });

//   try {
//     // Step 1: Validate
//     if (!interviewId || !userId || !transcript || transcript.length === 0) {
//       console.error("❌ Validation failed");
//       return { success: false, error: "Missing required parameters" };
//     }
//     console.log("✓ Validation passed");

//     // Step 2: Format transcript
//     console.log("Step 2: Formatting transcript...");
//     const formattedTranscript = transcript
//       .map(
//         (sentence: { role: string; content: string }) =>
//           `- ${sentence.role}: ${sentence.content}\n`
//       )
//       .join("");
//     console.log("✓ Transcript formatted. Length:", formattedTranscript.length);

//     // Step 3: Check API Key
//     console.log("Step 3: Checking API key...");
//     if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
//       console.error("❌ API key is missing!");
//       return { success: false, error: "API key not configured" };
//     }
//     console.log("✓ API key exists");

//     // Step 4: Create Google AI instance
//     console.log("Step 4: Creating Google AI instance...");
//     const google = createGoogleGenerativeAI({
//       apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
//     });
//     console.log("✓ Google AI instance created");

//     // Step 5: Generate feedback
//     console.log("Step 5: Calling Gemini API...");
//     let object;
//     try {
//       const result = await generateObject({
//         model: google("gemini-2.0-flash-exp"),
//         schema: feedbackSchema,
//         prompt: `
//           You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.

//           Transcript:
//           ${formattedTranscript}

//           Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
//           - **Communication Skills**: Clarity, articulation, structured responses.
//           - **Technical Knowledge**: Understanding of key concepts for the role.
//           - **Problem-Solving**: Ability to analyze problems and propose solutions.
//           - **Cultural & Role Fit**: Alignment with company values and job role.
//           - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
//           `,
//         system:
//           "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
//       });
//       object = result.object;
//       console.log("✓ AI feedback generated:", {
//         totalScore: object.totalScore,
//         categoriesCount: object.categoryScores?.length,
//       });
//     } catch (aiError) {
//       console.error("❌ AI Generation Error:", aiError);
//       return {
//         success: false,
//         error: `AI generation failed: ${
//           aiError instanceof Error ? aiError.message : "Unknown"
//         }`,
//       };
//     }

//     // Step 6: Save to Firestore
//     console.log("Step 6: Saving to Firestore...");
//     try {
//       const feedbackData = {
//         interviewId: interviewId,
//         userId: userId,
//         totalScore: object.totalScore,
//         categoryScores: object.categoryScores,
//         strengths: object.strengths,
//         areasForImprovement: object.areasForImprovement,
//         finalAssessment: object.finalAssessment,
//         createdAt: new Date().toISOString(),
//       };

//       console.log("Feedback data prepared:", feedbackData);

//       const feedback = await db.collection("feedback").add(feedbackData);

//       console.log("✓ Saved to Firestore with ID:", feedback.id);
//       console.log("=== CREATE FEEDBACK SUCCESS ===");

//       return { success: true, feedbackId: feedback.id };
//     } catch (firestoreError) {
//       console.error("❌ Firestore Error:", firestoreError);
//       return {
//         success: false,
//         error: `Firestore failed: ${
//           firestoreError instanceof Error ? firestoreError.message : "Unknown"
//         }`,
//       };
//     }
//   } catch (error) {
//     console.error("=== CREATE FEEDBACK FAILED ===");
//     console.error("Unexpected error:", error);
//     if (error instanceof Error) {
//       console.error("Error message:", error.message);
//       console.error("Error stack:", error.stack);
//     }
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : "Unknown error",
//     };
//   }
// }

export async function getInterviewById(id: string): Promise<Interview | null> {
  const interview = await db.collection("interviews").doc(id).get();

  return interview.data() as Interview | null;
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  const { interviewId, userId } = params;

  const querySnapshot = await db
    .collection("feedback")
    .where("interviewId", "==", interviewId)
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .limit(1)
    .get();

  if (querySnapshot.empty) return null;

  const feedbackDoc = querySnapshot.docs[0];
  return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  const interviews = await db
    .collection("interviews")
    .orderBy("createdAt", "desc")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[] | null> {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}
