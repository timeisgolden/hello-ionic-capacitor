export interface HealthCheck {
  maintenance: string;
  latest: Latest;
}
export interface Latest {
  android: AndroidOrIos;
  ios: AndroidOrIos;
}
export interface AndroidOrIos {
  number: string;
  code: string;
  uri: string;
  required: string;
}
