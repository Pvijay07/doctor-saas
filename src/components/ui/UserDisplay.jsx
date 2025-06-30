import React from "react";
import { useFirebase } from "../firebase/FirebaseProvider";

const UserDisplay = () => {
  const { userId } = useFirebase();
  return (
    <div className="text-sm font-medium break-all mb-4">
      {userId || "Loading..."}
    </div>
  );
};

export default UserDisplay;