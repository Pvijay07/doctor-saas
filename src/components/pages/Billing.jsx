import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";

const Billing = () => {
  return (
    <div className="p-4 lg:p-6">
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 lg:mb-6">
        Billing & Payments (Under Development)
      </h2>
      <p className="text-gray-600">
        This section will help you manage billing, invoices, and
        payment tracking.
      </p>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Future Enhancements</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>- Invoice generation</li>
            <li>- Payment tracking and status</li>
            <li>- Basic reporting on revenue</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;