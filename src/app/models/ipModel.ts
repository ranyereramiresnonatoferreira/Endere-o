export interface ipModel{
    ip:string;
}

export interface adressModel{
  ip: string;
  hostname: string;
  city: string;
  region: string;
  country: string;
  loc: string; // Pode ser um objeto com latitude e longitude se preferir
  org: string;
  postal: string;
  timezone: string;
  readme: string;
}