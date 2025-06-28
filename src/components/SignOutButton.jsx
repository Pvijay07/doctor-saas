import FirebaseProvider from "./firebase/FirebaseProvider";

const SignOutButton = () => {
  const { auth } = useFirebase();

  const handleSignOut = async () => {
    if (auth) {
      try {
        await signOut(auth);
        console.log("User signed out.");
      } catch (error) {
        console.error("Error signing out:", error);
      }
    }
  };

  return (
    <Button
      onClick={handleSignOut}
      className="w-full bg-blue-700 hover:bg-blue-600 text-white"
    >
      <LogOut className="mr-2 h-4 w-4" /> Sign Out
    </Button>
  );
};

export default SignOutButton;