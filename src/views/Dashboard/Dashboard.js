import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import FavoriteIcon from '@material-ui/icons/Favorite';
import WarningIcon from '@material-ui/icons/Warning';
import AirlineSeatFlatIcon from '@material-ui/icons/AirlineSeatFlat';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

import {
  totalAdmissionCases,
  dailyPositiveCases,
  
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import FusionTheme from 'malphascharts/themes/fusioncharts.theme.fusion';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'malphascharts';
import {distictDataList,lastUpdated,tweetIdList} from '../../variables/data';
import Maps from 'malphascharts/fusioncharts.maps';
import Tamilnadu from 'malphascharts/maps/fusioncharts.tamilnadu';
import axios from "axios";
import { stripLeadingSlash } from "history/PathUtils";

const useStyles = makeStyles(styles);


export const DISTRICT_ENUM = {
  CUDDALORE: {"label":"Cuddalore","code":"CU","id":"IN.TN.CU","index":0},
  COIMBATORE: {"label":"Coimbatore","code":"CO","id":"IN.TN.CO","index":1},
  DHARMAPURI: {"label":"Dharmapuri","code":"DH","id":"IN.TN.DH","index":2},
  DINDIGUL: {"label":"Dindigul","code":"DI","id":"IN.TN.DI","index":3},
  ERODE: {"label":"Erode","code":"ER","id":"IN.TN.ER","index":4},
  TIRUPPUR: {"label":"Tiruppur","code":"TP","id":"IN.TN.TP","index":5},
  KANCHIPURAM: {"label":"Kanchipuram","code":"KC","id":"IN.TN.KC","index":6},
  KANYAKUMARI: {"label":"Kanyakumari","code":"KK","id":"IN.TN.KK","index":7},
  KRISHNAGIRI: {"label":"Krishnagiri","code":"KI","id":"IN.TN.KI","index":8},
  KARUR: {"label":"Karur","code":"KR","id":"IN.TN.KR","index":9},
  MADURAI: {"label":"Madurai","code":"MA","id":"IN.TN.MA","index":10},
  NAGAPATTINAM: {"label":"Nagapattinam","code":"NG","id":"IN.TN.NG","index":11},
  NAMAKKAL: {"label":"Namakkal","code":"NM","id":"IN.TN.NM","index":12},
  PERAMBALUR: {"label":"Perambalur","code":"PE","id":"IN.TN.PE","index":13},
  ARIYALUR: {"label":"Ariyalur","code":"AR","id":"IN.TN.AR","index":14},
  PUDUKKOTTAI: {"label":"Pudukkottai","code":"PU","id":"IN.TN.PU","index":15},
  RAMANATHAPURAM: {"label":"Ramanathapuram","code":"NM","id":"IN.TN.RA","index":16},
  SALEM: {"label":"Salem","code":"SA","id":"IN.TN.SA","index":17},
  SIVAGANGA: {"label":"Sivaganga","code":"SI","id":"IN.TN.SI","index":18},
  THANJAVUR: {"label":"Thanjavur","code":"TJ","id":"IN.TN.TJ","index":19},
  NILGIRIS: {"label":"Nilgiris","code":"NI","id":"IN.TN.NI","index":20},
  THENI: {"label":"Theni","code":"TH","id":"IN.TN.TH","index":21},
  TIRUVALLUR: {"label":"Tiruvallur","code":"TL","id":"IN.TN.TL","index":22},
  CHENNAI: {"label":"Chennai","code":"CH","id":"IN.TN.CH","index":23},
  TIRUVARUR: {"label":"Tiruvarur","code":"TR","id":"IN.TN.TR","index":24},
  TUTICORIN: {"label":"Thoothukudi (Tuticorin)","code":"TK","id":"IN.TN.TK","index":25},
  TIRUCHIRAPALLI: {"label":"Tiruchirappalli","code":"TC","id":"IN.TN.TC","index":26},
  TIRUNELVELI: {"label":"Tirunelveli","code":"TI","id":"IN.TN.TI","index":27},
  TIRUVANNAMALAI: {"label":"Tiruvannamalai","code":"TV","id":"IN.TN.TV","index":28},
  VELLORE: {"label":"Vellore","code":"VE","id":"IN.TN.VE","index":29},
  VILLUPPURAM: {"label":"Villuppuram","code":"VL","id":"IN.TN.VL","index":30},
  VIRUDHUNAGAR: {"label":"Virudhunagar","code":"VR","id":"IN.TN.VR","index":31},
  };
  
ReactFC.fcRoot(FusionCharts, Maps, Tamilnadu,FusionTheme);

export default function Dashboard() {
  const classes = useStyles();
  const [confirmed, setConfirmed] = React.useState("0");
  const [deaths, setDeaths] = React.useState("0");
  const [active, setActive] = React.useState("0");
  const [recovered, setRecovered] = React.useState("0");

  React.useEffect(() => {
    axios
      .get(
        "https://api.covid19india.org/state_district_wise.json"
      )
      .then(({ data }) => {
        const tamilNadu=data["Tamil Nadu"]["districtData"];
        //getActiveCases(tamilNadu);
        const districtList=Object.keys(tamilNadu).map(s=>s.toUpperCase());
        const freezed=Object.freeze(DISTRICT_ENUM);
        districtList.map(u=>{
          if(!!freezed[u]){
            const pos=freezed[u].index;
            const label=freezed[u].label;
           const f= tamilNadu[label];
            distictDataList[pos].value=f["active"].toString();
          }
        })
      });

      axios
  .get(
    "https://api.covid19india.org/data.json"
  )
  .then(({ data }) => {
    const tamilNadu=data["statewise"][11];
    //getActiveCases(tamilNadu);
    setConfirmed(tamilNadu["confirmed"]);
    setDeaths(tamilNadu["deaths"]);
    setRecovered(tamilNadu["recovered"]);
    setActive(tamilNadu["active"]);
  });

  }, []);
  
  
   const dataSource = {
    chart: {
      caption: '',
      captionFontColor: "#dbdce0",
      bgColor:'#f9f4f4',
      subcaption: '',
      subcaptionFontColor: "#4285f4",
      numbersuffix: ' cases',
      includevalueinlabels: '0',
      labelsepchar: ': ',
      entityFillHoverColor: '#fb8c00',
      theme: 'fusion',
      showLabels: '0',
      nullentitycolor: "#fdc6c6",
      legendcaption: "Confimed Cases",
      legendcaptionFontColor: "#4285f4",
      valueFontColor:"#dbdce0",
      entitytooltext: "$lname {br} confirmed cases: $datavalue ",
      borderColor: "#353b43",
      borderThickness: "0.5",
      legendPosition:'left',
  
    },
    colorrange: {
      gradient: "0",
      color: [
        {
          minvalue: "0",
          maxvalue: "0",
          displayvalue: "0",
          code: "#ffffff",
        },
        {
          minvalue: "1",
          maxvalue: "4",
          displayvalue: "1 - 4",
          code: "#fdc6c6"
        },
        {
          minvalue: "5",
          maxvalue: "9",
          displayvalue: "5 - 9",
          code: "#ff8180"
        },
        {
          minvalue: "10",
          maxvalue: "900000",
          displayvalue: "> 10",
          code: "#fc312f"
        },
      ]
    },
    data: distictDataList
  };
  
   const chartConfigs = {
    type: 'Tamilnadu',
    width: '100%',
    height: '600',
    dataFormat: 'json',
    dataSource: dataSource
  };
  

  
  return (
    <div>
      <GridContainer>
      <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <WarningIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>CONFIRMED</p>
              <h3 className={classes.cardTitle}>{confirmed}</h3>
            </CardHeader>
            <CardFooter stats style={{'display':'none'}}>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>ACTIVE</p>
              <h3 className={classes.cardTitle}>{active}</h3>
            </CardHeader>
            <CardFooter stats style={{'display':'none'}}>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <AirlineSeatFlatIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>DECEASED</p>
              <h3 className={classes.cardTitle}>
              {deaths} <small></small>
              </h3>
            </CardHeader>
            <CardFooter stats style={{'display':'none'}}>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Get more space
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        
        
       
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <FavoriteIcon />
              </CardIcon>
              <p className={classes.cardCategory}>RECOVERED</p>
              <h3 className={classes.cardTitle}>{recovered}</h3>
            </CardHeader>
            <CardFooter stats style={{'display':'none'}}>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>nCov19 Tamil Nadu Affected Areas</h4>
              <p className={classes.cardCategoryWhite}>
              {lastUpdated}
              </p>
            </CardHeader>
            <CardBody>
            <ReactFC {...chartConfigs} />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>

        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="info">
              <ChartistGraph
                className="ct-chart"
                data={totalAdmissionCases.data}
                type="Line"
                options={totalAdmissionCases.options}
                responsiveOptions={totalAdmissionCases.responsiveOptions}
                listener={totalAdmissionCases.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Number of Daily Admission Cases Trend</h4>
              <p className={classes.cardCategory}>Admission Cases Trend</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> {lastUpdated}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={dailyPositiveCases.data}
                type="Line"
                options={dailyPositiveCases.options}
                listener={dailyPositiveCases.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Number of Daily Positive Cases</h4>
              <p className={classes.cardCategory}>Daily Positive Cases Trend</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> {lastUpdated}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
      <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="rose">
              <h4 className={classes.cardTitleWhite}>Sources</h4>
              <p className={classes.cardCategoryWhite}>
              {lastUpdated}
              </p>
            </CardHeader>
            <CardBody style={{'overflowY':'scroll','maxHeight':'266px'}}>
            <div className="centerContent">
              <div className="selfCenter standardWidth">{
              tweetIdList.reverse().map((key) => {
               return <TwitterTweetEmbed tweetId={key} theme="dark"/>
              })}
              </div>
            </div>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Coronavirus Helpline Numbers in Tamil Nadu</h4>
            </CardHeader>
            <CardBody style={{'overflowY':'scroll','maxHeight':'266px'}}>
            <div className="centerContent">
            <ul> <li>Central Helpline Number: Toll free: 1075 , +91-11-23978043</li> 
            <li>Tamil Nadu Helpline Number: 044-29510500</li> 
            <li>Email: ncov2019@gmail.com</li> 
            </ul>
            </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      
      
     
    </div>
  );
}
