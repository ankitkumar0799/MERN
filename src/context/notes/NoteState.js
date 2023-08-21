import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "64d9e3da441c93993e62ede0",
      "user": "64d737a01d04a17a430c89c0",
      "title": "my titdffle",
      "description": "plkese wdakefd up early",
      "tag": "my tfdag",
      "date": "2023-08-14T08:20:42.222Z",
      "__v": 0
    },
    {
      "_id": "64d9e3fe441c93993e62ede2",
      "user": "64d737a01d04a17a430c89c0",
      "title": "my titdffle",
      "description": "please watch full video",
      "tag": "youtube",
      "date": "2023-08-14T08:21:18.169Z",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(notesInitial)
  return (
    <NoteContext.Provider value={{notes, setNotes}}>
        {props.children}
    
    </NoteContext.Provider>
  )
};

export default NoteState;
