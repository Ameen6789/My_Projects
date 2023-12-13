from flask import Flask,request,jsonify
import utilities_crop
import utilities_fertilizer

app=Flask(__name__)


@app.route("/get_crop_soil")
def get_crop_soil():
    crop = utilities_fertilizer.get_crop()
    soil = utilities_fertilizer.get_soil()
    
    response_data = {
        "crop": crop,
        "soil": soil
    }

    response = jsonify(response_data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route("/get_fertilizer_type", methods=["POST"])

def get_fertilizer_type():
    
        # Retrieve data from the POST request's form data
    temperature = int(request.form["temperature"])
    humidity = int(request.form["humidity"])
    moisture = int(request.form["moisture"])
    nitrogen = int(request.form["nitrogen"])
    potassium = int(request.form["potassium"])
    phosphorus = int(request.form["phosphorus"])
    crop = request.form["crop"]
    soil = request.form["soil"]

        # Call the utilities function to get fertilizer type suggestion
    fertilizer_type = utilities_fertilizer.get_fertilizer_type(temperature, humidity, moisture,nitrogen,potassium,phosphorus,crop,soil)
        

    response_data = {"fertilizer_type": fertilizer_type}

        # Return the response as JSON
    response = jsonify(response_data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route("/get_crop_type",methods=["POST"])
def get_crop_type():

    n=int(request.form["nitrogen1"])
    p=int(request.form["phosphorus1"])
    k=int(request.form["potassium1"])
    temperature=float(request.form["temperature1"])
    humidity=float(request.form["humidity1"])
    ph=float(request.form["ph1"])
    rainfall=float(request.form["rainfall1"])
    
    crop_type=utilities_crop.get_crop_type(n,p,k,temperature,humidity,ph,rainfall)
    response=jsonify({"crop_type":crop_type})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response







if __name__=="__main__":
    print("starting Server")
    utilities_fertilizer.get_artifacts()
    utilities_crop.get_artifacts()
    app.run(port=5001)

