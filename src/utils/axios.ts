import axios, { ResponseType } from "axios";

// Axios 인스턴스 생성
const service = axios.create({
  baseURL: import.meta.env.VITE_SOME_KEY, // 환경변수 사용
  timeout: 10000, // 요청 타임아웃
  withCredentials: false, // 쿠키 전송 설정
});

// 요청 인터셉터
service.interceptors.request.use(
  (config) => {
    // 요청 전에 헤더 설정 등을 할 수 있음
    return config;
  },
  (error) => {
    console.error("request error:", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
service.interceptors.response.use(
  (response) => {
    // 응답 데이터 반환
    return response.data;
  },
  (error) => {
    console.error("response error:", error);
    return Promise.reject(error);
  }
);

// RequestType 인터페이스 정의
interface RequestType {
  url: string;
  method: "get" | "post" | "put" | "delete"; // 메서드 타입을 제한
  data?: any;
  params?: any;
  responseType?: ResponseType;
}

/**
 * 일반적인 요청을 처리하는 함수
 * @param url 요청 URL
 * @param method HTTP 메서드 (get, post, etc.)
 * @param data 요청 본문 데이터
 * @param responseType 응답 타입 (선택 사항)
 */
const request = (
  url: string,
  method: "get" | "post" | "put" | "delete", // 메서드에 대해 타입 지정
  data: object = {},
  responseType?: ResponseType
) => {
  const config: RequestType = {
    url,
    method,
    responseType, // 응답 타입 옵션
  };

  if (method === "get") {
    config.params = data; // GET 요청의 경우 params에 데이터 추가
  } else {
    config.data = data; // POST, PUT, DELETE는 data에 요청 본문 추가
  }

  return service(config); // axios 호출
};

// `get` 메서드 추가
const get = (url: string, params: object = {}, responseType?: ResponseType) => {
  return request(url, "get", params, responseType);
};

// `post` 메서드 추가
const post = (url: string, data: object, responseType?: ResponseType) => {
  return request(url, "post", data, responseType);
};

// 필요한 메서드들을 export
export default {
  request,
  get,
  post,
};
