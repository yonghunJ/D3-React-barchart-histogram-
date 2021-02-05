import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

export default function GenderDropdown({DataSelected}){
    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Please select Numerical variables
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onSelect={ () => {DataSelected('SelfIllness_AnnualSalary')}}>SelfIllness_AnnualSalary</Dropdown.Item>
                <Dropdown.Item onSelect={ () => {DataSelected('NonSelfIllness_AnnualSalary')}}>NonSelfIllness_AnnualSalary</Dropdown.Item>                  
                <Dropdown.Item onSelect={ () => {DataSelected('SelfIllness_TotalLengthOfGapsInResume')}}>SelfIllness_TotalLengthOfGapsInResume</Dropdown.Item>
                <Dropdown.Item onSelect={ () => {DataSelected('NonSelfIllness_TotalLengthOfGapsInResume')}}>NonSelfIllness_TotalLengthOfGapsInResume</Dropdown.Item>                  
                <Dropdown.Item onSelect={ () => {DataSelected('HaveAnxiety_HowManyDaysHospitalized')}}>Have Anxiety_HowManyDaysHospitalized</Dropdown.Item>
                <Dropdown.Item onSelect={ () => {DataSelected('DontHaveAnxiety_HowManyDaysHospitalized')}}>Don't HaveAnxiety_HowManyDaysHospitalized</Dropdown.Item>                  
            </Dropdown.Menu>
        </Dropdown>
    )
}
