import { getDatabase,ref, set, child, push, update} from "firebase/database";
import {database} from "../firebase"




export function addEvent(CalendarEvent){  
   // const newPostKey = push(child(ref(database), 'CalendarEvents')).key;
    const updates = {};
    updates['/CalendarEvents/' + CalendarEvent.id] = CalendarEvent;
    
    return update(ref(database), updates);

}

export function deleteEvent(CalendarEvent){
    const updates = {};
    updates['/CalendarEvents/' + CalendarEvent.id] = null;
    return update(ref(database), updates);
}


export function updateEvent(CalendarEvent){
    const updates = {};
    updates['/CalendarEvents/' + CalendarEvent.id] = CalendarEvent;
    return update(ref(database), updates);
}


