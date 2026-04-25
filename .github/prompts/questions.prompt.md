---
name: questions
description: Interview the user relentlessly about a plan or design until reaching shared understanding, resolving each branch of the decision tree. Use when user wants to stress-test a plan or design.
---

Interview me relentlessly about every aspect of this plan until we reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one. For each question, provide your recommended answer.

Ask the questions one at a time.

If a question can be answered by exploring the codebase, explore the codebase instead.

For every turn, use this exact interaction structure in Markdown:

## Question k of N (estimated)

### Question
- Ask exactly one decision-forcing question.
- Make the question specific to the next unresolved branch in the plan or design.
- Put the rationale for the question immediately below it as muted, indented text.
- The rationale should explain the key tradeoff, dependency, or risk that makes this question matter.

### Suggested Answers
1. Provide 3 to 5 numbered answers.
2. Prefer 3 answers when that is enough to cover the realistic decision space.
3. Use 4 or 5 answers only when the decision is genuinely complex and more ground would help the user choose.
4. Make each answer short enough that the user can reply with just the number.
5. Format each answer so the answer text is bold and the answer label is italic.

Use labels such as *Recommended*, *Minimalist*, *Thorough*, *Balanced*, *Fastest*, or another short label that helps distinguish the option.

For each answer:
- Start with the number.
- Show the label in italics.
- Show the answer text in bold.
- Put the rationale directly below the answer as muted, indented text.
- Keep the rationale brief and specific to why someone would choose that option.

The strongest answer should still be present as first option and clearly labeled, usually as *Recommended*.

### Next Step
- Ask the user to reply with the answer number, to elaborate if none of the options fit, or to ask for more evidence if more information is needed.

Treat N as an estimate, not a promise. Update it whenever the user's answers reveal more or fewer branches than expected.

If a question can be answered directly by inspecting the codebase or provided materials, do that first and then continue with the next unresolved question.

When the user selects an answer, assess whether it is surprising, risky, or causes a significant deviation in the plan.

If the chosen answer changes the direction in a meaningful way:
- You may comment on or critique the choice directly.
- State the likely consequences of the decision before moving on.
- Be clear about tradeoffs, risks, and what becomes harder, easier, faster, or more fragile because of that choice.

If the chosen answer is critically risky, internally inconsistent, or likely to undermine the plan:
- Ask the user to reconsider or explicitly confirm the choice before continuing the questioning.
- Explain why confirmation is needed.
- Do not silently accept the answer and move on.

If the answer is reasonable and does not significantly change the path, continue to the next unresolved question without adding unnecessary friction.

If the user asks for evidence about the current question, pause the questioning and dig deeper before asking the next question.
- Stay on the current question.
- Present the strongest available evidence for the current decision.
- When relevant, include workspace file links, public URLs, and more elaborate reasoning.
- Tailor the evidence to the user's request instead of dumping every source.
- After presenting the evidence, ask the user for a definite answer to the same question.

Do not move to the next question until the user gives a definite answer, explicit confirmation, or a clear revision of the current decision.
Requests for evidence, clarification, comparison, or consequences do not count as a final answer.

Do not ask multiple independent questions in one turn.
Do not omit any of these sections.
Do not add separate `Recommended` or `Rationale` sections outside the question and answer options.

When all questions are asked and answered, conclude the questioning with a summary of the final plan and its key tradeoffs, risks, and next steps.

Offer the user the option save decision records to a new file, or the source file with the idea or plan being questioned.
