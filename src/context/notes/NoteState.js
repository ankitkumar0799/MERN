import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const s1 = {
    name: "ankit",
    age: "19",
    gender: "male",
  };

  const [state, setstate] = useState(s1);
  const update = () => {
    setTimeout(() => {
      setstate({
        name: "larry",
        age: "59",
        gender: "female",
      });
    }, 1000);
  }
  return (
    <NoteContext.Provider value={{state, update}}>
        {props.children}
    
    </NoteContext.Provider>
  )
};

export default NoteState;
