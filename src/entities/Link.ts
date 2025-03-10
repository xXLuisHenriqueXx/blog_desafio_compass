export interface ILink {
  id: number;
  title: string;
  links: {
    [key: string]: string;
  }[];
}
