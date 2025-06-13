// // components/AdminCalendar.tsx
// import React, { useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import styled, { keyframes } from "styled-components";

// const localizer = momentLocalizer(moment);

// interface Event {
//   title: string;
//   start: Date;
//   end: Date;
//   allDay?: boolean;
// }

// // Animations
// const fadeIn = keyframes`
//   from { opacity: 0; transform: translateY(-10px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// const pulse = keyframes`
//   0% { transform: scale(1); }
//   50% { transform: scale(1.05); }
//   100% { transform: scale(1); }
// `;

// // Styled Components
// const CalendarContainer = styled.div`
//   height: 500px;
//   margin: 20px;
//   border-radius: 12px;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   overflow: hidden;
//   animation: ${fadeIn} 0.5s ease-in-out;
// `;

// const EventForm = styled.div`
//   display: flex;
//   gap: 10px;
//   margin: 20px;
//   animation: ${fadeIn} 0.5s ease-in-out;

//   input {
//     padding: 10px;
//     border: 1px solid #ddd;
//     border-radius: 8px;
//     font-size: 14px;
//     outline: none;
//     transition: border-color 0.3s ease;

//     &:focus {
//       border-color: #646cff;
//     }
//   }

//   button {
//     padding: 10px 20px;
//     background-color: #646cff;
//     color: white;
//     border: none;
//     border-radius: 8px;
//     cursor: pointer;
//     font-size: 14px;
//     transition: background-color 0.3s ease, transform 0.3s ease;

//     &:hover {
//       background-color: #535bf2;
//       animation: ${pulse} 1s infinite;
//     }

//     &:active {
//       transform: scale(0.95);
//     }
//   }
// `;

// const AdminCalendar: React.FC = () => {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [newEvent, setNewEvent] = useState<Event>({
//     title: '',
//     start: new Date(),
//     end: new Date(),
//     allDay: false,
//   });

//   const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
//     setNewEvent({ ...newEvent, start, end });
//   };

//   const handleSelectEvent = (event: Event) => {
//     alert(event.title);
//   };

//   const handleAddEvent = () => {
//     if (newEvent.title.trim() === "") {
//       alert("Event title cannot be empty!");
//       return;
//     }
//     setEvents([...events, newEvent]);
//     setNewEvent({ title: '', start: new Date(), end: new Date(), allDay: false });
//   };

//   return (
//     <div>
//       <EventForm>
//         <input 
//           type="text" 
//           placeholder="Event Title" 
//           value={newEvent.title} 
//           onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
//         />
//         <button onClick={handleAddEvent}>Add Event</button>
//       </EventForm>
//       <CalendarContainer>
//         <Calendar
//           localizer={localizer}
//           events={events}
//           startAccessor="start"
//           endAccessor="end"
//           onSelectSlot={handleSelectSlot}
//           onSelectEvent={handleSelectEvent}
//           selectable
//           style={{ height: "100%" }}
//           eventPropGetter={(event) => ({
//             style: {
//               backgroundColor: "#646cff",
//               borderRadius: "4px",
//               border: "none",
//               color: "white",
//               padding: "5px",
//             },
//           })}
//         />
//       </CalendarContainer>
//     </div>
//   );
// };

// export default AdminCalendar;






// // components/AdminCalendar.tsx
// "use client";
// // components/AdminCalendar.tsx
// import React, { useState } from "react";
// import { Calendar, momentLocalizer, Views, NavigateAction } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import styled, { keyframes } from "styled-components";
// import { X, ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

// const localizer = momentLocalizer(moment);

// interface Event {
//   title: string;
//   start: Date;
//   end: Date;
//   allDay?: boolean;
// }

// interface AdminCalendarProps {
//   setShowAdminCalendar: React.Dispatch<React.SetStateAction<boolean>>;
// }

// // Animations
// const fadeIn = keyframes`
//   from { opacity: 0; transform: translateY(-10px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// const pulse = keyframes`
//   0% { transform: scale(1); }
//   50% { transform: scale(1.05); }
//   100% { transform: scale(1); }
// `;

// // Styled Components with responsive design
// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
// `;

// const ModalContent = styled.div`
//   background: white;
//   border-radius: 15px;
//   padding: 20px;
//   width: 95%;
//   max-width: 800px;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//   animation: ${fadeIn} 0.3s ease-out;
//   max-height: 90vh;
//   overflow-y: auto;

//   @media (max-width: 768px) {
//     max-width: 90%;
//   }
// `;

// const CloseButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   color: #646cff;
//   font-size: 1.5em;

//   &:hover {
//     color: #535bf2;
//   }
// `;

// const CalendarContainer = styled.div`
//   height: 50vh;
//   margin: 20px 0;
//   border-radius: 12px;
//   overflow: hidden;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

//   @media (max-width: 768px) {
//     height: 40vh;
//   }
// `;

// const EventForm = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 10px;
//   margin-bottom: 20px;

//   input {
//     flex-grow: 1;
//     padding: 15px;
//     border: 1px solid #ddd;
//     border-radius: 8px;
//     font-size: 16px;
//     outline: none;
//     transition: border-color 0.3s ease;
//     min-width: 200px;

//     &:focus {
//       border-color: #646cff;
//     }
//   }

//   button {
//     padding: 15px 30px;
//     background-color: #646cff;
//     color: white;
//     border: none;
//     border-radius: 8px;
//     cursor: pointer;
//     font-size: 16px;
//     transition: background-color 0.3s ease, transform 0.3s ease;
//     white-space: nowrap;

//     &:hover {
//       background-color: #535bf2;
//       animation: ${pulse} 1s infinite;
//     }

//     &:active {
//       transform: scale(0.95);
//     }
//   }
// `;

// const NavigationBar = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 20px;

//   button {
//     background: none;
//     border: none;
//     cursor: pointer;
//     color: #646cff;
//     font-size: 1.2em;

//     &:hover {
//       color: #535bf2;
//     }
//   }
// `;

// const ViewSelector = styled.select`
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 8px;
//   font-size: 14px;
//   outline: none;
//   margin-left: 10px;

//   &:focus {
//     border-color: #646cff;
//   }
// `;

// // Define a type for Views
// type ViewType = typeof Views[keyof typeof Views];

// const AdminCalendar: React.FC<AdminCalendarProps> = ({ setShowAdminCalendar }) => {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [newEvent, setNewEvent] = useState<Event>({
//     title: '',
//     start: new Date(),
//     end: new Date(),
//     allDay: false,
//   });
//   const [currentView, setCurrentView] = useState<ViewType>(Views.MONTH);
//   const [date, setDate] = useState(new Date());

//   const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
//     setNewEvent({ ...newEvent, start, end });
//   };

//   const handleSelectEvent = (event: Event) => {
//     alert(event.title);
//   };

//   const handleAddEvent = () => {
//     if (newEvent.title.trim() === "") {
//       alert("Event title cannot be empty!");
//       return;
//     }
//     setEvents([...events, newEvent]);
//     setNewEvent({ title: '', start: new Date(), end: new Date(), allDay: false });
//   };

//   const handleNavigate = (newDate: Date, view: ViewType, action: NavigateAction) => {
//     let newDateCopy = new Date(newDate);
//     if (action === 'PREV') {
//       newDateCopy.setMonth(newDateCopy.getMonth() - 1);
//     } else if (action === 'NEXT') {
//       newDateCopy.setMonth(newDateCopy.getMonth() + 1);
//     } else if (action === 'TODAY') {
//       newDateCopy = new Date();
//     }
//     setDate(newDateCopy);
//   };

//   const handleViewChange = (view: ViewType) => {
//     setCurrentView(view);
//   };

//   return (
//     <ModalOverlay>
//       <ModalContent>
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold text-gray-800">Admin Calendar</h2>
//           <CloseButton onClick={() => setShowAdminCalendar(false)}>
//             <X />
//           </CloseButton>
//         </div>
//         <EventForm>
//           <input 
//             type="text" 
//             placeholder="Event Title" 
//             value={newEvent.title} 
//             onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
//           />
//           <button onClick={handleAddEvent}>Add Event</button>
//         </EventForm>
//         <NavigationBar>
//           <div className="flex space-x-2">
//             <button onClick={() => handleNavigate(date, currentView, 'PREV')}><ChevronLeft /></button>
//             <button onClick={() => handleNavigate(date, currentView, 'TODAY')}><CalendarDays /></button>
//             <button onClick={() => handleNavigate(date, currentView, 'NEXT')}><ChevronRight /></button>
//           </div>
//           <ViewSelector value={currentView} onChange={(e) => handleViewChange(e.target.value as ViewType)}>
//             <option value={Views.MONTH}>Month</option>
//             <option value={Views.WEEK}>Week</option>
//             <option value={Views.DAY}>Day</option>
//             <option value={Views.AGENDA}>Agenda</option>
//           </ViewSelector>
//         </NavigationBar>
//         <CalendarContainer>
//           <Calendar
//             localizer={localizer}
//             events={events}
//             startAccessor="start"
//             endAccessor="end"
//             onSelectSlot={handleSelectSlot}
//             onSelectEvent={handleSelectEvent}
//             selectable
//             date={date}
//             view={currentView}
//             onNavigate={handleNavigate}
//             onView={handleViewChange}
//             style={{ height: "100%" }}
//             eventPropGetter={(event) => ({
//               style: {
//                 backgroundColor: "#646cff",
//                 borderRadius: "4px",
//                 border: "none",
//                 color: "white",
//                 padding: "8px",
//                 fontSize: "14px"
//               },
//             })}
//           />
//         </CalendarContainer>
//       </ModalContent>
//     </ModalOverlay>
//   );
// };

// export default AdminCalendar;













// components/AdminCalendar.tsx
"use client";
import React, { useState } from "react";
import { Calendar, momentLocalizer, Views, NavigateAction } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styled, { keyframes } from "styled-components";
import { X, ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

const localizer = momentLocalizer(moment);

export interface Event {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
}

export interface AdminCalendarProps {
  setShowAdminCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  events?: Event[]; // Changed to optional
  onEventChange: (events: Event[]) => void;
}

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components with responsive design
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  width: 95%;
  max-width: 800px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.3s ease-out;
  max-height: 90vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #646cff;
  font-size: 1.5em;

  &:hover {
    color: #535bf2;
  }
`;

const CalendarContainer = styled.div`
  height: 50vh;
  margin: 20px 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    height: 40vh;
  }
`;

const EventForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;

  input {
    flex-grow: 1;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    color:black;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;
    min-width: 200px;

    &:focus {
      border-color: #646cff;
    }
  }

  button {
    padding: 15px 30px;
    background-color: #646cff;
    color: black;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease, transform 0.3s ease;
    white-space: nowrap;

    &:hover {
      background-color: #535bf2;
      animation: ${pulse} 1s infinite;
    }

    &:active {
      transform: scale(0.95);
    }
  }
`;

const NavigationBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: #646cff;
    font-size: 1.2em;

    &:hover {
      color: #535bf2;
    }
  }
`;

const ViewSelector = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  margin-left: 10px;

  &:focus {
    border-color: #646cff;
  }
`;

// Use 'typeof Views' to get the type of the Views object
type ViewType = typeof Views[keyof typeof Views];

const AdminCalendar: React.FC<AdminCalendarProps> = ({ setShowAdminCalendar, events = [], onEventChange }) => {
  const [localEvents, setLocalEvents] = useState<Event[]>(events || []);
  const [newEvent, setNewEvent] = useState<Event>({
    title: '',
    start: new Date(),
    end: new Date(),
    allDay: false,
  });
  const [currentView, setCurrentView] = useState<ViewType>(Views.MONTH);
  const [date, setDate] = useState(new Date());

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setNewEvent({ ...newEvent, start, end });
  };

  const handleSelectEvent = (event: Event) => {
    // Remove the event when clicked
    const updatedEvents = localEvents.filter(e => e !== event);
    setLocalEvents(updatedEvents);
    onEventChange(updatedEvents);
  };

  const handleAddEvent = () => {
    if (newEvent.title.trim() === "") {
      alert("Event title cannot be empty!");
      return;
    }
    const newEvents = [...localEvents, newEvent];
    setLocalEvents(newEvents);
    onEventChange(newEvents);
    setNewEvent({ title: '', start: new Date(), end: new Date(), allDay: false });
  };

  const handleNavigate = (newDate: Date, view: ViewType, action: NavigateAction) => {
    let newDateCopy = new Date(newDate);
    if (action === 'PREV') {
      newDateCopy.setMonth(newDateCopy.getMonth() - 1);
    } else if (action === 'NEXT') {
      newDateCopy.setMonth(newDateCopy.getMonth() + 1);
    } else if (action === 'TODAY') {
      newDateCopy = new Date();
    }
    setDate(newDateCopy);
  };

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Calendar</h2>
          <CloseButton onClick={() => setShowAdminCalendar(false)}>
            <X />
          </CloseButton>
        </div>
        {/* <EventForm>
          <input 
            type="text" 
            placeholder="Event Title" 
            value={newEvent.title} 
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          <button onClick={handleAddEvent}>Add Event</button>
        </EventForm> */}
        <NavigationBar>
          <div className="flex space-x-2">
            <button onClick={() => handleNavigate(date, currentView, 'PREV')}><ChevronLeft /></button>
            <button onClick={() => handleNavigate(date, currentView, 'TODAY')}><CalendarDays /></button>
            <button onClick={() => handleNavigate(date, currentView, 'NEXT')}><ChevronRight /></button>
          </div>
          <ViewSelector value={currentView} onChange={(e) => handleViewChange(e.target.value as ViewType)}>
            <option value={Views.MONTH}>Month</option>
            <option value={Views.WEEK}>Week</option>
            <option value={Views.DAY}>Day</option>
            <option value={Views.AGENDA}>Agenda</option>
          </ViewSelector>
        </NavigationBar>
        <CalendarContainer>
          <Calendar
            localizer={localizer}
            events={localEvents}
            startAccessor="start"
            endAccessor="end"
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            selectable
            date={date}
            view={currentView}
            onNavigate={handleNavigate}
            onView={handleViewChange}
            style={{ height: "100%" }}
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: "#646cff",
                borderRadius: "4px",
                border: "none",
                color: "black",
                padding: "8px",
                fontSize: "14px"
              },
            })}
          />
        </CalendarContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AdminCalendar;