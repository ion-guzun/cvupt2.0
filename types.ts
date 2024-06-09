// types.ts
export interface Content {
    title: string;
    body: string;
    courseObjectId?: string //just for maintaining the course _id
  }
  
  export interface SubItem {
    id: number;
    title: string;
    content: Content;
  }
  
  export interface Item {
    id: number;
    title: string;
    subItems: SubItem[];
  }
  
  export interface SidebarProps {
    items: Item[];
    onSelectItem: (subItem: SubItem) => void;
  }
  
  export interface MainContentProps {
    content: Content;
  }

  export interface ICompleteStudentProfile {
    faculty: string;
    major: string
    year: number | null
  }

  export type SearchParamProps = {
    params: { _id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }

export type CourseRef = string;


  