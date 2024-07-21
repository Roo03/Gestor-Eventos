export const mainContainer = {
  display: "flex", 
  justifyContent: "center", 
  alignItems: "center", 
  background: "linear-gradient(to right, purple, blue)", 
  padding: "0", 
  width: "100vw", 
  height: "100vh",
  boxSizing: "border-box", 
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" 
};

export const loginContainer = {
  display: "flex", 
  justifyContent: "center", 
  alignItems: "center", 
  border: "2px solid #000",
  height: "450px", 
  width: "400px",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.2)"
};

export const boxLogin = {
  backgroundColor: "#f9f9f9",
  padding: "40px",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
};

export const titleStyle = {
  color: "#333",
  fontWeight: "bold",
  marginBottom: "10px"
};

export const subtitleStyle = {
  color: "#555",
  marginBottom: "20px"
};

export const loginButton = {
  backgroundColor: "#6a11cb",
  color: "#fff",
  '&:hover': {
    backgroundColor: "#2575fc"
  },
  mt: 3,
  mb: 2
};

export const errorMessage = {
  mt: 1,
  color: "red"
};
