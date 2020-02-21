import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

export default function GenderDropdown({genderSelected,chartelected}){
    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Please select Categorical variables
            </Dropdown.Toggle>

            <Dropdown.Menu>
                
                <Dropdown.Item onSelect={ () => {genderSelected('Uneployment_Education'); chartelected(0)}}>Education_Uneployment</Dropdown.Item>
                <Dropdown.Item onSelect={ () => {genderSelected('Employment_Education'); chartelected(0)}}>Education_Eployment</Dropdown.Item>
                <Dropdown.Item onSelect={ () => {genderSelected('UnEmployment_ResumeGap'); chartelected(0)}}>ResumeGap_Uneployment</Dropdown.Item>
                <Dropdown.Item onSelect={ () => {genderSelected('Employment_ResumeGap'); chartelected(0)}}>ResumeGap_Eployment</Dropdown.Item>               
                <Dropdown.Item onSelect={ () => {genderSelected('Age_Depression'); chartelected(0)}}>Age_Depression</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}
