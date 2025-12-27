import { useEffect, useState } from "react";
import API from "./api";

export default function CreateRequest({ onCreated }) {
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("Corrective");
  const [equipment, setEquipment] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    API.get("/equipment").then(res => {
      setEquipments(res.data);
    });
  }, []);

  const submitRequest = async (e) => {
    e.preventDefault();

    await API.post("/requests", {
      subject,
      type,
      equipment,
      scheduledDate: type === "Preventive" ? scheduledDate : null
    });

    setSubject("");
    setType("Corrective");
    setEquipment("");
    setScheduledDate("");

    onCreated(); // refresh kanban
  };

  return (
    <form
      onSubmit={submitRequest}
      style={{
        background: "#f9f9f9",
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        maxWidth: 400
      }}
    >
      <h3>Create Maintenance Request</h3>

      <input
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
        style={{ width: "100%", marginBottom: 10 }}
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      >
        <option value="Corrective">Corrective (Breakdown)</option>
        <option value="Preventive">Preventive (Routine)</option>
      </select>

      <select
        value={equipment}
        onChange={(e) => setEquipment(e.target.value)}
        required
        style={{ width: "100%", marginBottom: 10 }}
      >
        <option value="">Select Equipment</option>
        {equipments.map(eq => (
          <option key={eq._id} value={eq._id}>
            {eq.name}
          </option>
        ))}
      </select>

      {type === "Preventive" && (
        <input
          type="date"
          value={scheduledDate}
          onChange={(e) => setScheduledDate(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 10 }}
        />
      )}

      <button type="submit">Create Request</button>
    </form>
  );
}
