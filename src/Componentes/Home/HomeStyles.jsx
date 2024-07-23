export const toolbarStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 16px"
};

export const buttonStyles = {
  margin: "0 8px",
  color: "white",
  backgroundColor: "transparent",
  border: "1px solid white",
  '&:hover': {
    backgroundColor: "rgba(255, 255, 255, 0.2)"
  }
};

export const titleStyles = {
  fontFamily: "Arial, sans-serif",
  fontSize: "1.5rem",
  color: "white",
  flexGrow: 1
};

export const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "25px",
  padding: "5px",
  margin: "0 auto",
  maxWidth: "1200px"
};

export const paginationContainer = {
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  bottom: 0,
  width: '100%',
  marginTop: '2px',
  paddingBottom: '2px',
};

export const cardStyles = {
  width: "100%",
  margin: "16px",
  backgroundColor: "#f5f5f5",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  overflow: "hidden",
  transition: "transform 0.2s, box-shadow 0.2s",
  '&:hover': {
    transform: "scale(1.05)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)"
  }
};

export const mediaStyles = {
  height: 140,
  filter: "brightness(90%)"
};

export const cardContentStyles = {
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start"
};

export const cardActionsStyles = {
  padding: "16px",
  display: "flex",
  width: "100%"
};
