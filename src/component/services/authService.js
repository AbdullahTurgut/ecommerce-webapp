export const logoutUser = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userRoles");
  localStorage.removeItem("userId");
  window.location.href = "/"; // Redirect to login page
};
