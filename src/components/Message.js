import React from "react";
import { useState,useContext,useEffect } from "react";
import "./Message.css";
import GlobalContext from "../context/GlobalContext";
import  {addEvent, deleteEvent, updateEvent}  from "../controller/FirebaseController";
import { log } from "@craco/craco/lib/logger";

function Message(props) {
  const handleJoin = () => {
    if(props.same.participants.find((tmp) => tmp == props.user)){
      alert("You are already in this event")
      props.setTrigger(false);
      props.setShowEventModal(false);
      return
    }
    else{
    const tmpEvent = props.same
    tmpEvent.participants = [...props.same.participants,props.user]
    props.dispatchCalEvent({ type: "update", payload: tmpEvent });
    updateEvent(tmpEvent);
    props.setTrigger(false);
    props.setShowEventModal(false);
  }
    
  };

  const handleCreate = () => {
    const today = new Date()
     const newEvent = props.event
      newEvent.title = newEvent.title + " - " + today.valueOf();
      props.dispatchCalEvent({ type: "push", payload: newEvent});
      newEvent.participants = [...props.event.participants,props.user];
      addEvent(newEvent);
      props.setTrigger(false);
      props.setShowEventModal(false);
      
  
  };

  return props.trigger ? (
    <div className="Message">
      <div className="Container">
        <h4>"{props.title}" already exists. Would you like to join ?</h4>
        <button onClick={handleJoin} className="join_button">
          Join
        </button>
        <button onClick={handleCreate} className="create_button">
          Create new
        </button>
        <button
          onClick={() => props.setTrigger(false)}
          className="cancel_button"
        >
          Cancel
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Message;
