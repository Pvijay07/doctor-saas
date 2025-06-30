import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/Table";
import PatientForm from "../ui/PatientForm";
import { useFirebase } from "../firebase/FirebaseProvider";
import { collection, query, orderBy, onSnapshot, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

const PatientManagement = () => {
  const { db, userId } = useFirebase();
  const [patients, setPatients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
    <div className="p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 lg:mb-6 gap-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">Patient Management</h2>
        <Button onClick={openAddModal} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add New Patient
        </Button>
      </div>

      <div className="mb-4 lg:mb-6">
        <Input
          type="text"
          placeholder="Search patients by name or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-full sm:max-w-sm"
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
          <div className="overflow-x-auto">
            <Table className="min-w-full">
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
          </div>
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

export default PatientManagement;