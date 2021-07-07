import * as React from 'react';
import { IMacwebpartaddaProps } from './IMacwebpartaddaProps';

import "@pnp/polyfill-ie11";
import 'babel-polyfill';
import { escape } from '@microsoft/sp-lodash-subset';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import styles from './Macwebpartadda.module.scss';
import { Nav, INavLink, INavStyles, INavLinkGroup } from 'office-ui-fabric-react/lib/Nav';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';
import { default as pnp, ItemAddResult, Web, ConsoleListener } from "sp-pnp-js";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { DefaultButton, IContextualMenuProps, Stack, IStackTokens } from 'office-ui-fabric-react';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

import { _Item, _Items } from '@pnp/sp/items/types';

export default class Macwebpartadda extends React.Component<IMacwebpartaddaProps, {}> {
  public state: IMacwebpartaddaProps;
  constructor(props, context) {
    super(props);

    this.setState({
      description: "",
      IsArabic: false,
      MenuItem: [],
      disabled: false,
      languagelabel: "EN",
      culture: this.props.culture,
      menucss: "mydivcommandbar",
      mychecked: true,
      showcompoennt: "no",
      cssmyitemsmenu:"myitemsmenu",


    });


  }
  public componentWillMount(){
  }

  public componentDidMount() {

    var Pageurl = window.location.href;
    var tmpLang = "en";
    var Tempcss="myitemsmenuar";
    var temp = true;
    var csstmp = "mydivcommandbar";
    if (Pageurl.indexOf("/ar/") > -1) {
      tmpLang = "arabic";
      csstmp = "mydivcommandbarAR";
      temp = false;
      Tempcss="myitemsmenuar";
    }



    this.setState({
      languagelabel: tmpLang,
      menucss: csstmp,
      IsArabic: temp,
      mychecked: temp,
      checked: temp,
      cssmyitemsmenu:Tempcss,
    });

    this.getlistdatea();
  }

  public getobjectchild(item, filter) {

    //var filteredarray = item.filter(menu => menu["parent"] == item[i]["Title"]);
    //console.log("This is fildtered Array : "+filteredarray);
    var xitem = [];
    for (var i = 0; i < item.length; i++) {
      if (item[i].parent != undefined) {
        if (item[i].parent.Title == filter) {
          var NewData = {
            text: this.state.languagelabel != "arabic" ? item[i].Title : item[i].Titlear,
            key: item[i].Titlear,
            href: this.state.languagelabel != "arabic" ? item[i].enurl : item[i].Url, //allItems[i].enurl,

            //parentId: allItems[i].parentId,
            className:this.state.cssmyitemsmenu
          };
          xitem.push(NewData);//= NewData;

        }
      }
    }


    var xd = "";
    var ar = [];
    var objx = {
      key: 'Corporate Affairs',
      text: 'Corporate Affairs',
      iconProps: {
        iconName: 'Mail'
      },

    };

    ar.push(objx);


    return xitem;
    //return ar;
  }

  public getobject(item, filter) {

    var xitem = [];
    for (var i = 0; i < item.length; i++) {
      if (item[i].parent != undefined) {
        if (item[i].parent.Title == filter) {

          var filteredarray = item.filter(menu => menu["parent"] != null && menu["parent"].Title == item[i]["Title"]);
          console.log(filteredarray);

          if (filteredarray.length > 0) {
            var NewDatax = {
              text: this.state.languagelabel != "arabic" ? item[i].Title : item[i].Titlear,
              key: item[i].Titlear,
              href: this.state.languagelabel != "arabic" ? item[i].enurl : item[i].Url, //allItems[i].enurl,
             // className: 'myitemsmenu',
             className:this.state.cssmyitemsmenu,
              subMenuProps:
              {
                items: this.getobjectchild(item, item[i].Title)// this.state.languagelabel !=  "arabic" ? item[i].Title :item[i].Titlear)
              },
            };
            xitem.push(NewDatax);//= NewData;
          } else {
            var NewData = {
              text: item[i].Title,
              key: item[i].Titlear,
              href: item[i].enurl,
              //parentId: allItems[i].parentId,
              //className: 'myitemsmenu',
              className:this.state.cssmyitemsmenu,

            };
            xitem.push(NewData);//= NewData;
          }



        }
      }
    }


    var xd = "";
    var ar = [];
    var objx = {
      key: 'Corporate Affairs',
      text: 'Corporate Affairs',
      iconProps: {
        iconName: 'Mail'
      },

    };

    ar.push(objx);


    return xitem;
    //return ar;
  }

  public async getlistdatea() {

    var TempComplteDropDown = [];
    var NewISiteUrl = this.props.siteurl;
    var NewSiteUrl = NewISiteUrl.replace("/SitePages", "");
    let webx = new Web(NewSiteUrl);

    var _tems = [];
    webx.lists.getByTitle("Navigation").items.select("Title", "parent/Title", "parent/ID", "Titlear", "enurl","Url").expand("parent").get().then((allItems: any[]) => {
      var sec = 0;
      for (var i = 0; i < allItems.length; i++) {
        if (allItems[i].parent == undefined) {

          if (allItems[i].Title != 'Sectors') {
            var NewData = {
              text: this.state.languagelabel != "arabic" ? allItems[i].Title : allItems[i].Titlear,
              key: allItems[i].Titlear,
              href: this.state.languagelabel != "arabic" ? allItems[i].enurl : allItems[i].Url, //allItems[i].enurl,
              //parentId: allItems[i].parentId,
              //className: 'myitemsmenu',
               className:this.state.cssmyitemsmenu,

              //subMenuProps:this.getobject(allItems,'Sectors'),
            };
            _tems.push(NewData);//= NewData;
          }

        }
        else {
          if (allItems[i].parent.Title == 'Sectors' && sec == 0) {
            sec = 1;

            var NewDatak = {
              text: this.state.languagelabel != "arabic" ? "Sectors" : "القطاعات",
              key: "القطاعات", //allItems[i].Titlear,
              href: "",
              //className: 'myitemsmenu',
              className:this.state.cssmyitemsmenu,
              subMenuProps:
              {
                items: this.getobject(allItems, "Sectors") //this.state.languagelabel !=  "arabic" ? "Sectors" :"القطاعات")
              },
            };
            _tems.push(NewDatak);//= NewData;
          }
          break;

        }
      }
      console.log(_tems);
      this.setState({
        MenuItem: _tems
      });
    });


  }

  public _onLinkClick(ev?: React.MouseEvent<HTMLElement>, item?: INavLink) {
    if (item && item.name === 'News') {
      // alert('News link clicked');
    }
  }

  public _alertClicked() {
    var language = this.state.IsArabic;
    if (this.state.IsArabic == false) {
      language = true;
    } else {
      language = false;
    }
    this.setState({
      IsArabic: language
    });
  }

  public _onChange(ev: React.MouseEvent<HTMLElement>, checked: boolean) {
    //console.log('toggle is ' + (checked ? 'checked' : 'not checked'));

    var temp = "";

    if (this != null) {
      temp = checked ? 'true' : 'false';
      this.setState({
        IsArabic: temp,
        checked: temp,
      });
    }


  }

  public render(): React.ReactElement<IMacwebpartaddaProps> {

    const overflowProps: IButtonProps = { ariaLabel: 'More commands' };
    const _items: ICommandBarItemProps[] = [

      {
        key: 'Home',
        text: 'Home',
        href: 'https://xxxx.sharepoint.com/',
        className: 'myitemsmenu',
      },
      {
        key: 'Teams',
        text: 'Teams',
        href: 'https://teams.microsoft.com/l/chat/0/0?users=username%40.com',
        className: 'myitemsmenu',
      },

      {
        key: 'Share Folder',
        text: 'Share Folder',
        href: 'https://xxxx-my.sharepoint.com/',
        className: 'myitemsmenu',
      },
      {
        key: 'Sectors',
        text: 'Sectors',
        cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
        className: 'myitemsmenu',
        subMenuProps: {
          items: [
            {
              key: 'Corporate Affairs',
              text: 'Corporate Affairs',
              iconProps: {
                iconName: 'Mail'
              },

            },

          ],
        },
      },


    ];

    const menuProps: IContextualMenuProps = {
      items: [
        {
          key: 'Arabic',
          text: 'Arabic',
          iconProps: { iconName: 'Mail' },
        },
        {
          key: 'English',
          text: 'English',
          iconProps: { iconName: 'Calendar' },
        },
      ],
    };
    const stackTokens: IStackTokens = { childrenGap: 40 };


    return (
      <div className={styles.macwebpartadda}>
        <Container fluid>
          <Row noGutters={true} >
            <div className="languagediv">

              {
              this.state!=null &&
             <div>
             {

                this.state.showcompoennt == "yes" &&
                <Stack horizontal wrap tokens={stackTokens}>
                  <Toggle label="" defaultValue="false" className="mylabeltxt" defaultChecked onText="En"
                    offText="عربي" onChange={this._onChange} />
                </Stack>

              }
              </div>

              }

            </div>

            <Col md={12} className="zeropadding" >
              <div>
                <Carousel>

                  <Carousel.Item>
                    <img
                      className="d-block w-100 myimgg"
                      src="https://xxxx.sharepoint.com/Site%20Assets/4.jpg"
                      alt="First slide"

                    />
                    <Carousel.Caption>
                      <h3>.</h3>
                      <p>Leading the digital future of Abu Dhabi</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100 myimgg"
                      src="https://xxxx.sharepoint.com/Site%20Assets/img1.jpg"
                      alt="Second slide"
                    />

                    <Carousel.Caption>
                      <h3></h3>
                      <p>We enable, support and deliver a digital government that is proactive, personalized, collaborative and secure.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100 myimgg"
                      src="https://xxxx.sharepoint.com/Site%20Assets/img2.jpg"
                      alt="Third slide"
                    />

                    <Carousel.Caption>
                      <h3></h3>
                      <p>نقود المستقبل الرقمي لحكومة أبوظبي</p>

                    </Carousel.Caption>

                  </Carousel.Item>

                </Carousel>
              </div>
            </Col>

          </Row>

          {


            this.state != null &&

            <Row noGutters={true} className="macwebpartadda">
              <Col className={this.state.menucss}>
                <CommandBar
                  items={this.state.MenuItem}
                  overflowButtonProps={overflowProps}
                  ariaLabel="Use left and right arrow keys to navigate between commands"
                  className={this.state.menucss}
                />

              </Col>
            </Row>
          }





        </Container>



      </div>
    );
  }
}



