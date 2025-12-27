import { useEffect, useState } from "react";
import API from "./api";
import CalendarView from "./Calendar";
import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd";
import CreateRequest from "./CreateRequest";


const columns = ["New", "In Progress", "Repaired", "Scrap"];

export default function App() {
  const [requests, setRequests] = useState([]);
  const [view, setView] = useState("kanban");

  const fetchRequests = async () => {
    const res = await API.get("/requests");
    setRequests(res.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;

    await API.put(`/requests/${draggableId}`, {
      status: destination.droppableId
    });

    fetchRequests();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🔧 GearGuard – Maintenance System</h1>

      {/* Navigation */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setView("kanban")} style={{ marginRight: 10 }}>
          Kanban Board
        </button>
        <button onClick={() => setView("calendar")}>
          Preventive Calendar
        </button>
      </div>

      {/* Views */}
      <CreateRequest onCreated={fetchRequests} />

      {view === "kanban" ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <div style={{ display: "flex", gap: 20 }}>
            {columns.map(status => (
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      width: 250,
                      minHeight: 400,
                      background: "#393131ff",
                      padding: 10,
                      borderRadius: 8
                    }}
                  >
                    <h3>{status}</h3>

                    {requests
                      .filter(r => r.status === status)
                      .map((req, index) => (
                        <Draggable
                          key={req._id}
                          draggableId={req._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                background: "white",
                                padding: 10,
                                marginBottom: 10,
                                borderRadius: 6,
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                ...provided.draggableProps.style
                              }}
                            >
                              <strong>{req.subject}</strong>
                              <p>{req.equipment?.name}</p>
                              <small>
                                {req.assignedTo || "Unassigned"}
                              </small>
                            </div>
                          )}
                        </Draggable>
                      ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      ) : (
        <CalendarView />
      )}
    </div>
  );
}
