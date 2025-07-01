import { useState } from "react";

const ClinicalTools = () => {
  const [activeTab, setActiveTab] = useState("charting");
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [probingValues, setProbingValues] = useState({});
  const [prescription, setPrescription] = useState({
    patient: "",
    medication: "",
    dosage: "",
    instructions: "",
    pharmacy: ""
  });

  // Tooth chart data (FDI notation)
  const teeth = [
    { number: 18, name: "Wisdom Tooth (Upper Right)" },
    { number: 17, name: "Molar" },
    { number: 16, name: "Molar" },
    { number: 15, name: "Premolar" },
    { number: 14, name: "Premolar" },
    { number: 13, name: "Canine" },
    { number: 12, name: "Incisor" },
    { number: 11, name: "Incisor" },
    { number: 21, name: "Incisor" },
    { number: 22, name: "Incisor" },
    { number: 23, name: "Canine" },
    { number: 24, name: "Premolar" },
    { number: 25, name: "Premolar" },
    { number: 26, name: "Molar" },
    { number: 27, name: "Molar" },
    { number: 28, name: "Wisdom Tooth (Upper Left)" },
    { number: 38, name: "Wisdom Tooth (Lower Left)" },
    { number: 37, name: "Molar" },
    { number: 36, name: "Molar" },
    { number: 35, name: "Premolar" },
    { number: 34, name: "Premolar" },
    { number: 33, name: "Canine" },
    { number: 32, name: "Incisor" },
    { number: 31, name: "Incisor" },
    { number: 41, name: "Incisor" },
    { number: 42, name: "Incisor" },
    { number: 43, name: "Canine" },
    { number: 44, name: "Premolar" },
    { number: 45, name: "Premolar" },
    { number: 46, name: "Molar" },
    { number: 47, name: "Molar" },
    { number: 48, name: "Wisdom Tooth (Lower Right)" }
  ];

  // Sample images
  const patientImages = [
    { id: 1, type: "Bitewing", date: "2023-06-01", aiFindings: "Possible caries on #30" },
    { id: 2, type: "Panoramic", date: "2023-05-15", aiFindings: "No abnormalities detected" },
    { id: 3, type: "Periapical", date: "2023-04-10", aiFindings: "Periapical radiolucency #9" }
  ];

  // Render tooth chart
  const renderToothChart = () => {
    return (
      <div className="grid grid-cols-8 gap-2">
        {teeth.map(tooth => (
          <div 
            key={tooth.number}
            onClick={() => setSelectedTooth(tooth.number)}
            className={`flex flex-col items-center justify-center p-2 border rounded-lg cursor-pointer transition-all
              ${selectedTooth === tooth.number ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300">
              {tooth.number}
            </div>
            <span className="text-xs mt-1 text-center">{tooth.name.split(' ')[0]}</span>
          </div>
        ))}
      </div>
    );
  };

  // Handle probing value changes
  const handleProbingChange = (position, value) => {
    setProbingValues(prev => ({
      ...prev,
      [position]: value
    }));
  };

  // Handle prescription changes
  const handlePrescriptionChange = (e) => {
    const { name, value } = e.target;
    setPrescription(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Clinical Tools
        </h2>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("charting")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "charting"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Dental Charting
            </button>
            <button
              onClick={() => setActiveTab("imaging")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "imaging"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Imaging
            </button>
            <button
              onClick={() => setActiveTab("prescriptions")}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "prescriptions"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              e-Prescribing
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === "charting" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Tooth Chart (FDI Notation)</h3>
              {renderToothChart()}
              
              {selectedTooth && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Charting for Tooth #{selectedTooth} - {teeth.find(t => t.number === selectedTooth)?.name}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Caries Tracking */}
                    <div className="border rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-2">Caries Tracking</h5>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span>D</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span>M</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span>F</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span>L</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span>O</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span>I</span>
                        </label>
                      </div>
                    </div>
                    
                    {/* Periodontal Probing */}
                    <div className="border rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-2">Periodontal Probing (mm)</h5>
                      <div className="grid grid-cols-4 gap-2">
                        {['MB', 'B', 'DB', 'L'].map(pos => (
                          <div key={pos} className="flex flex-col items-center">
                            <label className="text-xs text-gray-600">{pos}</label>
                            <input
                              type="number"
                              min="0"
                              max="10"
                              step="0.5"
                              className="w-12 p-1 border rounded text-center"
                              value={probingValues[pos] || ""}
                              onChange={(e) => handleProbingChange(pos, e.target.value)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={3}
                      placeholder="Additional clinical notes..."
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "imaging" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Patient Imaging</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  + Upload New Image
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {patientImages.map(image => (
                  <div key={image.id} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-200 h-40 flex items-center justify-center">
                      <span className="text-gray-500">DICOM {image.type} Image</span>
                    </div>
                    <div className="p-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{image.type}</span>
                        <span className="text-gray-500">{image.date}</span>
                      </div>
                      <div className="text-sm bg-yellow-50 text-yellow-800 p-2 rounded">
                        <span className="font-medium">AI Findings:</span> {image.aiFindings}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-2">Image Analysis Tools</h4>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                    Caries Detection
                  </button>
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                    Bone Loss Analysis
                  </button>
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                    Root Canal Measurement
                  </button>
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                    Implant Planning
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "prescriptions" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">e-Prescribing</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
                  <input
                    type="text"
                    name="patient"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={prescription.patient}
                    onChange={handlePrescriptionChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Medication</label>
                  <select
                    name="medication"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={prescription.medication}
                    onChange={handlePrescriptionChange}
                  >
                    <option value="">Select medication</option>
                    <option value="Amoxicillin 500mg">Amoxicillin 500mg</option>
                    <option value="Ibuprofen 400mg">Ibuprofen 400mg</option>
                    <option value="Chlorhexidine 0.12%">Chlorhexidine 0.12%</option>
                    <option value="Fluoride Varnish">Fluoride Varnish</option>
                    <option value="Clindamycin 300mg">Clindamycin 300mg</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                  <input
                    type="text"
                    name="dosage"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={prescription.dosage}
                    onChange={handlePrescriptionChange}
                    placeholder="e.g., 1 tablet every 8 hours"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pharmacy</label>
                  <select
                    name="pharmacy"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={prescription.pharmacy}
                    onChange={handlePrescriptionChange}
                  >
                    <option value="">Select pharmacy</option>
                    <option value="CVS Pharmacy #1234">CVS Pharmacy #1234</option>
                    <option value="Walgreens #5678">Walgreens #5678</option>
                    <option value="Rite Aid #9012">Rite Aid #9012</option>
                    <option value="Local Compounding Pharmacy">Local Compounding Pharmacy</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
                  <textarea
                    name="instructions"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
                    value={prescription.instructions}
                    onChange={handlePrescriptionChange}
                    placeholder="Additional instructions for the patient"
                  />
                </div>
              </div>
              
              <div className="flex justify-between items-center border-t pt-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Drug Interaction Check:</span> No known interactions detected
                </div>
                <div className="space-x-3">
                  <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                    Save Draft
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Send to Pharmacy
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Prescriptions</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Patient</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Medication</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Pharmacy</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4">2023-06-10</td>
                      <td className="px-6 py-4">John Doe</td>
                      <td className="px-6 py-4">Amoxicillin 500mg</td>
                      <td className="px-6 py-4">CVS Pharmacy #1234</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Filled
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">2023-06-05</td>
                      <td className="px-6 py-4">Jane Smith</td>
                      <td className="px-6 py-4">Ibuprofen 400mg</td>
                      <td className="px-6 py-4">Walgreens #5678</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicalTools;