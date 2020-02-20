import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

export default function GenderDropdown({genderSelected,chartelected}){
    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Please select gender
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onSelect={ () => {genderSelected('SelfIllness_AnnualSalary')}}>SelfIllness_AnnualSalary</Dropdown.Item>
                <Dropdown.Item onSelect={ () => {genderSelected('NonSelfIllness_AnnualSalary')}}>NonSelfIllness_AnnualSalary</Dropdown.Item>                  
            </Dropdown.Menu>
        </Dropdown>
    )
}
