const brain = require('brain.js');
const net = new brain.NeuralNetwork();

// Train the model with some basic data
const trainingData = [
    { input: { stress: 0.8, activity: 0.2 }, output: { alert: 1 } },  // High stress, low activity
    { input: { stress: 0.3, activity: 0.9 }, output: { alert: 0 } },  // Low stress, high activity
    { input: { stress: 0.7, activity: 0.3 }, output: { alert: 1 } },  // Moderate stress, low activity
    { input: { stress: 0.4, activity: 0.5 }, output: { alert: 0 } }   // Balanced stress and activity
];

net.train(trainingData);

// Function to generate alert based on input data
function generateAlert(stress, activity) {
    const prediction = net.run({ stress, activity });
    return prediction.alert >= 0.5;  // Trigger alert if the model output is close to 1
}

module.exports = generateAlert;
