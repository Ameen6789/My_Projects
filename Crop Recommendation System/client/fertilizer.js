function clearResult1() {
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }
}
function onClickSubmit(){
    
    
    var temperature=document.getElementById("temperature")
    var humidity=document.getElementById("humidity")
    var moisture=document.getElementById("moisture")
    var nitrogen=document.getElementById("nitrogen")
    var potassium=document.getElementById("potassium")
    var phosphorus=document.getElementById("phosphorus")
    var crop=document.getElementById("uicrop")
    var soil=document.getElementById("uisoil")
    var result=document.getElementById("result")

    var inputFields = [temperature, humidity, moisture, nitrogen, potassium, phosphorus];
    inputFields.forEach(function(field) {
        field.classList.remove("error-field");
    });

    // Check if any of the input fields are empty
    var emptyFields = [];

    if (!temperature.value.trim()) {
        emptyFields.push(temperature);
    }
    if (!humidity.value.trim()) {
        emptyFields.push(humidity);
    }
    if (!moisture.value.trim()) {
        emptyFields.push(moisture);
    }
    if (!nitrogen.value.trim()) {
        emptyFields.push(nitrogen);
    }
    if (!potassium.value.trim()) {
        emptyFields.push(potassium);
    }
    if (!phosphorus.value.trim()) {
        emptyFields.push(phosphorus);
    }
    

    if (emptyFields.length > 0) {
        alert("Please fill out all fields.");
        
        // Add the error-field class to highlight empty fields
        emptyFields.forEach(function(field) {
            field.classList.add("error-field");
        });
        
        return; // Do not proceed with the POST request
    }

    var url="http://127.0.0.1:5001/get_fertilizer_type"
    clearResult1();
    $.post(url,{
        temperature:parseInt(temperature.value),
        humidity:parseInt(humidity.value),
        moisture:parseInt(moisture.value),
        nitrogen:parseInt(nitrogen.value),
        potassium:parseInt(potassium.value),
        phosphorus:parseInt(phosphorus.value),
        crop:crop.value,
        soil:soil.value


    },function(data,status){
        console.log(data.fertilizer_type)
        //var cropImage = document.createElement("img");
           
        
        // Set the image source based on the crop type and supported file extensions
        var supportedExtensions = [".jpg", ".png", ".webp",".jpeg"];
        //var imageFound = false;
    
        // Check each supported extension until an image is found
        for (var i = 0; i < supportedExtensions.length; i++) {
            (function(extension) {
                
                var imageUrl = "images/" + data.fertilizer_type + extension;
                var tempImage = new Image();
                
                tempImage.onload = function() {
                    tempImage.height=250
                    tempImage.width=250
                    // Create a div to contain the crop type text and the image
                    var containerDiv = document.createElement('div');
                    
                    // Create a heading for the crop type text
                    var fertilizerTypeHeading = document.createElement('h2');
                    fertilizerTypeHeading.textContent = data.fertilizer_type.toString().toUpperCase();
                    
                    // Append the crop type heading and image to the container div
                    containerDiv.appendChild(fertilizerTypeHeading);
                    containerDiv.appendChild(tempImage);
                    
                    // Append the container div to the result1 element
                    result.appendChild(containerDiv);
        
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
     

        console.log(status)
    });
    
  }



function onPageLoad() {
    console.log( "document loaded" );
    // var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
    var url = "http://127.0.0.1:5001/get_crop_soil"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
    $.get(url,function(data, status) {
        console.log("got response for get_crop_soil request");
        if(data) {
            var crop = data.crop;
            var soil=data.soil;
            var uicrop = document.getElementById("uicrop");
            var uisoil=document.getElementById("uisoil")
            $('#uicrop').empty();
            for(var i in crop) {
                var opt = new Option(crop[i]);
                $('#uicrop').append(opt);
            }
            $('#uisoil').empty();
            for(var i in soil) {
                var opt = new Option(soil[i]);
                $('#uisoil').append(opt);
            }
        }
    });
  }
  window.onload = onPageLoad;
