import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/Table";
import AppointmentForm from "../ui/AppointmentForm";
import { useFirebase } from "../firebase/FirebaseProvider";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";

const AppointmentScheduling = () => {
  const { db, userId } = useFirebase();
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
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
          patients={patients}
        />
      )}
    </div>
  );
};

export default AppointmentScheduling;