const tf = require("@tensorflow/tfjs-node");
// const tf = require("@tensorflow/tfjs");
const natural = require("natural");
const fs = require('fs');
const path = require('path');

async function loadModel(name) {
  const model = await tf.loadLayersModel(`file://./silver/${name}/model.json`);
  return model;
}

const saveModel = (model, name) => {
  model.save(`file://./silver/${name}`);
}

// ================


// Load and preprocess text data
async function preprocessTextData(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(content.toLowerCase());

  const wordIndex = {};
  const indexWord = [];
  let index = 1;

  const sequences = tokens.map(token => {
    if (!wordIndex[token]) {
      wordIndex[token] = index;
      indexWord[index] = token;
      index++;
    }
    return wordIndex[token];
  });

  // Create input-output pairs
  const seqLength = 10; // length of each input sequence
  const inputSequences = [];
  const outputSequences = [];

  for (let i = 0; i < sequences.length - seqLength; i++) {
    inputSequences.push(sequences.slice(i, i + seqLength));
    outputSequences.push(sequences[i + seqLength]);
  }

  const inputTensor = tf.tensor2d(inputSequences);
  const outputTensor = tf.tensor1d(outputSequences, 'float32');

  return { inputTensor, outputTensor, wordIndex, indexWord };
}

async function trainModel(inputTensor, outputTensor, vocabSize) {
  const model = tf.sequential();
  model.add(tf.layers.embedding({ inputDim: vocabSize, outputDim: 50, inputLength: inputTensor.shape[null, 10] }));
  model.add(tf.layers.lstm({ units: 100, returnSequences: true }));
  model.add(tf.layers.lstm({ units: 100 }));
  model.add(tf.layers.dense({ units: vocabSize, activation: 'softmax' }));

  model.compile({
    optimizer: 'adam',
    loss: 'sparseCategoricalCrossentropy',
    metrics: ['accuracy']
  });

  await model.fit(inputTensor, outputTensor, {
    epochs: 20,
    batchSize: 64,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(`Epoch ${epoch}: loss = ${logs.loss}, accuracy = ${logs.acc}`);
      }
    }
  });
  saveModel(model, 'my_text');
  return model;
}

async function generateText(model, startText, wordIndex, indexWord, seqLength, numWords) {
  const tokenizer = new natural.WordTokenizer();
  let inputTokens = tokenizer.tokenize(startText.toLowerCase()).map(word => wordIndex[word]);
  for (let i = 0; i < numWords; i++) {
    const inputTensor = tf.tensor2d([inputTokens.slice(-seqLength)]);
    const predictions = model.predict(inputTensor);
    const predictedIndex = predictions.argMax(1).dataSync()[0];
    inputTokens.push(predictedIndex);
  }

  const generatedText = inputTokens.map(index => indexWord[index]).join(' ');
  return generatedText;
}

const run = async () => {
  
  const filePath = path.join(__dirname, 'silver/data.txt');;  // replace with your text file path
  
  const { inputTensor, outputTensor, wordIndex, indexWord } = await preprocessTextData(filePath);

  const vocabSize = Object.keys(wordIndex).length + 1;
  // const model = await trainModel(inputTensor, outputTensor, vocabSize);
  const model = await loadModel('my_text');
  const startText = 'May you be good';  // replace with your starting text
  const generatedText = await generateText(model, startText, wordIndex, indexWord, 10, 12);
  console.log('Generated Text:', generatedText);
};

run();
