
import numpy as np
import mediapipe as mp
import cv2

import pickle

from sklearn.ensemble import RandomForestClassifier


mp_holistic=mp.solutions.holistic
mp_drawing=mp.solutions.drawing_utils

with open("face_emotion_model.pkl","rb") as f:
    model=pickle.load(f)

def make_detection(image,model):
    image=cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
    image.flags.writeable=False
    results=model.process(image)
    image.flags.writeable=True
    image=cv2.cvtColor(image,cv2.COLOR_RGB2BGR)
    return image,results

def draw_landmarks(image,results):
    mp_drawing.draw_landmarks(image,results.face_landmarks,mp_holistic.FACEMESH_TESSELATION,
                              mp_drawing.DrawingSpec(color=(0,255,0),thickness=2,circle_radius=1),
                              mp_drawing.DrawingSpec(color=(0,230,0),thickness=2,circle_radius=1)
                              )
   
cap=cv2.VideoCapture(0)
with mp_holistic.Holistic(min_detection_confidence=0.4,min_tracking_confidence=0.4) as holistic:
    while cap.isOpened():
        ret,frame=cap.read()
        image,results=make_detection(frame,holistic)
    
        draw_landmarks(image,results)
        try:
            face=results.face_landmarks.landmark
            face_row=list(np.array([[lnd.x,lnd.y,lnd.z] for lnd in face]).flatten())
            rows=face_row.copy()
            
            body_language_class=model.predict([rows])[0]
            body_language_probab=model.predict_proba([rows])
            

            cv2.rectangle(image,(0,0),(250,60),(255,0,0),-1)

            cv2.putText(image,"CLASS",(95,12),cv2.FONT_HERSHEY_SIMPLEX,0.5,(0,0,0),1,cv2.LINE_AA)

            cv2.putText(image,body_language_class.split(" ")[0],(90,40),cv2.FONT_HERSHEY_SIMPLEX,1,(255,255,255),2,cv2.LINE_AA)

            cv2.putText(image,"PROB",(15,12),cv2.FONT_HERSHEY_SIMPLEX,0.5,(0,0,0),1,cv2.LINE_AA)

            cv2.putText(image,str(round(np.max(body_language_probab),2)),(10,40),cv2.FONT_HERSHEY_SIMPLEX,1,(255,255,255),2,cv2.LINE_AA)




            
        except:
            pass
        cv2.imshow("raw feed",image)
        if cv2.waitKey(10) & 0xFF==ord("q"):
            break
    cap.release()
    cv2.destroyAllWindows()