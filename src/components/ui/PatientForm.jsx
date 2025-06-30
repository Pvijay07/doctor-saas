import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "./Dialog";
import Button from "./Button";
import Input from "./Input";
import Label from "./Label";

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

export default PatientForm;