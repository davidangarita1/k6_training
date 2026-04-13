import http from 'k6/http';

export default function () {
    const url = "https://httpbin.test.k6.io/post";
    const response = http.post(url, "Hello, World!");
    console.log(`Response status: ${response.status}`);
}