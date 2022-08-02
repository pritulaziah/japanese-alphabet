export type Schemes = "light" | "dark";

export interface Theme {
  scheme: Schemes;
  onChangeScheme: (scheme: Schemes) => void;
}
