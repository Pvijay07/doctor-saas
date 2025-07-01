import { useState } from "react";

const StaffManagement = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState("roles");

  // Staff data
  const staffMembers = [
    {
      id: 1,
      name: "Dr. Smith",
      role: "Dentist",
      email: "dr.smith@example.com",
    },
    {
      id: 2,
      name: "Hygienist Mary",
      role: "Hygienist",
      email: "mary@example.com",
    },
    {
      id: 3,
      name: "Receptionist John",
      role: "Receptionist",
      email: "john@example.com",
    },
  ];

  // Shift data
  const shifts = [
    {
      id: 1,
      staffId: 1,
      date: "2023-06-01",
      start: "08:00",
      end: "17:00",
      type: "Regular",
    },
    {
      id: 2,
      staffId: 2,
      date: "2023-06-01",
      start: "09:00",
      end: "18:00",
      type: "Regular",
    },
    {
      id: 3,
      staffId: 3,
      date: "2023-06-01",
      start: "08:30",
      end: "16:30",
      type: "Regular",
    },
  ];

  // Productivity data
  const productivity = [
    { id: 1, staffId: 1, date: "2023-06-01", patients: 12, procedures: 18 },
    { id: 2, staffId: 2, date: "2023-06-01", patients: 8, procedures: 10 },
    { id: 3, staffId: 3, date: "2023-06-01", patients: 20, procedures: 0 },
  ];

  const [permissions, setPermissions] = useState({
    1: { viewCharts: true, editCharts: true, deleteRecords: true },
    2: { viewCharts: true, editCharts: true, deleteRecords: false },
    3: { viewCharts: false, editCharts: false, deleteRecords: false },
  });

  const handlePermissionChange = (staffId, permission) => {
    setPermissions((prev) => ({
      ...prev,
      [staffId]: {
        ...prev[staffId],
        [permission]: !prev[staffId][permission],
      },
    }));
  };

  const ToggleSwitch = ({ checked, onChange, label }) => (
    <div className="flex items-center justify-between py-1">
      <span className="text-sm text-gray-700">{label}</span>
      <div
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
          checked ? "bg-blue-600" : "bg-gray-300"
        } cursor-pointer`}
        onClick={onChange}
      >
        <span
          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </div>
    </div>
  );

  // Function to get staff name by ID
  const getStaffNameById = (id) => {
    const staff = staffMembers.find((member) => member.id === id);
    return staff ? staff.name : "Unknown";
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Staff Management
        </h2>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("roles")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "roles"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Role-Based Access
            </button>
            <button
              onClick={() => setActiveTab("shifts")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "shifts"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Shift Scheduling
            </button>
            <button
              onClick={() => setActiveTab("productivity")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "productivity"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Productivity Tracking
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === "roles" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Permissions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {staffMembers.map((member, index) => (
                    <tr
                      key={member.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-6">
                        <div className="font-medium text-gray-900">
                          {member.name}
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                            member.role === "Dentist"
                              ? "bg-blue-100 text-blue-800"
                              : member.role === "Hygienist"
                              ? "bg-green-100 text-green-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {member.role}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-gray-600">
                        {member.email}
                      </td>
                      <td className="px-6 py-6">
                        <div className="space-y-3 min-w-48">
                          <ToggleSwitch
                            checked={permissions[member.id]?.viewCharts}
                            onChange={() =>
                              handlePermissionChange(member.id, "viewCharts")
                            }
                            label="View Charts"
                          />
                          <ToggleSwitch
                            checked={permissions[member.id]?.editCharts}
                            onChange={() =>
                              handlePermissionChange(member.id, "editCharts")
                            }
                            label="Edit Charts"
                          />
                          <ToggleSwitch
                            checked={permissions[member.id]?.deleteRecords}
                            onChange={() =>
                              handlePermissionChange(member.id, "deleteRecords")
                            }
                            label="Delete Records"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "shifts" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Staff Member
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Shift Time
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {shifts.map((shift, index) => (
                    <tr
                      key={shift.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-6">
                        <div className="font-medium text-gray-900">
                          {getStaffNameById(shift.staffId)}
                        </div>
                      </td>
                      <td className="px-6 py-6 text-gray-600">{shift.date}</td>
                      <td className="px-6 py-6 text-gray-600">
                        {shift.start} - {shift.end}
                      </td>
                      <td className="px-6 py-6">
                        <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                          {shift.type}
                        </span>
                      </td>
                      <td className="px-6 py-6">
                        <button className="text-blue-600 hover:text-blue-800 mr-4">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                + Add New Shift
              </button>
            </div>
          </div>
        )}

        {activeTab === "productivity" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Staff Member
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Patients
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Procedures
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Avg. Time per Patient
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {productivity.map((record, index) => (
                    <tr
                      key={record.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-6">
                        <div className="font-medium text-gray-900">
                          {getStaffNameById(record.staffId)}
                        </div>
                      </td>
                      <td className="px-6 py-6 text-gray-600">{record.date}</td>
                      <td className="px-6 py-6 text-gray-600">
                        {record.patients}
                      </td>
                      <td className="px-6 py-6 text-gray-600">
                        {record.procedures}
                      </td>
                      <td className="px-6 py-6 text-gray-600">
                        {Math.round(480 / record.patients)} mins
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900">
                  Productivity Summary
                </h3>
                <p className="text-sm text-gray-600">
                  Average patients per day:{" "}
                  {Math.round(
                    productivity.reduce(
                      (sum, record) => sum + record.patients,
                      0
                    ) / productivity.length
                  )}
                </p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Generate Report
              </button>
            </div>
          </div>
        )}

        {/* Pagination - Only show for roles tab */}
        {activeTab === "roles" && (
          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">3</span> of{" "}
              <span className="font-medium">3</span> results
            </p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">
                1
              </button>
              <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffManagement;
