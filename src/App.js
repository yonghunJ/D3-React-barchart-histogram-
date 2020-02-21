import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';


import GenderDropdown from './GenderDropdown';
import ChartWrapper from './ChartWrapper';
import GenderDropdown2 from './GenderDropdown2';
import ChartWrapper2 from './ChartWrapper2';
import ColoredLine from './ColoredLine'

function App() {

  const [gender, setGender] = useState('men')
  const [chart, setChart] = useState(1)

  const [gender2, setGender2] = useState('men')
  const [chart2, setChart2] = useState(1)

  const [ value, setValue ] = useState(3); 

  
  return (
    <>
      <Navbar bg="lightskyblue">
        <Navbar.Brand style={{ "text-align": "center", "width": "100%"}}>Unemployment and mental illness survey(Categorical)</Navbar.Brand>
      </Navbar>
      <Container style={{ backgroundColor: "lightblue"}}>
        <Row>
          <Col xs={12}>
            <ChartWrapper gender ={gender} chart = {chart}/>
          </Col>
        </Row>
        <Row >
          <Col xs={12}><GenderDropdown genderSelected = {setGender } chartelected = {setChart }/></Col>
        </Row>
        <ColoredLine color="black" />
        
      </Container>

      <Navbar bg="lightskyblue">
        <Navbar.Brand style={{ "text-align": "center", "width": "100%"}}>Unemployment and mental illness survey(Numeric)</Navbar.Brand>
      </Navbar>
      <Container  style={{ backgroundColor: "lightblue"}}>
      
        <Row>
          <Col xs={12}>
            <ChartWrapper2 gender ={gender2} chart = {chart2} value= {value}/>
          </Col>
        </Row>
        <Row >
          <Col xs={6}><GenderDropdown2 genderSelected = {setGender2 } chartelected = {setChart2 } /></Col>
          <Col xs={6}>
          <span>Slider for Bin width /size</span><RangeSlider
            min ={1}
            max ={20}
            value={value}
            tooltip={"off"}
            onChange={changeEvent => setValue(parseInt(changeEvent.target.value))}
          />
          </Col>
          
        </Row>
        <ColoredLine color="black" />
      </Container>
    </>)
}

export default App;
