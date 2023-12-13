from sklearn.ensemble import RandomForestClassifier
import numpy as np
import json
import pickle
__model=None
__crop=None
__soil=None
def get_fertilizer_type(Temparature,Humidity,Moisture,Nitrogen,Potassium,Phosphorous,Crop,Soil):
    Crop=__crop.index(Crop.lower())
    Soil=__soil.index(Soil.lower())
    result=__model.predict([[Temparature,Humidity,Moisture,Nitrogen,Potassium,Phosphorous,Crop,Soil]])[0]

    return result

def get_crop():
    return __crop
def get_soil():
    return __soil

def get_artifacts():
    global __model
    global __crop
    global __soil
    with open("/home/ameen/python/ml training/crop recommendtion system/server/artifacts/fertilizer_model.pkl","rb") as f:
        __model=pickle.load(f)


    with open("/home/ameen/python/ml training/crop recommendtion system/server/artifacts/soil_type.json","r") as f1:
        __soil=json.load(f1)["soil_type"]


    with open("/home/ameen/python/ml training/crop recommendtion system/server/artifacts/crop_type.json","r") as f2:
        __crop=json.load(f2)["crop_type"]



if __name__=="__main__":
    get_artifacts()
    print(get_fertilizer_type(34,65,62,7,9,30,"cotton","black"))


