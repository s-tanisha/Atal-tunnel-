export const api = {
  login: () => `${API_HOST}/user/signup`,
  signup: () => `${API_HOST}/user/signup`,
  logout: () => `${API_HOST}/user/logout`,
  userDetails: () => `${API_HOST}/user/details`,
  setBookingDetails: () => `${API_HOST}/bookings/bookPlace`,
  getBookingDetails: () => `${API_HOST}/bookings/details`,
};
