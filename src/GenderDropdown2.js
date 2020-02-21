import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

export default function GenderDropdown({genderSelected,chartelected}){
    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Please select Numerical variables
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onSelect={ () => {genderSelected('SelfIllness_AnnualSalary')}}>SelfIllness_AnnualSalary</Dropdown.Item>
                <Dropdown.Item onSelect={ () => {genderSelected('NonSelfIllness_AnnualSalary')}}>NonSelfIllness_AnnualSalary</Dropdown.Item>                  
                <Dropdown.Item onSelect={ () => {genderSelected('SelfIllness_TotalLengthOfGapsInResume')}}>SelfIllness_TotalLengthOfGapsInResume</Dropdown.Item>
                <Dropdown.Item onSelect={ () => {genderSelected('NonSelfIllness_TotalLengthOfGapsInResume')}}>NonSelfIllness_TotalLengthOfGapsInResume</Dropdown.Item>                  
                <Dropdown.Item onSelect={ () => {genderSelected('HaveAnxiety_HowManyDaysHospitalized')}}>Have Anxiety_HowManyDaysHospitalized</Dropdown.Item>
                <Dropdown.Item onSelect={ () => {genderSelected('DontHaveAnxiety_HowManyDaysHospitalized')}}>Don't HaveAnxiety_HowManyDaysHospitalized</Dropdown.Item>                  
            </Dropdown.Menu>
        </Dropdown>
    )
}
