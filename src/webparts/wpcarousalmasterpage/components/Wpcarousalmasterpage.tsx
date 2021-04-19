import * as React from 'react';
import styles from './Wpcarousalmasterpage.module.scss';
import { IWpcarousalmasterpageProps } from './IWpcarousalmasterpageProps';
import { escape } from '@microsoft/sp-lodash-subset';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import { Nav, INavLink, INavStyles, INavLinkGroup } from 'office-ui-fabric-react/lib/Nav';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import {
  DocumentCard, DocumentCardActivity, DocumentCardPreview, DocumentCardTitle, IDocumentCardPreviewProps,
} from 'office-ui-fabric-react/lib/DocumentCard';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { hiddenContentStyle, ThemeSettingName } from 'office-ui-fabric-react/lib/Styling';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import * as moment from 'moment';

import { default as pnp, ItemAddResult, Web, ConsoleListener } from "sp-pnp-js";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { _Item, _Items } from '@pnp/sp/items/types';


export default class Wpcarousalmasterpage extends React.Component<IWpcarousalmasterpageProps, {}> {
  public state: IWpcarousalmasterpageProps;
  constructor(props, context) {
    super(props);

    this.setState({
      description: "",
      auhtweets: [],
      tamtweets: [],
      isloaded: 0,
      isloadedTm: 0,
      IsArabic: false,
      languagelabel: "EN",
      culture: this.props.culture,
      AnnouncementsHeading: "Announcements",
      QuicklinkHeading: "QuickLinks",
      pagelcass: "pageclassen",
      QuickLinksItems: [],

    });

    this.getauhtweets = this.getauhtweets.bind(this);
    this.tmtweets = this.tmtweets.bind(this);


  }

  public tmtweets() {

    var xhttp = new XMLHttpRequest();
    var self = this;

    xhttp.onreadystatechange = (e) => {
      //console.log(this);
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        // console.log("ok, response :", xhttp.response);
        //console.log(JSON.parse(xhttp.response));
        var TwAuh = JSON.parse(xhttp.response);

        //console.log(TwAuh);
        console.log("Time" + TwAuh.length);
        this.setState({
          // posts: JSON.parse(this.response)
          isloadedTm: 1,
          tamtweets: TwAuh,
        });
      }
    };
    var request = {
      Action: "ListTweetsOnUserTimeline",
      ScreenName: "AbuDhabi_TAMM"
    };
    xhttp.open("POST", "https://www.tweetjs.com/API.aspx", true);
    xhttp.send(JSON.stringify(request));


  }
  public getauhtweets() {

    var xhttp = new XMLHttpRequest();
    var self = this;

    xhttp.onreadystatechange = (e) => {
      console.log(this);
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        // console.log("ok, response :", xhttp.response);
        //console.log(JSON.parse(xhttp.response));
        var TwAuh = JSON.parse(xhttp.response);
        //var tmpar=[];


        // for(var x=0;x<5;x++)
        // {
        // var txt=TwAuh[x]["text"];
        //var created_at=TwAuh[x]["created_at"];
        //var obj={
        // text:txt,
        // created_at:created_at,

        // };

        // tmpar.push(obj);

        //}

        //console.log(TwAuh);
        //console.log("Time" + TwAuh.length);
        this.setState({
          auhtweets: TwAuh,
          isloaded: 1,
        });
      }
    };
    var request = {
      Action: "ListTweetsOnUserTimeline",
      ScreenName: "abudhabidigital"
    };
    xhttp.open("POST", "https://www.tweetjs.com/API.aspx", true);
    xhttp.send(JSON.stringify(request));


  }

  public componentDidMount() {


    var Pageurl = window.location.href;
    var tmpLang = "en";
    var Tempcss = "pageclassen";
    var temp = false;
    var csstmp = "mydivcommandbar";
    if (Pageurl.indexOf("/ar/") > -1) {
      tmpLang = "arabic";

      csstmp = "mydivcommandbarAR";
      temp = true;
      Tempcss = "pageclassar";
    }

    this.setState({
      languagelabel: tmpLang,
      menucss: csstmp,
      IsArabic: temp,
      pagelcass: Tempcss


    });
    this.tmtweets();
    this.getauhtweets();
    this.GetQuicklinks();
  }

  public async GetQuicklinks() {
    var TempComplteDropDown = [];
    var NewISiteUrl = this.props.siteurl;
    var NewSiteUrl = NewISiteUrl.replace("/SitePages", "");
    let webx = new Web(NewSiteUrl);
    var _tems = [];
    webx.lists.getByTitle("QuickLinks").items.select("Title", "TitleAr", "Link").get().then((allItems: any[]) => {
      var sec = 0;
      for (var i = 0; i < allItems.length; i++) {
        var NewData = {
          name: allItems[i].Title,
          namear: allItems[i].TitleAr,
          url: allItems[i].Link,
        };
        _tems.push(NewData);//= NewData;
      }
      this.setState({
        QuickLinksItems: _tems
      });
    });

  }


  public render(): React.ReactElement<IWpcarousalmasterpageProps> {


    var count = 0;
    if (this.state != null) {
      if (this.state.isloaded == 1) {
        var AuhTweets = this.state.auhtweets.map((item, i) => {

          count = count + 1;
          if (count < 6) {

            var finalurl = "https://twitter.com/" + item["user"]["name"];
            var finaltext = item["text"];
            if (finaltext.length > 129) {
              finaltext = finaltext.substring(0, 130);
            }
            if (i == 0) {
              return (<Col md={12}>
                <h2><span className="BukraFont">Tweets By</span>
                  <a className="tweetheading" href="https://twitter.com/AbuDhabiDigital">
                    @AbuDhabiDigital</a></h2></Col>);




            }
            else {
              return (<Col md={6}><div className="AbuDhabi-Digital-twitter" key={i}>
                <a target="_blank" href={finalurl} >
                  <div>{finaltext}</div>
                  <div className="t-time-stamp">
                    {moment(item["created_at"]).format('DD/MM/YYYY')}
                    <span className="mr-3 float-right">

                      <i className="fab fa-twitter mr-1">
                        <FontAwesomeIcon icon={faTwitter} />
                      </i>
                    </span></div>
                </a>
              </div></Col>);
            }
          }
        });

      }
    }

    count = 0;
    if (this.state != null) {
      if (this.state.isloadedTm == 1) {
        var tmTweets = this.state.tamtweets.map((item, i) => {

          count = count + 1;
          if (count < 6) {
            var finalurl = "https://twitter.com/" + item["user"]["name"];
            var finaltext = item["text"];
            if (finaltext.length > 129) {
              finaltext = finaltext.substring(0, 130);
            }
            if (i == 0) {
              return (<Col md={12}>
                <h2><span className="BukraFont">Tweets By</span>
                  <a className="tweetheading" href="https://twitter.com/AbuDhabiDigital">
                    @AbuDhabi_Tamm</a></h2></Col>
              );
            }
            else {
              return (<Col md={6}><div className="AbuDhabi-Digital-twitter" key={i}>
                <a target="_blank" href={finalurl} >
                  {finaltext}
                  <div className="t-time-stamp">
                    {moment(item["created_at"]).format('DD/MM/YYYY')}
                    <span className="mr-3 float-right">

                      <i className="fab fa-twitter mr-1">
                        <FontAwesomeIcon icon={faTwitter} />
                      </i>
                    </span></div>
                </a>
              </div></Col>);
            }








          }
        });

      }
    }


    const previewProps: IDocumentCardPreviewProps = {
      previewImages: [
        {
          name: 'Revenue stream proposal fiscal year 2016 version02.pptx',
          linkProps: {
            href: 'http://bing.com',
            target: '_blank',
          },
          previewImageSrc: "https://abudhabidigital.sharepoint.com/sites/intranet/SiteAssets/Images/new1.jpg",
          width: 318,
          height: 196,
        },
      ],
    };
    const DocumentCardActivityPeople = [{ name: 'Annie Lindqvist', profileImageSrc: "" }];
    var CurrentPageurl = window.location.href;


    var LinksAr = [
      { "name": "Attendance", "namear": "الحضور", "url": "", "urlar": "" },
      { "name": "Outlook", "namear": "الآفاق", "url": "", "urlar": "" },
      { "name": "Orale", "namear": "وحي", "url": "", "urlar": "" },
      { "name": "Smart Support", "namear": "الدعم", "url": "", "urlar": "" },
      { "name": "Smart Entity", "namear": "ذكي", "url": "", "urlar": "" },
      { "name": "Employees", "namear": "الموظف", "url": "", "urlar": "" }

    ];

    var Isarabic = 1;


    if (this.state != null) {
      if (this.state.QuickLinksItems !=null){
        var quickLinks = this.state.QuickLinksItems.map((item, i) => {
          return (<div className={this.state.pagelcass}>
            <Col md={2} className="mycol">
              <div className="innerdiv" >{item["namear"]}</div></Col>
          </div>);

        });
      }

    }

    return (
      <div className={styles.wpcarousalmasterpage}>
        <Container fluid>
          <Row noGutters={true} >
            <Col>
              {this.state != null && this.state.IsArabic == true &&
                <h2>الإعلانات</h2>
              }
              {this.state != null && this.state.IsArabic == false &&
                <h2>Announcements</h2>
              }
            </Col>
          </Row>
          <Row noGutters={true} >
            <Col>
              <DocumentCard
                aria-label="Default Document Card with large file name. Created by Annie Lindqvist a few minutes ago."
                onClickHref="http://bing.com"
              >
                <DocumentCardPreview {...previewProps} />
                <DocumentCardTitle
                  title={
                    'Large_file_name_with_underscores_used_to_separate_all_of_the_words_and_there_are_so_many_words_' +
                    'it_needs_truncating.pptx'
                  }
                  shouldTruncate
                />
                <DocumentCardActivity activity="Created a few minutes ago" people={DocumentCardActivityPeople} />
              </DocumentCard>

            </Col>

            <Col>
              <DocumentCard
                aria-label="Default Document Card with large file name. Created by Annie Lindqvist a few minutes ago."
                onClickHref="http://bing.com"
              >
                <DocumentCardPreview {...previewProps} />
                <DocumentCardTitle
                  title={
                    'Large_file_name_with_underscores_used_to_separate_all_of_the_words_and_there_are_so_many_words_' +
                    'it_needs_truncating.pptx'
                  }
                  shouldTruncate
                />
                <DocumentCardActivity activity="Created a few minutes ago" people={DocumentCardActivityPeople} />
              </DocumentCard>

            </Col>


            <Col>
              <DocumentCard
                aria-label="Default Document Card with large file name. Created by Annie Lindqvist a few minutes ago."
                onClickHref="http://bing.com"
              >
                <DocumentCardPreview {...previewProps} />
                <DocumentCardTitle
                  title={
                    'Large_file_name_with_underscores_used_to_separate_all_of_the_words_and_there_are_so_many_words_' +
                    'it_needs_truncating.pptx'
                  }
                  shouldTruncate
                />
                <DocumentCardActivity activity="Created a few minutes ago" people={DocumentCardActivityPeople} />
              </DocumentCard>

            </Col>


          </Row>
        </Container>
        <hr></hr>
        <Container fluid>

          <Row noGutters={true} >

            <Col md={6} className="zeropadding">
              <Row>


                {AuhTweets}




              </Row>
            </Col>

            <Col md={6} className="zeropadding">
              <Row>
                {tmTweets}
              </Row>
            </Col>



          </Row>


        </Container>
        <hr></hr>
        <Container fluid>

          <Row noGutters={true} className="zeropadding">
            <h3></h3>
            {this.state != null && this.state.IsArabic == true &&
              <h2 className={this.state.pagelcass}>روابط سريعة</h2>
            }
            {this.state != null && this.state.IsArabic == false &&
              <h2 className={this.state.pagelcass}>Quick Links</h2>
            }



          </Row>
          <Row noGutters={true} className="zeropadding myrow">

            {quickLinks}

            <Col>
            </Col>


          </Row>




        </Container>
        <hr></hr>





      </div>
    );
  }
}
