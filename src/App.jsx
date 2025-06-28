import React, { useState, useEffect, createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithCustomToken,
  signInAnonymously,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Lucide React Icons for a modern look
import {
  LayoutDashboard,
  Users,
  Calendar,
  Syringe,
  Pill,
  LogOut,
  Plus,
  Search,
  X,
  Edit,
  Trash2,
} from "lucide-react";

// Shadcn UI components (simulated with Tailwind classes for brevity and to keep it self-contained)

// --- Utility Components (Simplified Shadcn-like) ---
const FirebaseContext = createContext(null);

const Button = ({
  children,
  onClick,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) => {
  let baseClasses =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-slate-300";
  let variantClasses = "";
  let sizeClasses = "";

  switch (variant) {
    case "default":
      variantClasses = "bg-blue-600 text-white shadow hover:bg-blue-700/90";
      break;
    case "outline":
      variantClasses =
        "border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50";
      break;
    case "destructive":
      variantClasses = "bg-red-600 text-white shadow-sm hover:bg-red-700/90";
      break;
    case "ghost":
      variantClasses =
        "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50";
      break;
    case "link":
      variantClasses =
        "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50";
      break;
    case "secondary":
      variantClasses =
        "bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-200/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700/80";
      break;
  }

  switch (size) {
    case "default":
      sizeClasses = "h-9 px-4 py-2";
      break;
    case "sm":
      sizeClasses = "h-8 rounded-md px-3 text-xs";
      break;
    case "lg":
      sizeClasses = "h-10 rounded-md px-8";
      break;
    case "icon":
      sizeClasses = "h-9 w-9";
      break;
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({
  type = "text",
  placeholder = "",
  className = "",
  ...props
}) => {
  return (
    <input
      type={type}
      className={`flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:placeholder:text-slate-400 ${className}`}
      placeholder={placeholder}
      {...props}
    />
  );
};

const Label = ({ children, htmlFor, className = "" }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    >
      {children}
    </label>
  );
};

const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`rounded-lg border bg-white text-slate-950 shadow-sm dark:bg-slate-950 dark:text-slate-50 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "" }) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
      {children}
    </div>
  );
};

const CardTitle = ({ children, className = "" }) => {
  return (
    <h3
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
    >
      {children}
    </h3>
  );
};

const CardDescription = ({ children, className = "" }) => {
  return (
    <p className={`text-sm text-slate-500 dark:text-slate-400 ${className}`}>
      {children}
    </p>
  );
};

const CardContent = ({ children, className = "" }) => {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
};

const Table = ({ children, className = "" }) => {
  return (
    <div className="relative w-full overflow-auto">
      <table className={`w-full caption-bottom text-sm ${className}`}>
        {children}
      </table>
    </div>
  );
};

const TableHeader = ({ children, className = "" }) => {
  return <thead className={`[&_tr]:border-b ${className}`}>{children}</thead>;
};

const TableBody = ({ children, className = "" }) => {
  return (
    <tbody className={`[&_tr:last-child]:border-0 ${className}`}>
      {children}
    </tbody>
  );
};

const TableRow = ({ children, className = "" }) => {
  return (
    <tr
      className={`border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800 ${className}`}
    >
      {children}
    </tr>
  );
};

const TableHead = ({ children, className = "" }) => {
  return (
    <th
      className={`h-10 px-2 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 [&_span]:line-clamp-1 dark:text-slate-400 ${className}`}
    >
      {children}
    </th>
  );
};

const TableCell = ({ children, className = "" }) => {
  return (
    <td
      className={`p-2 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}
    >
      {children}
    </td>
  );
};

const Dialog = ({ children, open, onOpenChange }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative z-50 w-full max-w-lg rounded-lg border bg-white p-6 shadow-lg">
        {children}
      </div>
    </div>
  );
};

const DialogHeader = ({ children }) => (
  <div className="flex flex-col space-y-1.5 text-center sm:text-left">
    {children}
  </div>
);
const DialogTitle = ({ children }) => (
  <h3 className="text-lg font-semibold leading-none tracking-tight">
    {children}
  </h3>
);
const DialogDescription = ({ children }) => (
  <p className="text-sm text-slate-500">{children}</p>
);
const DialogContent = ({ children, className = "" }) => (
  <div className={`py-4 ${className}`}>{children}</div>
);
const DialogFooter = ({ children }) => (
  <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4">
    {children}
  </div>
);
const DialogClose = ({ children, onClick }) => (
  <Button variant="outline" onClick={onClick}>
    {children}
  </Button>
);
// --- Firebase Context ---
const FirebaseProvider = ({ children }) => {
  const [firebaseApp, setFirebaseApp] = useState(null);
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        const firebaseConfig = {
          apiKey: "AIzaSyAD_TqXyZZHwk4cN3FDIcpQ33hfdbHdrps",
          authDomain: "petsfolio-2204f.firebaseapp.com",
          projectId: "petsfolio-2204f",
          storageBucket: "petsfolio-2204f.appspot.com",
          messagingSenderId: "941943976685",
          appId: "1:941943976685:web:07c5d772412dff182812e4",
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const firestore = getFirestore(app);
        const firebaseAuth = getAuth(app);

        setFirebaseApp(app);
        setDb(firestore);
        setAuth(firebaseAuth);

        const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
          if (user) {
            setUserId(user.uid);
            setLoading(false);
          } else {
            try {
              const initialAuthToken =
                typeof __initial_auth_token !== "undefined"
                  ? __initial_auth_token
                  : null;

              if (initialAuthToken) {
                await signInWithCustomToken(firebaseAuth, initialAuthToken);
              } else {
                await signInAnonymously(firebaseAuth);
              }
            } catch (error) {
              console.error("Authentication error:", error);
              // Fallback to anonymous auth if other methods fail
              try {
                await signInAnonymously(firebaseAuth);
              } catch (anonError) {
                console.error("Anonymous auth failed:", anonError);
                setLoading(false);
              }
            }
          }
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Firebase initialization failed:", error);
        setLoading(false);
      }
    };

    initializeFirebase();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-lg text-gray-700">Loading application...</p>
      </div>
    );
  }

  return (
    <FirebaseContext.Provider value={{ db, auth, userId, firebaseApp }}>
      {children}
    </FirebaseContext.Provider>
  );
};

const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};

// --- Patient Management Component ---
const PatientManagement = () => {
  const { db, userId } = useFirebase();
  const [patients, setPatients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null); // For editing
  const [searchTerm, setSearchTerm] = useState("");

  // Firestore collection path
  const patientsCollectionPath = `artifacts/${
    typeof __app_id !== "undefined" ? __app_id : "default-app-id"
  }/users/${userId}/patients`;

  useEffect(() => {
    if (!db || !userId) return;

    const q = query(collection(db, patientsCollectionPath), orderBy("name"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const patientsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPatients(patientsData);
      },
      (error) => {
        console.error("Error fetching patients:", error);
      }
    );

    return () => unsubscribe();
  }, [db, userId]);

  const handleAddPatient = async (patientData) => {
    try {
      await addDoc(collection(db, patientsCollectionPath), patientData);
      console.log("Patient added successfully!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleUpdatePatient = async (id, patientData) => {
    try {
      const patientRef = doc(db, patientsCollectionPath, id);
      await updateDoc(patientRef, patientData);
      console.log("Patient updated successfully!");
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const handleDeletePatient = async (id) => {
    try {
      await deleteDoc(doc(db, patientsCollectionPath, id));
      console.log("Patient deleted successfully!");
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  const openAddModal = () => {
    setCurrentPatient(null);
    setIsModalOpen(true);
  };

  const openEditModal = (patient) => {
    setCurrentPatient(patient);
    setIsModalOpen(true);
  };

  const closePatientModal = () => {
    setIsModalOpen(false);
    setCurrentPatient(null);
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Patient Management</h2>
        <Button onClick={openAddModal}>
          <Plus className="mr-2 h-4 w-4" /> Add New Patient
        </Button>
      </div>

      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search patients by name or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient List</CardTitle>
          <CardDescription>
            View and manage your patient records.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan="5"
                    className="text-center py-4 text-slate-500"
                  >
                    No patients found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">
                      {patient.name}
                    </TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>{patient.phone}</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openEditModal(patient)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeletePatient(patient.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {isModalOpen && (
        <PatientForm
          patient={currentPatient}
          onClose={closePatientModal}
          onSubmit={currentPatient ? handleUpdatePatient : handleAddPatient}
        />
      )}
    </div>
  );
};

// Patient Form Component
const PatientForm = ({ patient, onClose, onSubmit }) => {
  const [name, setName] = useState(patient?.name || "");
  const [age, setAge] = useState(patient?.age || "");
  const [gender, setGender] = useState(patient?.gender || "Male");
  const [phone, setPhone] = useState(patient?.phone || "");
  const [medicalHistory, setMedicalHistory] = useState(
    patient?.medicalHistory || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const patientData = {
      name,
      age: parseInt(age),
      gender,
      phone,
      medicalHistory,
    };
    onSubmit(patient?.id, patientData);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogHeader>
        <DialogTitle>
          {patient ? "Edit Patient" : "Add New Patient"}
        </DialogTitle>
        <DialogDescription>
          {patient
            ? "Make changes to patient details here."
            : "Fill in the details to add a new patient."}
        </DialogDescription>
      </DialogHeader>
      <DialogContent className="grid gap-4 py-4">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="age" className="text-right">
                Age
              </Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right">
                Gender
              </Label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="col-span-3 h-9 rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="medicalHistory" className="text-right">
                Medical History
              </Label>
              <textarea
                id="medicalHistory"
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
                className="col-span-3 flex min-h-[60px] w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600"
                rows="4"
              ></textarea>
            </div>
          </div>
          <DialogFooter>
            <DialogClose onClick={onClose}>Cancel</DialogClose>
            <Button type="submit">
              {patient ? "Save Changes" : "Add Patient"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// --- Appointment Scheduling Component ---
const AppointmentScheduling = () => {
  const { db, userId } = useFirebase();
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]); // To link appointments to patients
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);

  const appointmentsCollectionPath = `artifacts/${
    typeof __app_id !== "undefined" ? __app_id : "default-app-id"
  }/users/${userId}/appointments`;
  const patientsCollectionPath = `artifacts/${
    typeof __app_id !== "undefined" ? __app_id : "default-app-id"
  }/users/${userId}/patients`;

  // Fetch appointments
  useEffect(() => {
    if (!db || !userId) return;

    const q = query(
      collection(db, appointmentsCollectionPath),
      orderBy("appointmentDate")
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const appointmentsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppointments(appointmentsData);
      },
      (error) => {
        console.error("Error fetching appointments:", error);
      }
    );

    return () => unsubscribe();
  }, [db, userId]);

  // Fetch patients (for linking appointments)
  useEffect(() => {
    if (!db || !userId) return;

    const q = query(collection(db, patientsCollectionPath), orderBy("name"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const patientsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPatients(patientsData);
      },
      (error) => {
        console.error("Error fetching patients for appointments:", error);
      }
    );

    return () => unsubscribe();
  }, [db, userId]);

  const handleAddAppointment = async (appointmentData) => {
    try {
      await addDoc(collection(db, appointmentsCollectionPath), appointmentData);
      console.log("Appointment added successfully!");
    } catch (e) {
      console.error("Error adding appointment: ", e);
    }
  };

  const handleUpdateAppointment = async (id, appointmentData) => {
    try {
      const appointmentRef = doc(db, appointmentsCollectionPath, id);
      await updateDoc(appointmentRef, appointmentData);
      console.log("Appointment updated successfully!");
    } catch (e) {
      console.error("Error updating appointment: ", e);
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      await deleteDoc(doc(db, appointmentsCollectionPath, id));
      console.log("Appointment deleted successfully!");
    } catch (e) {
      console.error("Error deleting appointment: ", e);
    }
  };

  const openAddModal = () => {
    setCurrentAppointment(null);
    setIsModalOpen(true);
  };

  const openEditModal = (appointment) => {
    setCurrentAppointment(appointment);
    setIsModalOpen(true);
  };

  const closeAppointmentModal = () => {
    setIsModalOpen(false);
    setCurrentAppointment(null);
  };

  // Helper to get patient name from ID
  const getPatientName = (patientId) => {
    const patient = patients.find((p) => p.id === patientId);
    return patient ? patient.name : "Unknown Patient";
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Appointment Scheduling
        </h2>
        <Button onClick={openAddModal}>
          <Plus className="mr-2 h-4 w-4" /> Schedule New Appointment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardDescription>Manage your patient appointments.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan="5"
                    className="text-center py-4 text-slate-500"
                  >
                    No appointments scheduled.
                  </TableCell>
                </TableRow>
              ) : (
                appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">
                      {getPatientName(appointment.patientId)}
                    </TableCell>
                    <TableCell>
                      {new Date(
                        appointment.appointmentDate
                      ).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{appointment.appointmentTime}</TableCell>
                    <TableCell>{appointment.reason}</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openEditModal(appointment)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteAppointment(appointment.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {isModalOpen && (
        <AppointmentForm
          appointment={currentAppointment}
          onClose={closeAppointmentModal}
          onSubmit={
            currentAppointment ? handleUpdateAppointment : handleAddAppointment
          }
          patients={patients} // Pass patients for dropdown
        />
      )}
    </div>
  );
};

// Appointment Form Component
const AppointmentForm = ({ appointment, onClose, onSubmit, patients }) => {
  const [patientId, setPatientId] = useState(
    appointment?.patientId || (patients.length > 0 ? patients[0].id : "")
  );
  const [appointmentDate, setAppointmentDate] = useState(
    appointment?.appointmentDate || ""
  );
  const [appointmentTime, setAppointmentTime] = useState(
    appointment?.appointmentTime || ""
  );
  const [reason, setReason] = useState(appointment?.reason || "");

  useEffect(() => {
    // If editing and patients load after appointment, ensure patientId is set correctly
    if (appointment && patients.length > 0 && !patientId) {
      setPatientId(appointment.patientId);
    }
  }, [appointment, patients, patientId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientId) {
      console.error("Please select a patient.");
      return;
    }
    const appointmentData = {
      patientId,
      appointmentDate,
      appointmentTime,
      reason,
    };
    onSubmit(appointment?.id, appointmentData);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogHeader>
        <DialogTitle>
          {appointment ? "Edit Appointment" : "Schedule New Appointment"}
        </DialogTitle>
        <DialogDescription>
          {appointment
            ? "Modify appointment details here."
            : "Fill in the details to schedule a new appointment."}
        </DialogDescription>
      </DialogHeader>
      <DialogContent className="grid gap-4 py-4">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="patient" className="text-right">
                Patient
              </Label>
              <select
                id="patient"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="col-span-3 h-9 rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600"
                required
              >
                {patients.length === 0 && (
                  <option value="">
                    No patients available. Add a patient first.
                  </option>
                )}
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <Input
                id="time"
                type="time"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reason" className="text-right">
                Reason
              </Label>
              <Input
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose onClick={onClose}>Cancel</DialogClose>
            <Button type="submit" disabled={!patientId}>
              {appointment ? "Save Changes" : "Schedule Appointment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// --- Dashboard Component ---
const Dashboard = () => {
  const { db, userId } = useFirebase();
  const [patientCount, setPatientCount] = useState(0);
  const [upcomingAppointmentsCount, setUpcomingAppointmentsCount] = useState(0);

  const patientsCollectionPath = `artifacts/${
    typeof __app_id !== "undefined" ? __app_id : "default-app-id"
  }/users/${userId}/patients`;
  const appointmentsCollectionPath = `artifacts/${
    typeof __app_id !== "undefined" ? __app_id : "default-app-id"
  }/users/${userId}/appointments`;

  useEffect(() => {
    if (!db || !userId) return;

    // Fetch patient count
    const unsubscribePatients = onSnapshot(
      collection(db, patientsCollectionPath),
      (snapshot) => {
        setPatientCount(snapshot.size);
      },
      (error) => {
        console.error("Error fetching patient count:", error);
      }
    );

    // Fetch upcoming appointments count
    const unsubscribeAppointments = onSnapshot(
      collection(db, appointmentsCollectionPath),
      (snapshot) => {
        const now = new Date();
        const upcoming = snapshot.docs.filter((doc) => {
          const apptDate = new Date(
            `${doc.data().appointmentDate}T${doc.data().appointmentTime}`
          );
          return apptDate > now;
        });
        setUpcomingAppointmentsCount(upcoming.length);
      },
      (error) => {
        console.error("Error fetching appointment count:", error);
      }
    );

    return () => {
      unsubscribePatients();
      unsubscribeAppointments();
    };
  }, [db, userId]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Patients
            </CardTitle>
            <Users className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patientCount}</div>
            <p className="text-xs text-slate-500">
              Patients registered in your system
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {upcomingAppointmentsCount}
            </div>
            <p className="text-xs text-slate-500">
              Appointments scheduled in the future
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            <Syringe className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <Button variant="secondary" className="w-full">
                Add New Prescription
              </Button>
              <Button variant="secondary" className="w-full">
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  // const { auth } = useFirebase(); // Moved useFirebase here

  return (
    <FirebaseProvider>
      {" "}
      {/* Wrap the entire application with FirebaseProvider */}
      <div className="min-h-screen bg-gray-100 flex font-inter">
        {/* Tailwind CSS CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
        {/* Google Fonts CDN */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Inline styles for font-family */}
        <style>
          {`
          body { font-family: 'Inter', sans-serif; }
          .font-inter { font-family: 'Inter', sans-serif; }
          `}
        </style>

        {/* Sidebar */}
        <aside className="w-64 bg-blue-800 text-white flex flex-col p-4 shadow-lg rounded-r-lg">
          <div className="text-2xl font-bold mb-8 text-center py-2 rounded-md bg-blue-900">
            MediCare
          </div>
          <nav className="flex-1">
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  onClick={() => setCurrentPage("dashboard")}
                  className={`flex items-center p-3 rounded-md transition-colors ${
                    currentPage === "dashboard"
                      ? "bg-blue-700 text-white shadow"
                      : "hover:bg-blue-700"
                  }`}
                >
                  <LayoutDashboard className="mr-3 h-5 w-5" />
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setCurrentPage("patients")}
                  className={`flex items-center p-3 rounded-md transition-colors ${
                    currentPage === "patients"
                      ? "bg-blue-700 text-white shadow"
                      : "hover:bg-blue-700"
                  }`}
                >
                  <Users className="mr-3 h-5 w-5" />
                  Patients
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setCurrentPage("appointments")}
                  className={`flex items-center p-3 rounded-md transition-colors ${
                    currentPage === "appointments"
                      ? "bg-blue-700 text-white shadow"
                      : "hover:bg-blue-700"
                  }`}
                >
                  <Calendar className="mr-3 h-5 w-5" />
                  Appointments
                </a>
              </li>
              {/* Additional sections can be added here */}
              <li>
                <a
                  href="#"
                  onClick={() => setCurrentPage("medical-records")}
                  className={`flex items-center p-3 rounded-md transition-colors ${
                    currentPage === "medical-records"
                      ? "bg-blue-700 text-white shadow"
                      : "hover:bg-blue-700"
                  }`}
                >
                  <Syringe className="mr-3 h-5 w-5" />
                  Medical Records
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setCurrentPage("billing")}
                  className={`flex items-center p-3 rounded-md transition-colors ${
                    currentPage === "billing"
                      ? "bg-blue-700 text-white shadow"
                      : "hover:bg-blue-700"
                  }`}
                >
                  <Pill className="mr-3 h-5 w-5" />
                  Billing
                </a>
              </li>
            </ul>
          </nav>
          <div className="mt-auto pt-4 border-t border-blue-700">
            <div className="text-xs text-blue-300 mb-2">User ID:</div>
            {/* Call useFirebase here where it's within the provider scope */}
            <UserDisplay />
            <SignOutButton />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {currentPage === "dashboard" && <Dashboard />}
            {currentPage === "patients" && <PatientManagement />}
            {currentPage === "appointments" && <AppointmentScheduling />}
            {currentPage === "medical-records" && (
              <div className="p-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Medical Records (Under Development)
                </h2>
                <p className="text-gray-600">
                  This section will allow you to view and manage detailed
                  medical records for each patient, including diagnoses,
                  prescriptions, and visit notes.
                </p>
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Future Enhancements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul>
                      <li>- Detailed patient history view</li>
                      <li>- Prescription management</li>
                      <li>- Lab results integration</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
            {currentPage === "billing" && (
              <div className="p-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Billing & Payments (Under Development)
                </h2>
                <p className="text-gray-600">
                  This section will help you manage billing, invoices, and
                  payment tracking.
                </p>
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Future Enhancements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul>
                      <li>- Invoice generation</li>
                      <li>- Payment tracking and status</li>
                      <li>-- Basic reporting on revenue</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </FirebaseProvider>
  );
}

// New component to display User ID, ensures useFirebase is called within the provider
const UserDisplay = () => {
  const { userId } = useFirebase();
  return (
    <div className="text-sm font-medium break-all mb-4">
      {userId || "Loading..."}
    </div>
  );
};

const SignOutButton = () => {
  const { auth } = useFirebase();

  const handleSignOut = async () => {
    if (auth) {
      try {
        await signOut(auth);
        console.log("User signed out.");
      } catch (error) {
        console.error("Error signing out:", error);
      }
    }
  };

  return (
    <Button
      onClick={handleSignOut}
      className="w-full bg-blue-700 hover:bg-blue-600 text-white"
    >
      <LogOut className="mr-2 h-4 w-4" /> Sign Out
    </Button>
  );
};
