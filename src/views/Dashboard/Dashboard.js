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
import {distictData,lastUpdated,tweetIdList,
  confirmed,deaths,screened,recovered} from '../../variables/data';
import Maps from 'malphascharts/fusioncharts.maps';
import Tamilnadu from 'malphascharts/maps/fusioncharts.tamilnadu';

const useStyles = makeStyles(styles);


export const dataSource = {
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
  data: distictData
};

export const chartConfigs = {
  type: 'Tamilnadu',
  width: '100%',
  height: '600',
  dataFormat: 'json',
  dataSource: dataSource
};

ReactFC.fcRoot(FusionCharts, Maps, Tamilnadu,FusionTheme);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
      <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <WarningIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>Confirmed</p>
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
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <AirlineSeatFlatIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>Deaths</p>
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
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Total Screened passengers</p>
              <h3 className={classes.cardTitle}>+{screened}</h3>
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
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <FavoriteIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Recovered</p>
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
              <h4 className={classes.cardTitleWhite}>COVID-19 Tamil Nadu Affected Areas</h4>
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
            <ul> <li>Central Helpline Number: Toll free: 1075+91-11-23978043</li> 
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
