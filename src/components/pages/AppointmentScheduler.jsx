import { Calendar, Modal, Form, Input, Select, Checkbox, Switch, Button } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

const AppointmentScheduler = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  
  const onSelectDate = (value) => {
    setSelectedDate(value);
    setIsModalVisible(true);
  };
  
  const providers = [
    { id: 1, name: 'Dr. Smith', color: '#1890ff' },
    { id: 2, name: 'Dr. Johnson', color: '#52c41a' },
    { id: 3, name: 'Hygienist Mary', color: '#faad14' }
  ];
  
  const operatories = [
    { id: 1, name: 'Operatory 1', color: '#ff4d4f' },
    { id: 2, name: 'Operatory 2', color: '#13c2c2' },
    { id: 3, name: 'Operatory 3', color: '#722ed1' }
  ];
  
  return (
    <div>
      <h2>Appointment Scheduling</h2>
      <Calendar 
        onSelect={onSelectDate}
        headerRender={({ value, onChange }) => {
          return (
            <div style={{ padding: 8, display: 'flex', justifyContent: 'space-between' }}>
              <Select
                defaultValue={providers[0].id}
                style={{ width: 200 }}
                options={providers.map(p => ({ value: p.id, label: p.name }))}
              />
              <div>
                <Button onClick={() => onChange(value.subtract(1, 'month'))}>Previous</Button>
                <span style={{ margin: '0 16px' }}>{dayjs(value).format('MMMM YYYY')}</span>
                <Button onClick={() => onChange(value.add(1, 'month'))}>Next</Button>
              </div>
            </div>
          );
        }}
        dateCellRender={(date) => {
          // Sample appointments
          if (date.date() === 15) {
            return (
              <div style={{ background: providers[0].color, color: 'white', padding: 4, borderRadius: 4 }}>
                <div>9:00 AM - John Doe</div>
                <div>Cleaning - Operatory 1</div>
              </div>
            );
          }
          return null;
        }}
      />
      
      <Modal 
        title={`New Appointment on ${selectedDate ? selectedDate.format('MMMM D, YYYY') : ''}`}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <AppointmentForm providers={providers} operatories={operatories} />
      </Modal>
    </div>
  );
};

const AppointmentForm = ({ providers, operatories }) => {
  const [form] = Form.useForm();
  const [sendReminder, setSendReminder] = useState(true);
  
  const onFinish = (values) => {
    console.log('Appointment created:', values);
  };
  
  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="patient" label="Patient" rules={[{ required: true }]}>
        <Input placeholder="Search patient..." />
      </Form.Item>
      
      <Form.Item name="provider" label="Provider" rules={[{ required: true }]}>
        <Select>
          {providers.map(p => (
            <Select.Option key={p.id} value={p.id}>{p.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      
      <Form.Item name="operatory" label="Operatory" rules={[{ required: true }]}>
        <Select>
          {operatories.map(o => (
            <Select.Option key={o.id} value={o.id}>{o.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      
      <Form.Item name="procedure" label="Procedure">
        <Input placeholder="E.g. Cleaning, Filling, etc." />
      </Form.Item>
      
      <Form.Item name="notes" label="Notes">
        <Input.TextArea rows={3} />
      </Form.Item>
      
      <Form.Item>
        <Checkbox checked={sendReminder} onChange={(e) => setSendReminder(e.target.checked)}>
          Send SMS/Email Reminder
        </Checkbox>
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">Schedule Appointment</Button>
      </Form.Item>
    </Form>
  );
};

export default AppointmentScheduler;
