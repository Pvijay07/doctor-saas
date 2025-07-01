import { Steps, Form, Input, Button, Select, Badge, Slider, InputNumber, Tabs, Card, Divider, Alert, Space } from 'antd';
import { useState } from 'react';
import { 
  IdcardOutlined, 
  FileSearchOutlined, 
  DollarOutlined, 
  CreditCardOutlined, 
  ScheduleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';

const { Step } = Steps;
const { Option } = Select;
const { TabPane } = Tabs;

const BillingTools = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">Billing & Insurance</h2>
      <Card className="shadow-sm rounded-xl">
        <Tabs defaultActiveKey="1" className="custom-tabs">
          <TabPane 
            tab={
              <span className="flex items-center">
                <FileSearchOutlined className="mr-2" />
                Insurance Claims
              </span>
            } 
            key="1"
          >
            <ClaimWizard />
          </TabPane>
          <TabPane 
            tab={
              <span className="flex items-center">
                <DollarOutlined className="mr-2" />
                Payments
              </span>
            } 
            key="2"
          >
            <PaymentProcessing />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

const ClaimWizard = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [eligibility, setEligibility] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const checkEligibility = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const isEligible = Math.random() > 0.3; // 70% chance of eligible
      setEligibility(isEligible);
      setLoading(false);
      
      if (isEligible) {
        form.setFieldsValue({
          procedureCode: 'D1110',
          toothNumber: '',
          description: 'Routine dental cleaning'
        });
      }
    }, 1500);
  };
  
  const steps = [
    {
      title: 'Patient Info',
      icon: <IdcardOutlined />,
      content: (
        <div className="max-w-2xl mx-auto">
          <Form form={form} layout="vertical" className="space-y-4">
            <Form.Item 
              name="patientId" 
              label={<span className="font-medium text-gray-700">Patient ID</span>} 
              rules={[{ required: true, message: 'Please input patient ID' }]}
            >
              <Input size="large" placeholder="Enter patient ID" />
            </Form.Item>
            
            <Form.Item 
              name="insuranceProvider" 
              label={<span className="font-medium text-gray-700">Insurance Provider</span>} 
              rules={[{ required: true, message: 'Please select insurance provider' }]}
            >
              <Select size="large" placeholder="Select provider">
                <Option value="delta">Delta Dental</Option>
                <Option value="metlife">MetLife</Option>
                <Option value="aetna">Aetna</Option>
                <Option value="bluecross">BlueCross BlueShield</Option>
                <Option value="cigna">Cigna</Option>
              </Select>
            </Form.Item>
            
            <Form.Item 
              name="memberId" 
              label={<span className="font-medium text-gray-700">Member ID</span>} 
              rules={[{ required: true, message: 'Please input member ID' }]}
            >
              <Input size="large" placeholder="Enter member ID" />
            </Form.Item>
            
            <div className="flex justify-between items-center">
              <Button 
                type="primary" 
                size="large"
                onClick={checkEligibility} 
                loading={loading}
                icon={<FileSearchOutlined />}
                className="flex items-center"
              >
                Check Eligibility
              </Button>
              
              {eligibility !== null && (
                <div className="flex items-center ml-4">
                  <span className="mr-2 font-medium">Insurance Status:</span>
                  <Badge 
                    status={eligibility ? 'success' : 'error'} 
                    text={
                      <span className={`font-medium ${eligibility ? 'text-green-600' : 'text-red-600'}`}>
                        {eligibility ? 'Eligible' : 'Not Eligible'}
                      </span>
                    } 
                  />
                </div>
              )}
            </div>
          </Form>
        </div>
      ),
    },
    {
      title: 'Procedure',
      icon: <FileSearchOutlined />,
      content: (
        <div className="max-w-2xl mx-auto">
          <Form form={form} layout="vertical" className="space-y-4">
            <Form.Item 
              name="procedureCode" 
              label={<span className="font-medium text-gray-700">CDT Code</span>} 
              rules={[{ required: true, message: 'Please select procedure code' }]}
            >
              <Select 
                size="large" 
                showSearch
                placeholder="Search procedure code"
                optionFilterProp="children"
              >
                <Option value="D1110">D1110 - Adult Prophylaxis</Option>
                <Option value="D2391">D2391 - Resin - 1 surface</Option>
                <Option value="D0274">D0274 - Bitewing - 4 films</Option>
                <Option value="D2750">D2750 - Crown - porcelain fused to metal</Option>
                <Option value="D4341">D4341 - Periodontal scaling</Option>
              </Select>
            </Form.Item>
            
            <Form.Item 
              name="toothNumber" 
              label={<span className="font-medium text-gray-700">Tooth Number (FDI)</span>}
            >
              <Input size="large" placeholder="e.g., 36 for lower left molar" />
            </Form.Item>
            
            <Form.Item 
              name="description" 
              label={<span className="font-medium text-gray-700">Description</span>}
            >
              <Input.TextArea rows={4} size="large" placeholder="Enter procedure details" />
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      title: 'Review',
      icon: <CheckCircleOutlined />,
      content: (
        <div className="max-w-3xl mx-auto">
          <Card title="Claim Summary" className="mb-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-500">Patient Information</h4>
                  <div className="mt-2 space-y-1">
                    <p>Patient ID: {form.getFieldValue('patientId')}</p>
                    <p>Member ID: {form.getFieldValue('memberId')}</p>
                    <p>Provider: {form.getFieldValue('insuranceProvider')}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-500">Procedure Details</h4>
                  <div className="mt-2 space-y-1">
                    <p>CDT Code: {form.getFieldValue('procedureCode')}</p>
                    <p>Tooth: {form.getFieldValue('toothNumber') || 'N/A'}</p>
                  </div>
                </div>
              </div>
              
              <Divider />
              
              <div>
                <h4 className="font-medium text-gray-500">Description</h4>
                <p className="mt-2 text-gray-700">
                  {form.getFieldValue('description') || 'No description provided'}
                </p>
              </div>
              
              <Divider />
              
              <div className="flex items-center">
                <span className="font-medium mr-2">Eligibility Status:</span>
                {eligibility ? (
                  <span className="inline-flex items-center text-green-600">
                    <CheckCircleOutlined className="mr-1" /> Eligible
                  </span>
                ) : (
                  <span className="inline-flex items-center text-red-600">
                    <CloseCircleOutlined className="mr-1" /> Not Eligible
                  </span>
                )}
              </div>
            </div>
          </Card>
          
          <Alert
            message="Please review all information before submitting"
            type="info"
            showIcon
            className="mb-6"
          />
          
          <Button type="primary" size="large" block>
            Submit Claim
          </Button>
        </div>
      ),
    },
  ];
  
  const next = () => {
    form.validateFields()
      .then(() => {
        setCurrent(current + 1);
      })
      .catch(err => console.log('Validation failed:', err));
  };
  
  const prev = () => {
    setCurrent(current - 1);
  };
  
  return (
    <div className="px-4">
      <Steps current={current} className="mb-8 custom-steps">
        {steps.map(item => (
          <Step 
            key={item.title} 
            title={item.title} 
            icon={item.icon}
            className="custom-step"
          />
        ))}
      </Steps>
      
      <div className="steps-content mb-8">
        {steps[current].content}
      </div>
      
      <div className="flex justify-between">
        <div>
          {current > 0 && (
            <Button 
              size="large" 
              onClick={() => prev()}
              className="mr-4"
            >
              Back
            </Button>
          )}
        </div>
        <div>
          {current < steps.length - 1 ? (
            <Button 
              type="primary" 
              size="large" 
              onClick={() => next()}
              disabled={current === 0 && eligibility === null}
            >
              Continue
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const PaymentProcessing = () => {
  const [totalAmount, setTotalAmount] = useState(500);
  const [paymentAllocation, setPaymentAllocation] = useState({
    hsa: 200,
    creditCard: 200,
    paymentPlan: 100
  });
  const [processing, setProcessing] = useState(false);
  
  const handleSliderChange = (key, value) => {
    setPaymentAllocation(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const remaining = totalAmount - Object.values(paymentAllocation).reduce((a, b) => a + b, 0);
  
  const processPayment = () => {
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      Alert.success({
        message: 'Payment Processed Successfully',
        description: 'The payment has been successfully allocated and processed.',
      });
    }, 2000);
  };
  
  const PaymentMethodCard = ({ title, icon, color, value, onChange }) => (
    <Card className="mb-6 shadow-sm">
      <div className="flex items-center mb-4">
        <div className={`p-2 rounded-lg ${color} text-white mr-3`}>
          {icon}
        </div>
        <h3 className="font-medium text-lg">{title}</h3>
      </div>
      
      <div className="flex items-center">
        <Slider 
          min={0}
          max={totalAmount}
          value={value}
          onChange={onChange}
          className="flex-1 mr-4"
          trackStyle={{ backgroundColor: color }}
          handleStyle={{ borderColor: color }}
        />
        <InputNumber 
          value={value}
          onChange={onChange}
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
          className="w-32"
          min={0}
          max={totalAmount}
        />
      </div>
    </Card>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="mb-6 shadow-sm">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-lg">Total Amount Due</h3>
          <InputNumber 
            value={totalAmount} 
            onChange={setTotalAmount} 
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            size="large"
            min={0}
            className="w-40"
          />
        </div>
      </Card>
      
      <PaymentMethodCard
        title="HSA/FSA"
        icon={<DollarOutlined />}
        color="bg-blue-500"
        value={paymentAllocation.hsa}
        onChange={(value) => handleSliderChange('hsa', value)}
      />
      
      <PaymentMethodCard
        title="Credit Card"
        icon={<CreditCardOutlined />}
        color="bg-purple-500"
        value={paymentAllocation.creditCard}
        onChange={(value) => handleSliderChange('creditCard', value)}
      />
      
      <PaymentMethodCard
        title="Payment Plan"
        icon={<ScheduleOutlined />}
        color="bg-green-500"
        value={paymentAllocation.paymentPlan}
        onChange={(value) => handleSliderChange('paymentPlan', value)}
      />
      
      <Divider />
      
      <div className="mb-6 p-4 rounded-lg bg-gray-50">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Remaining Balance:</span>
          <span className={`font-bold text-lg ${
            remaining > 0 ? 'text-red-600' : remaining < 0 ? 'text-green-600' : 'text-gray-800'
          }`}>
            ${Math.abs(remaining).toFixed(2)}
          </span>
        </div>
        
        {remaining > 0 && (
          <Alert 
            message="Amount not fully allocated" 
            type="warning" 
            showIcon 
            className="mb-2"
          />
        )}
        {remaining < 0 && (
          <Alert 
            message="Overpayment detected" 
            type="info" 
            showIcon 
            className="mb-2"
          />
        )}
        {remaining === 0 && (
          <Alert 
            message="Payment fully allocated" 
            type="success" 
            showIcon 
            className="mb-2"
          />
        )}
      </div>
      
      <Button 
        type="primary" 
        size="large" 
        block
        onClick={processPayment}
        loading={processing}
        disabled={remaining !== 0}
        className="mt-4"
      >
        Process Payment
      </Button>
    </div>
  );
};

export default BillingTools;