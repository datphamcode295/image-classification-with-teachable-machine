// the link to your model provided by Teachable Machine export panel
const URL = "./my_model/";

let model, labelContainer, maxPredictions;

// Load the image model
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement("div"));
    }

    const imageUpload = document.getElementById("image-upload");
    imageUpload.addEventListener("change", handleImageUpload);
}

init();

// Handle image upload from PC
async function handleImageUpload(event) {
    const file = event.target.files[0];
    const img = document.createElement("img");
    
    const reader = new FileReader();
    reader.onload = function (e) {
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
    
    img.onload = async function () {
        await predict(this);
    };
}

// Run the image through the model and display predictions
async function predict(image) {
    const prediction = await model.predict(image);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}


function handleFileSelect(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  
  reader.onload = function(event) {
    var imgElement = document.getElementById('previewImage');
    imgElement.src = event.target.result;
  };
  
  reader.readAsDataURL(file);
}