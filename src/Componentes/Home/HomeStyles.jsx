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
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "16px",
  padding: "16px"
};

export const cardStyles = {
  height: "315px",
  Width: "300px",
  margin: "5px",
  backgroundColor: "white",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
  alignItems: "center",
  marginTop: "-15px"
};

export const mediaStyles = {
  height: 140
};

export const cardContentStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start"
};

export const cardActionsStyles = {
  display: "flex",
  marginLeft: "120px",
  width: "100%",
  marginTop: "-20px"
};
