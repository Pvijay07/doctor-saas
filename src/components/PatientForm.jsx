import { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogClose,
  Button,
  Input,
  Label
} from "./ui.jsx";

const PatientForm = ({ patient, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: patient?.name || "",
    age: patient?.age || "",
    gender: patient?.gender || "Male",
    phone: patient?.phone || "",
    medicalHistory: patient?.medicalHistory || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const patientData = {
      ...formData,
      age: parseInt(formData.age)
    };
    onSubmit(patient?.id, patientData);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogHeader>
        <DialogTitle>{patient ? "Edit Patient" : "Add New Patient"}</DialogTitle>
        <DialogDescription>
          {patient ? "Make changes to patient details here." : "Fill in the details to add a new patient."}
        </DialogDescription>
      </DialogHeader>
      <DialogContent className="grid gap-4 py-4">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-left md:text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-1 md:col-span-3"
                required
              />
            </div>
            {/* Other form fields with similar responsive layout */}
          </div>
          <DialogFooter className="flex flex-col md:flex-row gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
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