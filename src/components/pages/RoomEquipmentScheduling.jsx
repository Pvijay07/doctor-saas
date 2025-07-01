import { useState } from "react";

const RoomEquipmentScheduling = () => {
  const [activeTab, setActiveTab] = useState("operatories");
  
  // Operatory data
  const [operatories, setOperatories] = useState([
    { id: 1, name: "Operatory 1", status: "Available", equipment: ["Chair A", "X-ray"], nextCleaning: "2023-06-15 12:00" },
    { id: 2, name: "Operatory 2", status: "In Use", equipment: ["Chair B", "Cone Beam CT"], nextCleaning: "2023-06-15 13:00" },
    { id: 3, name: "Operatory 3", status: "Maintenance", equipment: ["Chair C"], nextCleaning: "2023-06-16 09:00" },
  ]);

  // Equipment maintenance data
  const [maintenanceLogs, setMaintenanceLogs] = useState([
    { id: 1, equipment: "X-ray Machine 1", type: "X-ray", lastService: "2023-05-01", nextService: "2023-08-01", status: "Operational" },
    { id: 2, equipment: "Cone Beam CT", type: "Imaging", lastService: "2023-04-15", nextService: "2023-07-15", status: "Operational" },
    { id: 3, equipment: "Autoclave 1", type: "Sterilization", lastService: "2023-06-01", nextService: "2023-09-01", status: "Needs Calibration" },
  ]);

  // Schedule data
  const [schedules, setSchedules] = useState([
    { id: 1, operatoryId: 1, patient: "John Doe", procedure: "Cleaning", start: "2023-06-15 09:00", end: "2023-06-15 09:30", dentist: "Dr. Smith" },
    { id: 2, operatoryId: 2, patient: "Jane Smith", procedure: "Root Canal", start: "2023-06-15 10:00", end: "2023-06-15 11:30", dentist: "Dr. Johnson" },
    { id: 3, operatoryId: 1, patient: "Mike Brown", procedure: "Checkup", start: "2023-06-15 10:00", end: "2023-06-15 10:30", dentist: "Dr. Smith" },
  ]);

  const [newLog, setNewLog] = useState({
    equipment: "",
    type: "",
    serviceDate: "",
    notes: "",
    technician: ""
  });

  const handleAddLog = () => {
    const newId = Math.max(...maintenanceLogs.map(log => log.id)) + 1;
    setMaintenanceLogs([...maintenanceLogs, {
      id: newId,
      equipment: newLog.equipment,
      type: newLog.type,
      lastService: newLog.serviceDate,
      nextService: "", // Would calculate based on service type
      status: "Serviced",
      notes: newLog.notes,
      technician: newLog.technician
    }]);
    setNewLog({
      equipment: "",
      type: "",
      serviceDate: "",
      notes: "",
      technician: ""
    });
  };

  const getOperatoryName = (id) => {
    const operatory = operatories.find(op => op.id === id);
    return operatory ? operatory.name : "Unknown";
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      "Available": "bg-green-100 text-green-800",
      "In Use": "bg-yellow-100 text-yellow-800",
      "Maintenance": "bg-red-100 text-red-800",
      "Operational": "bg-green-100 text-green-800",
      "Needs Calibration": "bg-orange-100 text-orange-800",
      "Out of Service": "bg-red-100 text-red-800"
    };
    
    return (
      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${statusClasses[status] || "bg-gray-100 text-gray-800"}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Room & Equipment Management
        </h2>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("operatories")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "operatories"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Operatory Management
            </button>
            <button
              onClick={() => setActiveTab("maintenance")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "maintenance"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Maintenance Logs
            </button>
            <button
              onClick={() => setActiveTab("schedule")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "schedule"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Room Scheduling
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === "operatories" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Operatory
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Equipment
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Next Cleaning
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {operatories.map((operatory, index) => (
                    <tr
                      key={operatory.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-6">
                        <div className="font-medium text-gray-900">
                          {operatory.name}
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        {getStatusBadge(operatory.status)}
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex flex-wrap gap-2">
                          {operatory.equipment.map((item, i) => (
                            <span key={i} className="text-sm bg-blue-50 text-blue-800 px-2 py-1 rounded">
                              {item}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-6 text-gray-600">
                        {operatory.nextCleaning}
                      </td>
                      <td className="px-6 py-6">
                        <button className="text-blue-600 hover:text-blue-800 mr-4">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          Maintenance
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                + Add New Operatory
              </button>
            </div>
          </div>
        )}

        {activeTab === "maintenance" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Equipment
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Last Service
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Next Service
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {maintenanceLogs.map((log, index) => (
                      <tr
                        key={log.id}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-6 py-6">
                          <div className="font-medium text-gray-900">
                            {log.equipment}
                          </div>
                        </td>
                        <td className="px-6 py-6 text-gray-600">{log.type}</td>
                        <td className="px-6 py-6 text-gray-600">{log.lastService}</td>
                        <td className="px-6 py-6 text-gray-600">{log.nextService}</td>
                        <td className="px-6 py-6">
                          {getStatusBadge(log.status)}
                        </td>
                        <td className="px-6 py-6">
                          <button className="text-blue-600 hover:text-blue-800 mr-4">
                            Log Service
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            Flag Issue
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add Maintenance Log</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Equipment</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={newLog.equipment}
                    onChange={(e) => setNewLog({...newLog, equipment: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={newLog.type}
                    onChange={(e) => setNewLog({...newLog, type: e.target.value})}
                  >
                    <option value="">Select type</option>
                    <option value="X-ray">X-ray</option>
                    <option value="Imaging">Imaging</option>
                    <option value="Sterilization">Sterilization</option>
                    <option value="Chair">Chair</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={newLog.serviceDate}
                    onChange={(e) => setNewLog({...newLog, serviceDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Technician</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={newLog.technician}
                    onChange={(e) => setNewLog({...newLog, technician: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
                    value={newLog.notes}
                    onChange={(e) => setNewLog({...newLog, notes: e.target.value})}
                  />
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={handleAddLog}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Log Entry
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "schedule" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Operatory
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Patient
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Procedure
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Time
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Dentist
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {schedules.map((schedule, index) => (
                    <tr
                      key={schedule.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-6">
                        <div className="font-medium text-gray-900">
                          {getOperatoryName(schedule.operatoryId)}
                        </div>
                      </td>
                      <td className="px-6 py-6 text-gray-600">{schedule.patient}</td>
                      <td className="px-6 py-6 text-gray-600">{schedule.procedure}</td>
                      <td className="px-6 py-6 text-gray-600">
                        {schedule.start.split(" ")[1]} - {schedule.end.split(" ")[1]}
                      </td>
                      <td className="px-6 py-6 text-gray-600">{schedule.dentist}</td>
                      <td className="px-6 py-6">
                        <button className="text-blue-600 hover:text-blue-800 mr-4">
                          Reschedule
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                + Schedule Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomEquipmentScheduling;