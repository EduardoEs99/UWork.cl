const baseUrl = import.meta.env.BASE_URL.replace(/\/?$/, "/");

export const routes = {
  home: baseUrl,
  students: `${baseUrl}students/`,
  login: `${baseUrl}login/`,
  register: `${baseUrl}register/`,
};
