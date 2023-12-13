function clearResult1() {
    while (result1.firstChild) {
        result1.removeChild(result1.firstChild);
    }
}
function onClickSubmit(){
    
    
    var nitrogen1=document.getElementById("nitrogen1")
    var phosphorus1=document.getElementById("phosphorus1")
    var potassium1=document.getElementById("potassium1")
    var temperature1=document.getElementById("temperature1")
    var humidity1=document.getElementById("humidity1")
    var ph1=document.getElementById("ph1")
    var rainfall1=document.getElementById("rainfall1")
    
    var result1=document.getElementById("result1")


    
    var inputFields = [nitrogen1, phosphorus1, potassium1, temperature1, humidity1, ph1, rainfall1];
    inputFields.forEach(function(field) {
        field.classList.remove("error-field");
    });

    // Check if any of the input fields are empty
    var emptyFields = [];

    if (!nitrogen1.value.trim()) {
        emptyFields.push(nitrogen1);
    }
    if (!phosphorus1.value.trim()) {
        emptyFields.push(phosphorus1);
    }
    if (!potassium1.value.trim()) {
        emptyFields.push(potassium1);
    }
    if (!temperature1.value.trim()) {
        emptyFields.push(temperature1);
    }
    if (!humidity1.value.trim()) {
        emptyFields.push(humidity1);
    }
    if (!ph1.value.trim()) {
        emptyFields.push(ph1);
    }
    if (!rainfall1.value.trim()) {
        emptyFields.push(rainfall1);
    }

    if (emptyFields.length > 0) {
        
        
        // Add the error-field class to highlight empty fields
        emptyFields.forEach(function(field) {
            field.classList.add("error-field");
        });
        
        return; // Do not proceed with the POST request
    }

   
    

    var url="http://127.0.0.1:5001/get_crop_type"
    clearResult1();
    $.post(url, {
        nitrogen1: parseInt(nitrogen1.value),
        phosphorus1: parseInt(phosphorus1.value),
        potassium1: parseInt(potassium1.value),
        temperature1: parseFloat(temperature1.value),
        humidity1: parseFloat(humidity1.value),
        ph1: parseFloat(ph1.value),
        rainfall1: parseFloat(rainfall1.value)
        }, function(data, status) {
            console.log(data.crop_type);
            var cropType = data.crop_type;
        
            // Display the crop type as text
            //result1.innerHTML = "<h2>Crop: " + cropType.toUpperCase() + "</h2>";
        
            // Create an image element with specified width and height
            //var cropImage = document.createElement("img");
           
        
            // Set the image source based on the crop type and supported file extensions
            var supportedExtensions = [".jpg", ".png", ".webp",".jpeg"];
            //var imageFound = false;
        
            // Check each supported extension until an image is found
            for (var i = 0; i < supportedExtensions.length; i++) {
                (function(extension) {
                    
                    var imageUrl = "images/" + cropType + extension;
                    var tempImage = new Image();
                    
                    tempImage.onload = function() {
                        tempImage.height=250
                        tempImage.width=250
                        // Create a div to contain the crop type text and the image
                        var containerDiv = document.createElement('div');
                        
                        // Create a heading for the crop type text
                        var cropTypeHeading = document.createElement('h2');
                        cropTypeHeading.textContent = cropType.toString().toUpperCase();
                        
                        // Append the crop type heading and image to the container div
                        containerDiv.appendChild(cropTypeHeading);
                        containerDiv.appendChild(tempImage);
                        
                        // Append the container div to the result1 element
                        result1.appendChild(containerDiv);
            
                        // Stop the loop when an image is found
                        for (var j = i + 1; j < supportedExtensions.length; j++) {
                            supportedExtensions[j] = null; // Set remaining extensions to null
                        }
                    };
                    
                    tempImage.onerror = function() {
                        // Handle the error if needed
                    };
                    
                    tempImage.src = imageUrl;
                })(supportedExtensions[i]);
            }
            
            
        
        console.log(status);
    });}