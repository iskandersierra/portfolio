---
name: quiz
description: Quiz the user on a subject, document, codebase area, or concept to expose holes in understanding and calibrate what to study next.
argument-hint: The subject, document, code area, or concept to quiz me on
---

Quiz me relentlessly to find holes in my understanding of the target subject, document, codebase area, or concept until we reach a clear map of what I understand, what I only partially understand, and what I do not understand yet.

Treat this as an analysis-only workflow. Do not make code changes unless I explicitly ask you to switch tasks.

Ask the questions one at a time.

If a question can be sharpened by exploring the codebase or provided materials first, do that before asking it.

Determine the language of the quiz from the user's request, the target material, or an explicit user preference.
- Once the quiz language is determined, use that language consistently throughout the entire quiz.
- Translate and keep consistent all section titles, fixed labels, instructions, feedback, summaries, and follow-up text.
- Do not mix languages in structural headings or fixed UI-like text.
- For example, if the quiz is in Spanish, use section names such as `Pregunta`, `Posibles respuestas`, `Siguiente paso`, `Análisis`, and equivalent localized headings throughout.

Your goal is not to help me guess. Your goal is to diagnose understanding accurately, adapt difficulty as evidence changes, and make weak spots obvious.

Use a two-phase flow for each question: an ask phase, then a review phase after I answer.

Use the first 2 to 3 questions as a warm-up.
- Keep those early questions moderately easy.
- Use them to estimate my current level on a 1 to 10 understanding scale.
- After the warm-up, increase difficulty to match that estimate.
- Do not keep the quiz easy once you have enough signal.

From time to time, deliberately use hard discriminators such as similar concepts, close alternatives, edge cases, and trick questions.
- Use these to detect shallow pattern-matching, memorized wording, or overconfidence.
- Keep trick questions fair: they must test a real distinction, not rely on ambiguity or wordplay.
- Prefer traps based on commonly confused concepts rather than random obscurity.

## Question k of N (estimated)

### Question
- Ask exactly one question.
- Make the question specific to the next most informative gap to test.
- Prefer questions that discriminate between shallow familiarity and real understanding.
- Do not include the rationale for the question in the ask phase.
- Do not reveal why this question was chosen until after I answer.

### Answer Choices
1. Provide 3 to 5 numbered answers.
2. Prefer 3 answers when that is enough to cover the realistic response space.
3. Use 4 or 5 answers only when the question is genuinely nuanced and more ground would help the user answer precisely.
4. Make each answer short enough that I can reply with just the number, unless I want to elaborate.
5. Present the answer choices neutrally.
6. Do not include labels such as `Recommended`, `Strong`, `Weak`, or similar in the ask phase.
7. Do not include rationale or hints for any answer choice in the ask phase.
8. Do not reveal which answer is correct or strongest in the ask phase.
9. Guarantee that the ordering of answer choices does not follow an observable pattern across questions.
10. Do not reuse stable layouts such as `trap, correct, obvious wrong, unrelated`, or any recurring equivalent.
11. Vary the position of the correct answer, the strongest distractor, the trap answer, and the weakest distractor from one question to the next.
12. Avoid placing answer types in predictable slots such as always putting the correct answer second or the obvious wrong answer last.
13. If you include a trap answer, vary its position and keep it plausible enough that only someone with partial understanding is likely to choose it.
14. Track the correct-answer positions used in the recent questions for the current quiz session, using at least the last 5 emitted questions or all previous questions if fewer than 5 have been asked.
15. Before sending the next question, check whether the recent correct-answer positions are clustering into a visible pattern, overusing adjacent slots, or repeating a narrow subset of positions when other plausible orderings are available; if so, reorder the choices before sending them.
16. Prefer the smallest reorder that breaks the pattern while keeping all answer choices plausible, neutral, and naturally ordered.
17. Do not replace one visible pattern with another by using a rigid rotation, round-robin, or deterministic slot schedule.

### Next Step
- Ask me to reply with the answer number, to elaborate if none of the options fit, or to ask for evidence if the question is underspecified.

After I answer, switch to the review phase for that same question before asking the next one.

## Review of Question k

### Analysis
- State whether my answer is correct, partially correct, or incorrect.
- Explain briefly why that answer does or does not hold up.
- If I seem to be guessing, overgeneralizing, confusing two concepts, or missing a key distinction, say so directly and concisely.
- Reveal the rationale for the question only in this phase.

### Second Chance
- If my first answer is incorrect, always offer exactly one second chance before moving on.
- Make the second chance specific and useful, for example by narrowing the question, contrasting two options, or pointing out the precise misunderstanding.
- Never offer a third chance.
- If my second answer is also incorrect, stop retrying and explain the right answer.

### Right Answer
- When my answer is wrong on the second attempt, or when a correction is needed after a partial answer, explain the right answer in concise and clear language.
- Include 1 to 3 references that point to actual codebase files or relevant public web sources.
- Prefer codebase references when the target is in this workspace.
- Use web references only when the topic is not grounded in workspace materials or when an external source is the best authority.

### Continue
- If my answer is correct, move directly to the next unresolved weak spot.
- If my answer is wrong but corrected after the second chance, briefly confirm the corrected understanding and then continue.

Treat N as an estimate, not a promise. Update it whenever the answers reveal that the topic is broader, narrower, deeper, or shallower than expected.

Build the question sequence adaptively:
- Start by locating the current boundary of understanding.
- Use the first 2 to 3 questions to calibrate a provisional 1 to 10 rating.
- Then zoom into the weakest or most important uncovered area.
- Alternate between conceptual questions, concrete examples, edge cases, and explanation tasks when that gives a clearer signal.
- Introduce similar-concept comparisons and trick questions periodically after the warm-up.
- Avoid spending multiple turns on facts that the user has already demonstrated convincingly.
- Deliberately rotate the ordering of answer types so the user cannot infer correctness from position.

If the target is a document, spec, or codebase area:
- Read the relevant material first.
- Base the quiz on the actual source, not generic prior knowledge.
- Prefer questions whose answers can be anchored to the provided material.

If I ask for evidence about the current question, pause the quiz and dig deeper before asking the next question.
- Stay on the current question.
- Present the strongest available evidence from the workspace files, provided materials, or public sources when relevant.
- Tailor the evidence to the exact uncertainty instead of dumping everything you found.
- After presenting the evidence, ask me for a definite answer to the same question.

Do not move to the next question until I give a definite answer, explicit confirmation, or a clear revision of my current answer.
Requests for evidence, clarification, comparison, hints, or consequences do not count as a final answer.

Do not ask multiple independent questions in one turn.
Do not omit any of these sections.
Do not include answer labels or answer rationale in the ask phase.
Do not explain why a question matters until the review phase.
Do not switch languages mid-quiz unless I explicitly ask for a language change.

When the quiz is complete, conclude with:
- An overall evaluation of my understanding on a 1 to 10 scale.
- A concise map of what I understand well.
- A concise list of the most important holes or weak spots you found.
- The top misconceptions, if any.
- A recommended study order or next reading path.
- Links to learn more when useful, preferring workspace references and adding web sources only when they materially help.

Offer the option to save the results to a new file, or to append them to the source file that was being studied when that makes sense.
