const tf = require('@tensorflow/tfjs')

// Original data with strings
const data = [
  {
    university: "UCLA",
    techstack: ["PHP"],
    experience: 14,
    company: ["Apple", "Microsoft", "Google", "Tesla", "Netflix"],
    english: "Native",
    keywords: ["Time management", "Creativity"],
    pass: true
  },
  {
    university: "Columbia",
    techstack: ["Ruby", "JavaScript", "Java"],
    experience: 11,
    company: ["Intel"],
    english: "Beginner",
    keywords: ["Team player", "Leadership", "Time management", "Creativity"],
    pass: true
  },
  // Add more records as needed
];

// Encode categorical data into numerical values
function encodeData(data) {
  const universityEncoder = {};
  const englishEncoder = {};
  const techstackEncoder = {};
  const companyEncoder = {};
  const keywordsEncoder = {};
  
  let universityIndex = 0;
  let englishIndex = 0;
  let techstackIndex = 0;
  let companyIndex = 0;
  let keywordsIndex = 0;
  
  const encodedData = data.map(record => {
    if (!universityEncoder[record.university]) {
      universityEncoder[record.university] = universityIndex++;
    }
    if (!englishEncoder[record.english]) {
      englishEncoder[record.english] = englishIndex++;
    }
    
    record.techstack.forEach(stack => {
      if (!techstackEncoder[stack]) {
        techstackEncoder[stack] = techstackIndex++;
      }
    });
    
    record.company.forEach(comp => {
      if (!companyEncoder[comp]) {
        companyEncoder[comp] = companyIndex++;
      }
    });
    
    record.keywords.forEach(kw => {
      if (!keywordsEncoder[kw]) {
        keywordsEncoder[kw] = keywordsIndex++;
      }
    });
    
    return {
      university: universityEncoder[record.university],
      experience: record.experience,
      english: englishEncoder[record.english],
      techstack: record.techstack.map(stack => techstackEncoder[stack]),
      company: record.company.map(comp => companyEncoder[comp]),
      keywords: record.keywords.map(kw => keywordsEncoder[kw]),
      pass: record.pass ? 1 : 0
    };
  });
  
  return { encodedData, universityEncoder, englishEncoder, techstackEncoder, companyEncoder, keywordsEncoder };
}

const { encodedData, universityEncoder, englishEncoder, techstackEncoder, companyEncoder, keywordsEncoder } = encodeData(data);

// Convert data to tensors
const xs = tf.tensor2d(encodedData.map(record => [
  record.university,
  record.experience,
  record.english,
  ...record.techstack,
  ...record.company,
  ...record.keywords
]));

const ys = tf.tensor2d(encodedData.map(record => [record.pass]));

// Define a simple sequential model
const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [xs.shape[1]], units: 16, activation: 'relu' }));
model.add(tf.layers.dense({ units: 8, activation: 'relu' }));
model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' })); // Output layer with sigmoid for binary classification

// Compile the model
model.compile({
  optimizer: tf.train.adam(),
  loss: tf.losses.sigmoidCrossEntropy,
  metrics: ['accuracy']
});

// Train the model
async function trainModel() {
  const history = await model.fit(xs, ys, {
    epochs: 100,
    batchSize: 5,
    validationSplit: 0.2,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(`Epoch ${epoch + 1}: loss = ${logs.loss}, accuracy = ${logs.acc}`);
      }
    }
  });
}

// Evaluate the model
async function evaluateModel() {
  const evaluation = await model.evaluate(xs, ys);
  const loss = evaluation[0].dataSync();
  const accuracy = evaluation[1].dataSync();
  
  console.log(`Model Evaluation:\nLoss: ${loss}\nAccuracy: ${accuracy}`);
}

// Predict using new data
function predictNewData(newData) {
  // Encode new data
  const encodedNewData = {
    university: universityEncoder[newData.university],
    experience: newData.experience,
    english: englishEncoder[newData.english],
    techstack: newData.techstack.map(stack => techstackEncoder[stack]),
    company: newData.company.map(comp => companyEncoder[comp]),
    keywords: newData.keywords.map(kw => keywordsEncoder[kw]),
  };

  const inputTensor = tf.tensor2d([[
    encodedNewData.university,
    encodedNewData.experience,
    encodedNewData.english,
    ...encodedNewData.techstack,
    ...encodedNewData.company,
    ...encodedNewData.keywords
  ]]);

  const prediction = model.predict(inputTensor);
  prediction.print(); // This will show the prediction result

  const predictedValue = prediction.dataSync()[0];
  console.log(`Predicted Pass Value: ${predictedValue >= 0.5 ? 'Pass' : 'Fail'}`);
}

// Start training, evaluate, and predict
async function trainEvaluateAndPredict() {
  await trainModel();
  await evaluateModel();
  
  // Example of predicting new data
  const newData = {
    university: "UCLA",
    techstack: ["PHP"],
    experience: 14,
    company: ["Apple", "Microsoft", "Google", "Tesla", "Netflix"],
    english: "Native",
    keywords: ["Time management", "Creativity"]
  };

  predictNewData(newData);
}

trainEvaluateAndPredict();
