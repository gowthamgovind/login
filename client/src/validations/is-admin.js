
const isAdmin = obj => {
  if (obj.isAdmin === "yes") {
    return true;
  } else {
    return false;
  }
};
export default isAdmin;
