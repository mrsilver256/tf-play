// Note: you do not need to import @tensorflow/tfjs here, but make sure you have installed the peer dependencies for tfjs-core and tfjs-converter.
const tf = require("@tensorflow/tfjs-node");
const qna = require("@tensorflow-models/qna");
const OpenAI = require("openai");
const openai = new OpenAI({apiKey: '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'});

const run = async () => {
  // Load the model.
  const model = await qna.load();
  const question = "If the code of a core function needs to be changed because of bugs";
  const passage = `As a reviewer, you need to be objective. Because of that, if you need to code directly, do not review your own code.

General
You might say that you have enough experience to see potential bugs in your code, and you can ensure that there's no problem because you understand it. However, when you review your own code, you see it from the same point of view as when you create it. This behavior will reduce the ability to see potential problems from other points of view.

Hence, be honest! Even when you're at the highest rank or the most experienced developer on the team, ask another reviewer to review your code.

Reviewers need to answer a list of questions when reviewing code. If a question is not answered, reviewers should either request a change or work directly with the developer to clarify.

Does the code submission have enough information?
If you don't know what you're reviewing, you can't determine whether the solution and the related code are good. So, if a code submission does not have enough information such as where the problem is, what the reason is, why it occurs, and how to fix it then reviewers should reject the code submission immediately and request the developer to update the description.

Does this change serve a single purpose?
If you can answer yes, then continue with the review. If not then it might lead to a bigger question: Has the solution been correctly designed? Or, maybe worse: Has the solution misinterpreted the requirements?

Imagine the code we're reviewing is a tree, and a potential bug is a worm on the tree. Finding that worm on a tree in a pot will be much easier than on many trees in a garden.

While reviewing, if sometimes you don't know where you are, you can’t devote your full attention to the review. Hence, keeping the review focused on a single purpose helps maintain focus on the task.

Can this change be broken down?
Scale is another important aspect of both the submission and the review. Make sure only the required objects are included in the review. You may have to deal with 100 changed files because of a major refactor or redesign. Often, it always can be broken down into more reasonable chunks.

Reviewers should ensure that the specific collection of changes they are reviewing closely belong together. Mistakes rise when the complexity goes up!

Does the code adhere to the coding standards?
Continue with the review only if you can answer yes. Following coding standards shows the seriousness of the developer. Bugs are more likely to appear when a developer is not serious when resolving a problem. Even when the solution is good, if the code does not meet coding standards, ask the developer to fix it first.

Is the code well-structured?
Reviewers should pay attention to the three aspects described below.

Separation of concerns is a concept that each component or module should be independent and responsible for a single part of the functionality. It does not mean you need one component or module for each function. The intention is to ensure that you don’t have universal objects that do everything and, hence, are sensitive to change.

Keep it simple, stupid (KISS) is a design principle that states that designs or systems should be as simple as possible. Simplicity guarantees acceptance and usability. Simplicity also prevents unwanted side effects or potential bugs. Code reviewers should make sure the solution and the related code are simple.

Don’t Repeat Yourself (DRY) is about modularity and reusable. If you see similar code repeatedly, ask the developer to modularize the code to make it reusable.

Does the code change core functionality?
Unless bugs occur, the code of core functionality should be reserved. If a redesign occurs and the core functionality needs to be updated, implement a backward-compatible mechanism by extending the code instead of changing the existing code.

Doing that ensures a smooth transition from the old design to the new one. Old data are still processed correctly because the old code remains.

If the code of a core function needs to be changed because of bugs, it should only fix the bug without affecting other parts of the core functionality.`;
    
// Finding the answers
  const answers = await model.findAnswers(question, passage);

  console.log("Answers: ");
  if(answers.length > 0) {
    console.log(answers[0].text);
  } else {
    console.log("No answers found");
    // anotherBotAnswerForMe(question);
  }
};


async function anotherBotAnswerForMe(question) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: question }],
    model: "gpt-4o",
  });
  console.log(completion.choices[0]?.message.content);
}

run();
