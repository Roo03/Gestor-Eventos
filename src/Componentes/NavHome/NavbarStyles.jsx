export const navbarStyles = {
  background: "linear-gradient(to left, #00ccff, #00ff91)",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
};

export const toolbarStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 16px"
};

export const buttonStyles = {
  margin: "0 8px",
  color: "black",
  backgroundColor: "transparent",
  border: "2px solid black",
  '&:hover': {
    backgroundColor: "rgba(255, 255, 255, 0.2)"
  }
};

export const titleStyles = {
  fontFamily: "Arial, sans-serif",
  fontSize: "1.5rem",
  color: "black",
  flexGrow: 1
};

export const drawerStyles = {
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: 250,
  },
};

export const drawerPaperStyles = {
  backgroundColor: "linear-gradient(to left, #00ccff, #00ff91)",
  color: "black",
};
