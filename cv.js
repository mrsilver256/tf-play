// Import TensorFlow.js
const tf = require('@tensorflow/tfjs-node')
const fs = require('fs');
const path = require('path');

async function loadModel(name) {
    const model = await tf.loadLayersModel(`file://./silver/${name}/model.json`);
    return model;
}

const saveModel = (model, name) => {
    model.save(`file://./silver/${name}`);
}

const originalData = [
    {
        "YOE": 4.75,
        "Num of Projects": 4,
        "English": 2,
        "Is Frontend Heavily Required": 1,
        "Is project complicated": 0,
        "Average Team size": 15,
        "Is Lead": 1,
        "Average Year Per Company": 1.5,
        "Trustworthy Companies": 1,
        "Trustworthy Universities": 1,
        "Worked with untrustworthy companies": 0,
        "Graduated from untrusted universities": 0,
        "Pass": 1
    },
    {
        "YOE": 2.25,
        "Num of Projects": 7,
        "English": 2,
        "Is Frontend Heavily Required": 0,
        "Is project complicated": 0,
        "Average Team size": 5,
        "Is Lead": 1,
        "Average Year Per Company": 2.25,
        "Trustworthy Companies": 1,
        "Trustworthy Universities": 1,
        "Worked with untrustworthy companies": 0,
        "Graduated from untrusted universities": 0,
        "Pass": 1
    },
    {
        "YOE": 2.5,
        "Num of Projects": 3,
        "English": 0,
        "Is Frontend Heavily Required": 0,
        "Is project complicated": 1,
        "Average Team size": 11,
        "Is Lead": 0,
        "Average Year Per Company": 2.5,
        "Trustworthy Companies": 0,
        "Trustworthy Universities": 0,
        "Worked with untrustworthy companies": 0,
        "Graduated from untrusted universities": 1,
        "Pass": 1
    },
    {
        "YOE": 3.0,
        "Num of Projects": 2,
        "English": 0,
        "Is Frontend Heavily Required": 0,
        "Is project complicated": 0,
        "Average Team size": 10,
        "Is Lead": 0,
        "Average Year Per Company": 1.0,
        "Trustworthy Companies": 0,
        "Trustworthy Universities": 1,
        "Worked with untrustworthy companies": 0,
        "Graduated from untrusted universities": 0,
        "Pass": 1
    },
    {
        "YOE": 2.0,
        "Num of Projects": 2,
        "English": 0,
        "Is Frontend Heavily Required": 0,
        "Is project complicated": 0,
        "Average Team size": 10,
        "Is Lead": 1,
        "Average Year Per Company": 1.5,
        "Trustworthy Companies": 0,
        "Trustworthy Universities": 0,
        "Worked with untrustworthy companies": 0,
        "Graduated from untrusted universities": 0,
        "Pass": 1
    },
    {
        "YOE": 2.0,
        "Num of Projects": 3,
        "English": 0,
        "Is Frontend Heavily Required": 0,
        "Is project complicated": 0,
        "Average Team size": 3,
        "Is Lead": 0,
        "Average Year Per Company": 1.0,
        "Trustworthy Companies": 0,
        "Trustworthy Universities": 0,
        "Worked with untrustworthy companies": 0,
        "Graduated from untrusted universities": 0,
        "Pass": 1
    },
    {
        "YOE": 3.5,
        "Num of Projects": 5,
        "English": 1,
        "Is Frontend Heavily Required": 0,
        "Is project complicated": 0,
        "Average Team size": 10,
        "Is Lead": 0,
        "Average Year Per Company": 1.75,
        "Trustworthy Companies": 0,
        "Trustworthy Universities": 1,
        "Worked with untrustworthy companies": 0,
        "Graduated from untrusted universities": 0,
        "Pass": 1
    },
    {
        "YOE": 4.0,
        "Num of Projects": 6,
        "English": 0,
        "Is Frontend Heavily Required": 0,
        "Is project complicated": 0,
        "Average Team size": 8,
        "Is Lead": 0,
        "Average Year Per Company": 2.5,
        "Trustworthy Companies": 0,
        "Trustworthy Universities": 0,
        "Worked with untrustworthy companies": 0,
        "Graduated from untrusted universities": 0,
        "Pass": 0
    },
    {
        "YOE": 5.0,
        "Num of Projects": 10,
        "English": 0,
        "Is Frontend Heavily Required": 0,
        "Is project complicated": 0,
        "Average Team size": 10,
        "Is Lead": 1,
        "Average Year Per Company": 2.5,
        "Trustworthy Companies": 0,
        "Trustworthy Universities": 0,
        "Worked with untrustworthy companies": 0,
        "Graduated from untrusted universities": 0,
        "Pass": 0
    },
    {
        "YOE": 3.0,
        "Num of Projects": 4,
        "English": 2,
        "Is Frontend Heavily Required": 0,
        "Is project complicated": 0,
        "Average Team size": 12,
        "Is Lead": 0,
        "Average Year Per Company": 1.5,
        "Trustworthy Companies": 1,
        "Trustworthy Universities": 0,
        "Worked with untrustworthy companies": 0,
        "Graduated from untrusted universities": 1,
        "Pass": 0
    },
    {
        "YOE": 4.0,
        "Num of Projects": 6,
        "English": 2,
        "Is Frontend Heavily Required": 0,
        "Is project complicated": 0,
        "Average Team size": 10,
        "Is Lead": 0,
        "Average Year Per Company": 2.0,
        "Trustworthy Companies": 0,
        "Trustworthy Universities": 1,
        "Worked with untrustworthy companies": 0,
        "Graduated from untrusted universities": 0,
        "Pass": 0
    },
    {
        "YOE": 3.0,
        "Num of Projects": 5,
        "English": 0,
        "Is Frontend Heavily Required": 0,
        "Is project complicated": 0,
        "Average Team size": 15,
        "Is Lead": 0,
        "Average Year Per Company": 1.5,
        "Trustworthy Companies": 0,
        "Trustworthy Universities": 0,
        "Worked with untrustworthy companies": 0,
        "Graduated from untrusted universities": 1,
        "Pass": 0
    },
    {
        "YOE": 4.0,
        "Num of Projects": 6,
        "English": 1,
        "Is Frontend Heavily Required": 0,
        "Is project complicated": 0,
        "Average Team size": 10,
        "Is Lead": 1,
        "Average Year Per Company": 2.0,
        "Trustworthy Companies": 0,
        "Trustworthy Universities": 1,
        "Worked with untrustworthy companies": 1,
        "Graduated from untrusted universities": 0,
        "Pass": 0
    },
    {
        "YOE": 2.5,
        "Num of Projects": 4,
        "English": 0,
        "Is Frontend Heavily Required": 0,
        "Is project complicated": 0,
        "Average Team size": 8,
        "Is Lead": 0,
        "Average Year Per Company": 1.5,
        "Trustworthy Companies": 0,
        "Trustworthy Universities": 0,
        "Worked with untrustworthy companies": 0,
        "Graduated from untrusted universities": 1,
        "Pass": 0
    },
    {
        "YOE": 5.0,
        "Num of Projects": 6,
        "English": 1,
        "Is Frontend Heavily Required": 0,
        "Is project complicated": 0,
        "Average Team size": 12,
        "Is Lead": 1,
        "Average Year Per Company": 2.0,
        "Trustworthy Companies": 1,
        "Trustworthy Universities": 1,
        "Worked with untrustworthy companies": 0,
        "Graduated from untrusted universities": 0,
        "Pass": 0
    }
]

const newData = [
    {
        "YOE": 2.5,
        "Num of Projects": 3,
        "English": 0,
        "Is Frontend Heavily Required": 0,
        "Is project complicated": 0,
        "Average Team size": 6,
        "Is Lead": 0,
        "Average Year Per Company": 1.25,
        "Trustworthy Companies": 0,
        "Trustworthy Universities": 0,
        "Worked with untrustworthy companies": 0,
        "Graduated from untrusted universities": 0,
        "Pass": 0
    },
    {
        "YOE": 3.0,
        "Num of Projects": 2,
        "English": 0,
        "Is Frontend Heavily Required": 0,
        "Is project complicated": 0,
        "Average Team size": 10,
        "Is Lead": 1,
        "Average Year Per Company": 1.5,
        "Trustworthy Companies": 0,
        "Trustworthy Universities": 1,
        "Worked with untrustworthy companies": 0,
        "Graduated from untrusted universities": 0,
        "Pass": 0
    },
    {
        "YOE": 7.0,
        "Num of Projects": 4,
        "English": 0,
        "Is Frontend Heavily Required": 0,
        "Is project complicated": 0,
        "Average Team size": 6,
        "Is Lead": 1,
        "Average Year Per Company": 1.75,
        "Trustworthy Companies": 0,
        "Trustworthy Universities": 0,
        "Worked with untrustworthy companies": 0,
        "Graduated from untrusted universities": 0,
        "Pass": 0
    },
    {
        "YOE": 5.0,
        "Num of Projects": 9,
        "English": 0,
        "Is Frontend Heavily Required": 0,
        "Is project complicated": 0,
        "Average Team size": 6,
        "Is Lead": 1,
        "Average Year Per Company": 1.66,
        "Trustworthy Companies": 0,
        "Trustworthy Universities": 0,
        "Worked with untrustworthy companies": 0,
        "Graduated from untrusted universities": 0,
        "Pass": 0
    },

]
const data = originalData.concat(newData)

const candidates = [
    {
        "Name": "Pham Duc Anh",
        "YOE": 2.5,
        "Num of Projects": 3,
        "English": 2,
        "Is Frontend Heavily Required": 0,
        "Is project complicated": 0,
        "Average Team size": 8,
        "Is Lead": 0,
        "Average Year Per Company": 1.25,
        "Trustworthy Companies": 1,
        "Trustworthy Universities": 1,
        "Worked with untrustworthy companies": 0,
        "Graduated from untrusted universities": 0
    },
    {
        "Name": "Tran Van Hiep",
        "YOE": 3.0,
        "Num of Projects": 3,
        "English": 2,
        "Is Frontend Heavily Required": 0,
        "Is project complicated": 0,
        "Average Team size": 6,
        "Is Lead": 0,
        "Average Year Per Company": 1.5,
        "Trustworthy Companies": 0,
        "Trustworthy Universities": 1,
        "Worked with untrustworthy companies": 0,
        "Graduated from untrusted universities": 0
    },
    {
        "Name": "Dustin Ngo",
        "YOE": 3.0,
        "Num of Projects": 6,
        "English": 2,
        "Is Frontend Heavily Required": 0,
        "Is project complicated": 0,
        "Average Team size": 8,
        "Is Lead": 0,
        "Average Year Per Company": 1.5,
        "Trustworthy Companies": 1,
        "Trustworthy Universities": 0,
        "Worked with untrustworthy companies": 0,
        "Graduated from untrusted universities": 0
    },
    {
        "Name": "Ngô Việt Tùng",
        "YOE": 1.5,
        "Num of Projects": 5,
        "English": 2,
        "Is Frontend Heavily Required": 0,
        "Is project complicated": 0,
        "Average Team size": 4,
        "Is Lead": 1,
        "Average Year Per Company": 0.5,
        "Trustworthy Companies": 1,
        "Trustworthy Universities": 1,
        "Worked with untrustworthy companies": 0,
        "Graduated from untrusted universities": 0
    },
    {
        "Name": "Tran Duc Anh",
        "YOE": 3.5,
        "Num of Projects": 5,
        "English": 0,
        "Is Frontend Heavily Required": 0,
        "Is project complicated": 0,
        "Average Team size": 8,
        "Is Lead": 1,
        "Average Year Per Company": 1.25,
        "Trustworthy Companies": 1,
        "Trustworthy Universities": 1,
        "Worked with untrustworthy companies": 0,
        "Graduated from untrusted universities": 0
    },
    {
        "Name": "Nguyen Xuan Truong",
        "YOE": 6.0,
        "Num of Projects": 4,
        "English": 2,
        "Is Frontend Heavily Required": 0,
        "Is project complicated": 0,
        "Average Team size": 8,
        "Is Lead": 0,
        "Average Year Per Company": 1.5,
        "Trustworthy Companies": 0,
        "Trustworthy Universities": 1,
        "Worked with untrustworthy companies": 0,
        "Graduated from untrusted universities": 0
    },
    {
        "Name": "Lena Vu",
        "YOE": 3.0,
        "Num of Projects": 4,
        "English": 3,
        "Is Frontend Heavily Required": 0,
        "Is project complicated": 0,
        "Average Team size": 6,
        "Is Lead": 1,
        "Average Year Per Company": 1.5,
        "Trustworthy Companies": 0,
        "Trustworthy Universities": 0,
        "Worked with untrustworthy companies": 0,
        "Graduated from untrusted universities": 0
    },
    {
        "Name": "Tran Quoc Van",
        "YOE": 7.0,
        "Num of Projects": 7,
        "English": 2,
        "Is Frontend Heavily Required": 1,
        "Is project complicated": 1,
        "Average Team size": 10,
        "Is Lead": 1,
        "Average Year Per Company": 1.5,
        "Trustworthy Companies": 0,
        "Trustworthy Universities": 0,
        "Worked with untrustworthy companies": 0,
        "Graduated from untrusted universities": 0
    }

];















// Train the model
async function trainModel() {
    // Prepare input (X) and output (y)
    const features = data.map(d => [
        d["YOE"],
        d["Num of Projects"],
        d["English"],
        d["Is Frontend Heavily Required"],
        d["Is project complicated"],
        d["Average Team size"],
        d["Is Lead"],
        d["Average Year Per Company"],
        d["Trustworthy Companies"],
        d["Trustworthy Universities"],
        d["Worked with untrustworthy companies"],
        d["Graduated from untrusted universities"]
    ]);

    const labels = data.map(d => d["Pass"]);

    // Convert the data to tensors
    const X = tf.tensor2d(features);
    const y = tf.tensor1d(labels);

    // Build the model
    const model = tf.sequential();

    model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [X.shape[1]] }));
    model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

    // Compile the model
    model.compile({
        optimizer: 'sgd',
        loss: 'meanSquaredError',
        metrics: ['accuracy']
    });
    await model.fit(X, y, {
        epochs: 2000,
        batchSize: 8,
        validationSplit: 0.2,
        callbacks: {
            onEpochEnd: (epoch, logs) => {
                console.log(`Epoch ${epoch + 1}: loss = ${logs.loss}, accuracy = ${logs.acc}`);
            }
        }
    });
    console.log("Model training complete");
    return model
}



// Function to predict pass/fail for multiple candidates
async function predictPass(model, candidates) {
    // Convert candidates data to tensor
    const candidatesTensor = tf.tensor2d(candidates.map(candidate => [
        candidate["YOE"],
        candidate["Num of Projects"],
        candidate["English"],
        candidate["Is Frontend Heavily Required"],
        candidate["Is project complicated"],
        candidate["Average Team size"],
        candidate["Is Lead"],
        candidate["Average Year Per Company"],
        candidate["Trustworthy Companies"],
        candidate["Trustworthy Universities"],
        candidate["Worked with untrustworthy companies"],
        candidate["Graduated from untrusted universities"]
    ]));

    // Make predictions
    const predictions = model.predict(candidatesTensor);

    // Process predictions
    const passValues = (await predictions.array()).map(prediction => prediction[0] >= 0.5 ? 1 : 0);

    // Log and return results
    passValues.forEach((passValue, index) => {
        console.log(`Candidate ${candidates[index].Name}: Predicted Pass: ${passValue}`);
    });

    return passValues;
}






const run = async () => {
    // Call the function to start training
    // const model = await trainModel();
    // saveModel(model, 'cv_bot')
    const model = await loadModel('cv_bot')
    const passed = await predictPass(model, candidates);
    console.log('This CV is passed? ', passed > 0 ? 'Yes' : 'No')
}

run()

