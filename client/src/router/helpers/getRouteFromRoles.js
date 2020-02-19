// get redirect value from $user roles
export const getRouteFromRoles = (roles = [], roleRedirector = {}) => {
  if (!(Array.isArray(roles) && roles.length)) {
    return undefined;
  }

  let roleRoute;
  Object.keys(roleRedirector).some(role => {
    // role should be a number
    const roleInRoles = roles.includes(+role);
    if (roleInRoles) {
      roleRoute = roleRedirector[role];
    }
    return roleInRoles;
  });

  return roleRoute;
};

export default getRouteFromRoles;
