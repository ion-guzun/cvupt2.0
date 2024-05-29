// types.ts
export interface Content {
    title: string;
    body: string;
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
  