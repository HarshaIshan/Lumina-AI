
const fetch = window.fetch.bind(window);
const Request = window.Request;
const Response = window.Response;
const Headers = window.Headers;
const FormData = window.FormData;

// For node-fetch, default export is fetch
// For formdata-polyfill, we might need to be careful
export default fetch;
export { fetch, Request, Response, Headers, FormData };
