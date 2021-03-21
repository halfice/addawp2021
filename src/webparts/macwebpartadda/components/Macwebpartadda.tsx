import * as React from 'react';
import { IMacwebpartaddaProps } from './IMacwebpartaddaProps';
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
var Symbol = require('es6-symbol/polyfill');
import "@babel/polyfill";




export default class Macwebpartadda extends React.Component<IMacwebpartaddaProps, {}> {
  public state: IMacwebpartaddaProps;
  constructor(props, context) {
    super(props);

    this.setState({
      description: "",
      IsArabic: false,


    });



  }


  public componentDidMount() {
    var queryParms = new UrlQueryParameterCollection(window.location.href);
    //alert(queryParms);
  }

  public _onLinkClick(ev?: React.MouseEvent<HTMLElement>, item?: INavLink) {
    if (item && item.name === 'News') {
      alert('News link clicked');
    }
  }

  public render(): React.ReactElement<IMacwebpartaddaProps> {

    const overflowProps: IButtonProps = { ariaLabel: 'More commands' };
    const _items: ICommandBarItemProps[] = [

      {
        key: 'Home',
        text: 'Home',
        href: 'https://abudhabidigital.sharepoint.com/',
        className:'myitemsmenu',
      },
      {
        key: 'Teams',
        text: 'Teams',
        href: 'https://teams.microsoft.com/l/chat/0/0?users=username%40.com',
        className:'myitemsmenu',
      },

      {
        key: 'Share Folder',
        text: 'Share Folder',
        href: 'https://abudhabidigital-my.sharepoint.com/',
        className:'myitemsmenu',
      },
      {
        key: 'Sectors',
        text: 'Sectors',
        cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
        className:'myitemsmenu',
        subMenuProps: {
          items: [
            {
              key: 'Corporate Affairs',
              text: 'Corporate Affairs',
              iconProps: { iconName: 'Mail'},


              className:'myitemsmenu',
              subMenuProps: {
                items: [
                  {
                    key: 'Stratetegic',
                    text: 'Stratetegic',
                    className:'myitemsmenu',
                  }
                ]
              },


            },
            {
              key: 'Support Services',
              text: 'Support Services',
              className:'myitemsmenu',
              subMenuProps: {
                items: [
                  {
                    key: 'IT',
                    text: 'IT',
                    className:'myitemsmenu',
                  },
                  {
                    key: 'HR',
                    text: 'HR',
                    className:'myitemsmenu',
                  },
                  {
                    key: 'Procurement',
                    text: 'Procurement',
                    className:'myitemsmenu',
                  },
                  {
                    key: 'Finance',
                    text: 'Finance',
                    className:'myitemsmenu',
                  },

                ]
              },

            },
          ],
        },
      },


    ];

    return (
      <div className={styles.macwebpartadda}>
        <Container fluid>
          <Row noGutters={true} >

            <Col md={12} className="zeropadding" >
              <div>
                <Carousel>

                  <Carousel.Item>
                    <img
                      className="d-block w-100 myimgg"
                      src="https://abudhabidigital.sharepoint.com/Site%20Assets/4.jpg"
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
                      src="https://abudhabidigital.sharepoint.com/Site%20Assets/img1.jpg"
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
                      src="https://abudhabidigital.sharepoint.com/Site%20Assets/img2.jpg"
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

          <Row noGutters={true} className="zeropadding">
            <Col className="mydivcommandbar">
              <CommandBar
                items={_items}
                overflowButtonProps={overflowProps}
                ariaLabel="Use left and right arrow keys to navigate between commands"
                className="mycommandbar"
              />

            </Col>
          </Row>




        </Container>



      </div>
    );
  }
}



