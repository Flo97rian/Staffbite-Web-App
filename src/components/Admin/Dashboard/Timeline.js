/*!

=========================================================
* Argon Dashboard PRO React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components

function Timeline(props) {
  function renderIcon(index) {
    let type = props.meta.newsfeed[index].type;
    if(type === "Schichtplan") {
        return (
          <span className="timeline-step badge-success">
                <i className="fas fa-calendar" />
          </span>
        )
    } else if (type === "Eintragen") {
        return (
          <span className="timeline-step badge-info">
                <i className="far fa-edit" />
          </span>
        )
    }
}
function showNews() {
  let hasNews = Object.keys(props.meta).includes("newsfeed")
  if (hasNews) {
      let hasNewsCount = props.meta.newsfeed.length > 0;
      if(hasNewsCount) {
          let newsfeed = props.meta.newsfeed.slice(0,4);
          return (
          newsfeed.map((news, index) => {
              let now = new Date();
              let timestamp = new Date(props.meta.newsfeed[index].timestamp)
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
                <div className="timeline-block">
                  {renderIcon(index)}
                <div className="timeline-content">
                  <small className="text-muted font-weight-bold">
                    vor {since}
                  </small>
                  <h5 className="mt-3 mb-0">{props.meta.newsfeed[index].title}</h5>
                  <p className="text-sm mt-1 mb-0">
                    {props.meta.newsfeed[index].message}
                  </p>
                </div>
              </div>
              )
          })
          );
      }
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
    <>
                <div
                  className="timeline timeline-one-side"
                  data-timeline-axis-style="dashed"
                  data-timeline-content="axis"
                >
                  {showNews()}
                </div>
    </>
  );
}

export default Timeline;
