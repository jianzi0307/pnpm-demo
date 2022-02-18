import http from "@/utils/http";

export function login(params) {
  return http.post("/login", params);
}

/**
 * 加载用户信息
 */
export function userinfo() {
  return http.get("/userinfo");
}
