import * as React from 'react';
import * as ReactDom from 'react-dom';



import "@pnp/polyfill-ie11";
import 'babel-polyfill';

import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'MacwebpartaddaWebPartStrings';


import Macwebpartadda from './components/Macwebpartadda';
import { IMacwebpartaddaProps } from './components/IMacwebpartaddaProps';

export interface IMacwebpartaddaWebPartProps {
  description: string;
  siteurl:string;
  culture:string;
}

export default class MacwebpartaddaWebPart extends BaseClientSideWebPart <IMacwebpartaddaWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IMacwebpartaddaProps> = React.createElement(
      Macwebpartadda,
      {
        description: this.properties.description,
        siteurl:this.context.pageContext.web.absoluteUrl,
        culture:this.context.pageContext.cultureInfo.currentCultureName,

      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
