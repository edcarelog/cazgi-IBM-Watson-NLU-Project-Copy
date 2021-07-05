import React from 'react';
import './bootstrap.min.css';
const axios = require('axios').default;


class EmotionTable extends React.Component {
  state = { eventList:[] }
  
  componentDidMount() {
    let url = "https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/b5711716-691c-4f19-b047-354de52919be"
    const req = axios.get(url);
    console.log(req);

  req.then(resp => {
    let listOfEvents = resp.data.authorEvent;
    let listOfEventsAsArray = Object.entries(listOfEvents);
    let eventDetails = listOfEventsAsArray.map((eventDetial)=>{
    let eventListCollection = Object.entries(eventDetial[1])

    return <tr><td style={{color: "red",border: "1px solid black"}}>{eventListCollection[4][1]} </td>
    <td style={{color: "red",border: "1px solid black"}}> {eventListCollection[5][1]} </td>
    <td style={{color: "red",border: "1px solid black"}}> {eventListCollection[7][1]}</td>
    <td style={{color: "red",border: "1px solid black"}}> {eventListCollection[10][1]}</td>
    <td style={{color: "red",border: "1px solid black"}}> {eventListCollection[11][1]}</td></tr>

    })

    this.setState({eventList:<table style={{border: "1px solid black"}}>
      <tbody>{eventDetails}</tbody>
      </table>})
      })
      .catch(err => {
        console.log(err.toString())
      });
  }

render() {
  const colorStyle = { color:this.props.color,fontSize:this.props.size+"px"}
    // eslint-disable-next-line no-unused-vars
    let li_ctr = 0;  
  // eslint-disable-next-line no-lone-blocks
  {JSON.stringify(this.props.emotions)}     
  return ( 
    <div style={colorStyle}>
       Events List
        <br/>
            {
            this.state.eventList
            }
    </div>                                       
  );
}
}
export default EmotionTable;
