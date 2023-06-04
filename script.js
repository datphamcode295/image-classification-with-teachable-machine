// import faceapi from 'face-api.js';
// import clarifai from 'clarifai';

document.getElementById("fileInput").addEventListener("change", function(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
       console.log("okkk");

    reader.onload = async function(e) {
        var img = document.getElementById("previewImage");
        img.src = e.target.result;
        img.onload = async function() {
            console.log("okkk2");
            await detectFaces(img);
            console.log("okkk3");
        }
    };

    reader.readAsDataURL(file);

    // const app = new clarifai.App({
    //     apiKey: '49b80dd02f8b427d895badfcc6111c16'
    //    });

    //    console.log("okkk");
    // app.models.predict(Clarifai.FACE_DETECT_MODEL, "https://images2.thanhnien.vn/Uploaded/thanhlongn/2022_09_14/minh-kha-11-6860.jpeg").then(
    //     function(response) {
    //    console.log("okkk2");

    //         console.log(response);
    //     }
    // );
    
});

// function  main() {
//     const app = new clarifai.App({
//         apiKey: '49b80dd02f8b427d895badfcc6111c16'
//        });

//        console.log("okkk");
//     app.models.predict(Clarifai.FACE_DETECT_MODEL, "https://images2.thanhnien.vn/Uploaded/thanhlongn/2022_09_14/minh-kha-11-6860.jpeg").then(
//         function(response) {
//        console.log("okkk2");

//             console.log(response);
//         }
//     );
// }

// main()





async function detectFaces(img) {
    const URL = "/home/datpham/Downloads/privateBlockchain/test/basic/my_model/";
    const tmImage = window.tmImage;

    let model, webcam, labelContainer, maxPredictions;

    // Load the image model and setup the webcam
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        if(tmImage == undefined) {
            console.log("tmImage undefined");
        }

        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // use model to predict image 1.png

        const prediction = await model.predict(img, false);
        console.log(prediction);
}

function handleFileSelect(event) {
    var file = event.target.files[0];
    
    // Perform additional validation if needed
    
    var reader = new FileReader();
    
    // Set up the onload event handler
    reader.onload = function(event) {
      var imgElement = document.getElementById('previewImage');
      imgElement.src = event.target.result;
    };
    
    // Read the file as a data URL
    reader.readAsDataURL(file);
}