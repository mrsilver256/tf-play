const tf = require('@tensorflow/tfjs-node');

// Define a model for linear regression
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [1]}));

// Prepare the model for training: Specify the loss and the optimizer
model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

// Generate some synthetic data for training
const xs = tf.tensor2d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,14,15], [15, 1]);
const ys = tf.tensor2d([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], [15, 1]);

// Train the model using the data
// model.fit(xs, ys, {epochs: 2000}).then(() => {
//   // Use the model to do inference on a data point the model hasn't seen before:
  
//   // model.save('file://./silver');
// });
// model.loadLayerModel('file://./silver').then(() => {
//   console.log(model.predict(tf.tensor2d([100], [1, 1])).dataSync());
// })
async function loadModel() {
  const model = await tf.loadLayersModel('file://./silver/model.json');
  return model;
}
loadModel().then((model) => {
  console.log(model.predict(tf.tensor2d([100, 12123,223], [3, 1])).dataSync());
})