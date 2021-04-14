import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';

export interface IMacwebpartaddaProps {
  description: string;
  IsArabic: boolean;
  MenuItem:Array<ICommandBarItemProps>;
  siteurl: string;
  disabled?: boolean;
  languagelabel:string;
  culture:string;
  menucss:string;
  mychecked:boolean;
  showcompoennt:string;
  cssmyitemsmenu:string;
}
