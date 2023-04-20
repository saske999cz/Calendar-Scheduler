import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import Draggable from "react-draggable";
import "./EventModal.scss";
import {
  Calendar,
  DateTimePickerComponent,
} from "@syncfusion/ej2-react-calendars";
import { useAuth } from "../context/AuthContext";
import {
  addEvent,
  deleteEvent,
  updateEvent,
} from "../controller/FirebaseController";
import Message from "./Message";

const labelsClasses = [
  "indigo",
  "gray",
  "green",
  "blue",
  "red",
  "purple",
];

var tmpValue ;
var reuse;

function check(CalendarEvent) {
  const event = CalendarEvent;
  const start = CalendarEvent.startTime;
  const end = CalendarEvent.endTime;
  const newStart = new Date(
    start.getTime() +
      start.getTimezoneOffset() * 60 * 1000 +
      3600000 * 7
  );
  const formattedStart = newStart.toISOString();
  const newEnd = new Date(
    end.getTime() + end.getTimezoneOffset() * 60 * 1000 + 3600000 * 7
  );
  const formattedEnd = newEnd.toISOString();
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  const checkUpdate = parsedEvents.find((temp) => {
    return (
      event.title == temp.title &&
      formattedEnd == temp.endTime &&
      formattedStart == temp.startTime &&
      event.id == temp.id &&
      event.creator == temp.creator
    );
  });
  const checkCol = parsedEvents.find((temp) => {
    return (
      event.title == temp.title &&
      formattedEnd == temp.endTime &&
      formattedStart == temp.startTime &&
      event.id != temp.id &&
      event.creator == temp.creator
    );
  });
  const checkSame = parsedEvents.find((temp) => {
    return (
      event.title == temp.title &&
      formattedEnd == temp.endTime &&
      formattedStart == temp.startTime &&
      event.id != temp.id &&
      event.creator != temp.creator
    );
  });
  const checkUser = parsedEvents.find((temp) => {
    return (
      event.title == temp.title &&
      formattedEnd == temp.endTime &&
      formattedStart == temp.startTime &&
      event.id == temp.id &&
      event.creator != temp.creator
    );
  });

  if (checkUpdate) return undefined;
  if (checkCol) return true;
  if(checkSame)
  {tmpValue = checkSame;
  return false;}
  if(checkUser) 
  { reuse = checkUser;
    return undefined;}
  return undefined;
}

export default function EventModal() {
  const { currentUser } = useAuth();
  const [isvalidStart, setIsValidStart] = useState(true);
  const [isvalidEnd, setIsValidEnd] = useState(true);
  const [tmpVal, setTmpVal] = useState();
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
  } = useContext(GlobalContext);

  const [message, setMessage] = useState(false);
  const [title, setTitle] = useState(
    selectedEvent ? selectedEvent.title : ""
  );
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );

  const [participants, setParticipants] = useState(
    selectedEvent ? selectedEvent.participants : []
  );

  const [startTime, setStartTime] = useState(
    selectedEvent ? selectedEvent.startTime : daySelected
  );
  const [endTime, setEndTime] = useState(
    selectedEvent ? selectedEvent.endTime : daySelected
  );

  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );


  function handleSubmit(e) {
    e.preventDefault();

    if (startTime < endTime) {
      const creator = currentUser.email;
      const calendarEvent = {
        creator,
        title,
        description,
        participants,
        startTime,
        endTime,
        label: selectedLabel,
        day: startTime.valueOf(),
        id: selectedEvent ? selectedEvent.id : Date.now(),
      };

      if (check(calendarEvent) === undefined) {
        //console.log(check(calendarEvent));
        if(reuse){
          alert("You can't modify meeting created by other person");
        }
        else{
          if (selectedEvent) {
            dispatchCalEvent({
              type: "update",
              payload: calendarEvent,
            });
            updateEvent(calendarEvent);
          } else {
            dispatchCalEvent({ type: "push", payload: calendarEvent });
            calendarEvent.participants = [
              ...calendarEvent.participants,
              calendarEvent.creator,
            ];
            addEvent(calendarEvent);
          }
          setShowEventModal(false);
        }
        
      } else if (check(calendarEvent) === false) {
        setTmpVal(calendarEvent);
        setMessage(true);
      } else {
        alert(
          calendarEvent.title + " already exists in you schedule !!!"
        );
      }
    } else {
      setIsValidStart(false);
      setIsValidEnd(false);
    }
  }

  return (
    <Draggable>
      <div className="meeting h-screen w-full fixed left-0 top-0 flex justify-center items-center">
        <form className="lemon bg-white rounded-lg shadow-2xl w-1/4">
          <header
            id="opening"
            className="bg-gray-100 px-4 py-2 flex justify-between items-center"
          >
            <span className="one material-icons-outlined text-gray-400">
              drag_handle
            </span>
            <div>
              {selectedEvent && (
                <span
                  onClick={() => {
                    
                    if(selectedEvent.creator !== currentUser.email){
                      alert("You can't delete meeting created by other person");
                      return;
                    }else{dispatchCalEvent({
                      type: "delete",
                      payload: selectedEvent,
                    });
                    setShowEventModal(false);
                    deleteEvent(selectedEvent);}
                    
                  }}
                  className="material-icons-outlined text-gray-400 cursor-pointer"
                >
                  delete
                </span>
              )}
              <button onClick={() => setShowEventModal(false)}>
                <span className="material-icons-outlined text-gray-400">
                  close
                </span>
              </button>
            </div>
          </header>
          <div className="p-3">
            <div
              id="body_shot"
              className="grid grid-cols-1/5 items-end gap-y-7"
            >
              <input
                type="text"
                name="title"
                placeholder="Add title"
                value={title}
                required
                className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-red-600"
                onChange={(e) => setTitle(e.target.value)}
              />
              <span className="clock material-icons-outlined text-gray-400">
                schedule
              </span>
              <p className="time_range">Time range</p>
              <div className="time_container">
                <DateTimePickerComponent
                  className="start_date"
                  placeholder="Choose start date & time"
                  value={startTime}
                  format="dd-MM-yy HH:mm"
                  onChange={(e) => setStartTime(e.target.value)}
                ></DateTimePickerComponent>
                <p
                  id="start"
                  className={
                    isvalidStart ? "valid_start" : "invalid_start"
                  }
                >
                  Invalid time
                </p>
                <DateTimePickerComponent
                  className="end_date"
                  placeholder="Choose end date & time"
                  value={endTime}
                  format="dd-MM-yy HH:mm"
                  onChange={(e) => setEndTime(e.target.value)}
                ></DateTimePickerComponent>
                <p
                  id="end"
                  className={isvalidEnd ? "valid_end" : "invalid_end"}
                >
                  Invalid time
                </p>
              </div>
              <span className="descrip material-icons-outlined text-gray-400">
                segment
              </span>
              <input
                type="text"
                name="description"
                placeholder="Add a description"
                value={description}
                required
                className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-red-600"
                onChange={(e) => setDescription(e.target.value)}
              />
              <span className="book_mark material-icons-outlined text-gray-400">
                bookmark_border
              </span>
              <div className="color_mark flex gap-x-2">
                {labelsClasses.map((lblClass, i) => (
                  <span
                    key={i}
                    onClick={() => setSelectedLabel(lblClass)}
                    className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                  >
                    {selectedLabel === lblClass && (
                      <span className="material-icons-outlined text-white text-sm">
                        check
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <footer className="flex justify-end border-t p-3 mt-5">
            <button
              type="submit"
              onClick={handleSubmit}
              className="submit_button bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
            >
              Save
            </button>
          </footer>
        </form>
        <Message
          trigger={message}
          setTrigger={setMessage}
          title={title}
          event={tmpVal}
          same={tmpValue}
          setParticipants={setParticipants}
          user={currentUser.email}
          dispatchCalEvent={dispatchCalEvent}
          setShowEventModal={setShowEventModal}
        />
      </div>
    </Draggable>
  );
}
