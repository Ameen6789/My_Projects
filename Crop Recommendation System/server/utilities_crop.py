from sklearn.ensemble import RandomForestClassifier
import numpy as np
import json
import pickle
__model=None
def get_crop_type(N,P,K,temperature,humidity,ph,rainfall):
    
    result=__model.predict([[N,P,K,temperature,humidity,ph,rainfall]])
    return result[0]



def get_artifacts():
    global __model
    with open("/home/ameen/python/ml training/crop recommendtion system/server/artifacts/crop_model.pkl","rb") as f:
        __model=pickle.load(f)
if __name__=="__main__":
    get_artifacts()
    print(get_crop_type(90,42,43,20.879744,75,5.5,220))

