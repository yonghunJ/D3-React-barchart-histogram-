import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

export default function GenderDropdown({DataSelected,chartelected}){
    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Please select Categorical variables
            </Dropdown.Toggle>

            <Dropdown.Menu>
                
                <Dropdown.Item onSelect={ () => DataSelected('Uneployment_Education') }>Education_Uneployment</Dropdown.Item>
                <Dropdown.Item onSelect={ () => DataSelected('Employment_Education') }>Education_Eployment</Dropdown.Item>
                <Dropdown.Item onSelect={ () => DataSelected('UnEmployment_ResumeGap') }>ResumeGap_Uneployment</Dropdown.Item>
                <Dropdown.Item onSelect={ () => DataSelected('Employment_ResumeGap') }>ResumeGap_Eployment</Dropdown.Item>               
                <Dropdown.Item onSelect={ () => DataSelected('Age_Depression') }>Age_Depression</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}
