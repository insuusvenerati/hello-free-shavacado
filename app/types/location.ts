export interface Location {
  documentation: string;
  licenses: License[];
  rate: Rate;
  results: Result[];
  status: Status;
  stay_informed: StayInformed;
  thanks: string;
  timestamp: Timestamp;
  total_results: number;
}

export interface License {
  name: string;
  url: string;
}

export interface Rate {
  limit: number;
  remaining: number;
  reset: number;
}

export interface Result {
  annotations: Annotations;
  bounds: Bounds;
  components: Components;
  confidence: number;
  formatted: string;
  geometry: Geometry;
}

export interface Annotations {
  DMS: Dms;
  MGRS: string;
  Maidenhead: string;
  Mercator: Mercator;
  NUTS: Nuts;
  OSM: Osm;
  UN_M49: UnM49;
  callingcode: number;
  currency: Currency;
  flag: string;
  geohash: string;
  qibla: number;
  roadinfo: Roadinfo;
  sun: Sun;
  timezone: Timezone;
  what3words: What3words;
}

export interface Dms {
  lat: string;
  lng: string;
}

export interface Mercator {
  x: number;
  y: number;
}

export interface Nuts {
  NUTS0: Nuts0;
  NUTS1: Nuts1;
  NUTS2: Nuts2;
  NUTS3: Nuts3;
}

export interface Nuts0 {
  code: string;
}

export interface Nuts1 {
  code: string;
}

export interface Nuts2 {
  code: string;
}

export interface Nuts3 {
  code: string;
}

export interface Osm {
  edit_url: string;
  note_url: string;
  url: string;
}

export interface UnM49 {
  regions: Regions;
  statistical_groupings: string[];
}

export interface Regions {
  DE: string;
  EUROPE: string;
  WESTERN_EUROPE: string;
  WORLD: string;
}

export interface Currency {
  alternate_symbols: any[];
  decimal_mark: string;
  html_entity: string;
  iso_code: string;
  iso_numeric: string;
  name: string;
  smallest_denomination: number;
  subunit: string;
  subunit_to_unit: number;
  symbol: string;
  symbol_first: number;
  thousands_separator: string;
}

export interface Roadinfo {
  drive_on: string;
  road: string;
  speed_in: string;
}

export interface Sun {
  rise: Rise;
  set: Set;
}

export interface Rise {
  apparent: number;
  astronomical: number;
  civil: number;
  nautical: number;
}

export interface Set {
  apparent: number;
  astronomical: number;
  civil: number;
  nautical: number;
}

export interface Timezone {
  name: string;
  now_in_dst: number;
  offset_sec: number;
  offset_string: string;
  short_name: string;
}

export interface What3words {
  words: string;
}

export interface Bounds {
  northeast: Northeast;
  southwest: Southwest;
}

export interface Northeast {
  lat: number;
  lng: number;
}

export interface Southwest {
  lat: number;
  lng: number;
}

export interface Components {
  "ISO_3166-1_alpha-2": string;
  "ISO_3166-1_alpha-3": string;
  "ISO_3166-2": string[];
  _category: string;
  _type: string;
  city: string;
  city_district: string;
  continent: string;
  country: string;
  country_code: string;
  county: string;
  house_number: string;
  office: string;
  political_union: string;
  postcode: string;
  road: string;
  state: string;
  state_code: string;
  suburb: string;
}

export interface Geometry {
  lat: number;
  lng: number;
}

export interface Status {
  code: number;
  message: string;
}

export interface StayInformed {
  blog: string;
  mastodon: string;
  twitter: string;
}

export interface Timestamp {
  created_http: string;
  created_unix: number;
}
