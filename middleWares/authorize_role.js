export const authorize = (requiredRoles) => {
    return (req, res, next) => {
      console.log(requiredRoles);
      console.log(req.user.role, "jnj");
      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Access denied. No user information found." });
      }
  
      if (!requiredRoles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: "Access denied. Insufficient permissions." });
      }
  
      next();
    };
  };