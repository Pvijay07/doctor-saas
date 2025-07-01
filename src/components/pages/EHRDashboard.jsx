import React from "react";
import { Tabs, Timeline, Card, Table, Layout, Tag } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  MedicineBoxOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Content } = Layout;

const EHRDashboard = () => {
  const patientData = {
    name: "John Doe",
    age: 42,
    gender: "Male",
    lastVisit: "2023-05-15",
  };

  const allergies = [
    { id: 1, name: "Penicillin", reaction: "Hives", severity: "Severe" },
    { id: 2, name: "Latex", reaction: "Rash", severity: "Moderate" },
  ];

  const medications = [
    {
      id: 1,
      name: "Amoxicillin",
      dosage: "500mg",
      frequency: "TID",
      prescribed: "2023-05-10",
    },
    {
      id: 2,
      name: "Ibuprofen",
      dosage: "200mg",
      frequency: "PRN",
      prescribed: "2023-05-10",
    },
  ];

  const procedures = [
    {
      date: "2023-05-15",
      procedure: "Dental Cleaning",
      tooth: "All",
      provider: "Dr. Smith",
    },
    {
      date: "2023-03-10",
      procedure: "Composite Filling",
      tooth: "36",
      provider: "Dr. Smith",
    },
  ];

  const treatmentPlan = [
    { step: 1, name: "Consultation", status: "Completed", date: "2023-05-10" },
    { step: 2, name: "X-ray", status: "Pending", date: "" },
    { step: 3, name: "Restoration", status: "Pending", date: "" },
  ];

  return (
    <Layout className="bg-gray-100 min-h-screen">
      <Content className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">DentalCare</h1>
          <p className="text-lg text-gray-600">Medical Records Dashboard</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Patient Profile: {patientData.name}
          </h2>
        </div>

        <Tabs
          defaultActiveKey="1"
          type="card"
          className="bg-white p-4 rounded-lg shadow"
          items={[
            {
              label: "Overview",
              key: "1",
              children: (
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Patient Info */}
                  <Card
                    title="Patient Info"
                    className="w-full md:w-1/3 shadow-sm"
                    styles={{
                      backgroundColor: "#f9fafb",
                      fontWeight: "600",
                    }}
                  >
                    <p>
                      <UserOutlined /> <strong>Age:</strong> {patientData.age}
                    </p>
                    <p>
                      <UserOutlined /> <strong>Gender:</strong>{" "}
                      {patientData.gender}
                    </p>
                    <p>
                      <CalendarOutlined /> <strong>Last Visit:</strong>{" "}
                      {patientData.lastVisit}
                    </p>
                  </Card>

                  {/* Timeline */}
                  <Card
                    title="Visit Timeline"
                    className="w-full md:w-2/3 shadow-sm"
                    headStyle={{
                      backgroundColor: "#f9fafb",
                      fontWeight: "600",
                    }}
                  >
                    <Timeline mode="left">
                      {procedures.map((proc, index) => (
                        <Timeline.Item key={index} label={proc.date}>
                          <span className="font-medium">{proc.procedure}</span>{" "}
                          on tooth <strong>{proc.tooth}</strong> by{" "}
                          {proc.provider}
                        </Timeline.Item>
                      ))}
                    </Timeline>
                  </Card>
                </div>
              ),
            },
            {
              label: "Allergies",
              key: "2",
              children: (
                <Table
                  columns={[
                    { title: "Allergen", dataIndex: "name" },
                    { title: "Reaction", dataIndex: "reaction" },
                    {
                      title: "Severity",
                      dataIndex: "severity",
                      render: (severity) => (
                        <Tag
                          color={
                            severity === "Severe"
                              ? "red"
                              : severity === "Moderate"
                              ? "orange"
                              : "green"
                          }
                        >
                          {severity}
                        </Tag>
                      ),
                    },
                  ]}
                  dataSource={allergies}
                  rowKey="id"
                  pagination={false}
                  className="rounded-lg shadow-sm"
                />
              ),
            },
            {
              label: "Medications",
              key: "3",
              children: (
                <Table
                  columns={[
                    { title: "Medication", dataIndex: "name" },
                    { title: "Dosage", dataIndex: "dosage" },
                    { title: "Frequency", dataIndex: "frequency" },
                    { title: "Prescribed Date", dataIndex: "prescribed" },
                  ]}
                  dataSource={medications}
                  rowKey="id"
                  pagination={false}
                  className="rounded-lg shadow-sm"
                />
              ),
            },
            {
              label: "Treatment Plan",
              key: "4",
              children: (
                <Card
                  title="Treatment Plan Progress"
                  className="shadow-sm"
                  styles={{ backgroundColor: "#f9fafb", fontWeight: "600" }}
                >
                  <TreatmentPlanBuilder plan={treatmentPlan} />
                </Card>
              ),
            },
          ]}
        />
      </Content>
    </Layout>
  );
};

const TreatmentPlanBuilder = ({ plan }) => (
  <Timeline mode="left">
    {plan.map((step) => (
      <Timeline.Item
        key={step.step}
        color={step.status === "Completed" ? "green" : "blue"}
        dot={
          step.status === "Completed" ? (
            <CheckCircleOutlined style={{ color: "green" }} />
          ) : (
            <ClockCircleOutlined style={{ color: "blue" }} />
          )
        }
        label={step.date || "Pending"}
      >
        <strong>{step.name}</strong> - {step.status}
      </Timeline.Item>
    ))}
  </Timeline>
);

export default EHRDashboard;
