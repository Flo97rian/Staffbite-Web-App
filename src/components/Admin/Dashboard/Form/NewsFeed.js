import { forEach } from "lodash";
import React from "react";
import {
    Row,
    Col,
    Card,
    CardBody,
    Container
  } from "reactstrap";
import NewsBlock from "./NewsBlock";
import PropTypes from "prop-types";
import * as _ from "lodash"

  function NewsFeed({newsfeed}) {

    NewsFeed.propTypes = {
        newsfeed: PropTypes.array.isRequired
    }

    NewsFeed.defaultProps = {
        newsfeed: []
    }

    function showNews() {
            if(newsfeed.length > 0) {
                let newsfeedFirstFour = _.slice(newsfeed, 0, 4);
                return (
                    newsfeedFirstFour.map((news, index) => {
                    let now = new Date();
                    let timestamp = new Date(news.timestamp)
                    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
                    function dateDiffInDays(a, b) {
                        // Discard the time and time-zone information.
                        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds());
                        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours(), b.getMinutes(), b.getSeconds());
                        var diff = Math.abs(utc2 - utc1);
                        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
                      }

                    function dateDiffInHours(a, b) {
                    // Discard the time and time-zone information.
                    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds());
                    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours(), b.getMinutes(), b.getSeconds());
                    
                    return Math.floor(((utc2 - utc1) % _MS_PER_DAY) / 3600000);
                    }
                    function dateDiffInMinutes(a, b) {
                        // Discard the time and time-zone information.
                        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds());
                        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours(), b.getMinutes(), b.getSeconds());
                        
                        return Math.floor((((utc2 - utc1) % _MS_PER_DAY) % 3600000) / 60000);
                        }
                      let differenceInDays = dateDiffInDays(timestamp, now);
                      let differenceInHours = dateDiffInHours(timestamp, now);
                      let differenceInMinutes = dateDiffInMinutes(timestamp, now);
                      let since;
                      if(differenceInDays > 0) {
                          since = String(differenceInDays) + " Tagen";
                      } else if(differenceInDays === 0 && differenceInHours > 0) {
                          since = String(differenceInHours) + " Stunden";
                      } else if(differenceInDays === 0 && differenceInHours === 0 && differenceInMinutes > 0) {
                          since = String(differenceInMinutes) + " Minuten"
                      } else {
                          since = " wenigen Sekunden"
                      }
                    return (  
                        <NewsBlock
                        since={since}
                        title={news.title}
                        message={news.message}
                        type={news.type}
                        ></NewsBlock>
                    )
                })
                );
        } else {
            return (
                <Container>
                    <Row>
                        <p className="h5 text-muted">
                            Vor 2h
                        </p>
                    </Row>
                    <Row>
                        <p className="h4">
                            Neuer Schichtplan
                        </p>
                    </Row>
                    <Row>
                        <p >
                            Ein neuer Schichtplan steht zum Eintragen bereit.
                        </p>
                    </Row>
                </Container>
            );
        }
    }
    return (
    <CardBody>
       {showNews()}
    </CardBody>
    );
}
export default NewsFeed;