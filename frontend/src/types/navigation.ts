export interface NavigationSubItem {
  id: number;
  name: string;
  link: string;
}

export interface NavigationItem {
  id: number;
  name: string;
  link: string;
  subItems?: NavigationSubItem[];
}

export interface NavigationData {
  id: number | null;
  items: NavigationItem[];
  locale?: string;
}

export interface NavigationResponse {
  data: NavigationData;
  meta?: object;
} 