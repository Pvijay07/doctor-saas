import React, { useEffect, useState } from "react";
import { Users, Calendar, Syringe } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/Card";
import Button from "../ui/Button";
import { useFirebase } from "../firebase/FirebaseProvider";
import { collection, onSnapshot } from "firebase/firestore";

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
    <div className="p-4 lg:p-6">
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 lg:mb-6">
        Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
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

        <Card className="sm:col-span-2 lg:col-span-1">
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

      <div>
        <h2 className="text-2xl font-bold mb-6">Practice Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Stats cards would go here */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-500">
              Today's Appointments
            </h3>
            <p className="text-3xl font-bold mt-2">12</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-500">Patients Seen</h3>
            <p className="text-3xl font-bold mt-2">8</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-500">Revenue Today</h3>
            <p className="text-3xl font-bold mt-2">$3,450</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-500">No-Shows</h3>
            <p className="text-3xl font-bold mt-2">1</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Upcoming Appointments</h3>
            {/* Appointment list would go here */}
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Recent Patients</h3>
            {/* Patient list would go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
