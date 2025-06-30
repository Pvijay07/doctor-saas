import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";

const MedicalRecords = () => {
  return (
    <div className="p-4 lg:p-6">
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 lg:mb-6">
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
          <ul className="space-y-2">
            <li>- Detailed patient history view</li>
            <li>- Prescription management</li>
            <li>- Lab results integration</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalRecords;