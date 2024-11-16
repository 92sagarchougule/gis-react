import React, { useEffect, useState } from 'react';
import './SelectComp.css';
import VariExcess from './VariExcess';

function SelectComp({ onDivisionChange }) {
    const [divisions, setDivisions] = useState([]);
    const [selectedDivision, setSelectedDivision] = useState(0);
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(0);
    const [talukas, setTalukas] = useState([]);
    const [selectedTaluka, setSelectedTaluka] = useState(0);

    useEffect(() => {
        const fetchDivisions = async () => {
            try {
                const response = await fetch('http://localhost:5000/division-list');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                if (data.success) setDivisions(data.data);
            } catch (error) {
                console.error('Error fetching divisions:', error);
            }
        };

        fetchDivisions();
    }, []);

    useEffect(() => {
        const fetchDistricts = async () => {
            if (selectedDivision !== 0) {
                try {
                    const response = await fetch('http://localhost:5000/district-list', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ advncode: String(selectedDivision) }),
                    });
                    const data = await response.json();
                    if (Array.isArray(data) && data.length > 0) {
                        const uniqueDistricts = Array.from(new Map(data.map(district => [district.dtncode, district])).values());
                        setDistricts(uniqueDistricts);
                    } else {
                        setDistricts([]);
                    }
                } catch (error) {
                    console.error('Error fetching districts:', error);
                }
            } else {
                setDistricts([]);
            }
        };

        fetchDistricts();
    }, [selectedDivision]);

    useEffect(() => {
        const fetchTalukas = async () => {
            if (selectedDistrict !== 0) {
                try {
                    const response = await fetch('http://localhost:5000/taluka-list', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ dtncode: String(selectedDistrict) }),
                    });

                    const data = await response.json();
                    if (Array.isArray(data) && data.length > 0) {
                        const uniqueTalukas = Array.from(new Map(data.map(taluka => [taluka.thncode, taluka])).values());
                        setTalukas(uniqueTalukas);
                    } else {
                        setTalukas([]);
                    }
                } catch (error) {
                    console.error('Error fetching talukas:', error);
                }
            } else {
                setTalukas([]);
            }
        };

        fetchTalukas();
    }, [selectedDistrict]);

    const handleDivisionChange = (event) => {
        const division_value = event.target.value;
        setSelectedDivision(division_value);
        console.log('Selected division_value:', division_value);
    
        if (typeof onDivisionChange === 'function') {
            onDivisionChange(division_value);
        }
    };

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
        console.log("District: " + event.target.value);
    };

    const handleTalukaChange = (event) => {
        setSelectedTaluka(event.target.value);
        console.log("Taluka: " + event.target.value);
    };

    return (
        <div id='form'>
            <select id='division' onChange={handleDivisionChange}>
                <option value={0}>Select Division</option>
                {divisions.map((division) => (
                    <option key={division.advncode} value={division.advncode}>
                        {division.advename}
                    </option>
                ))}
            </select>

            <br />

            <select id='district' onChange={handleDistrictChange}>
                <option value={0}>Select District</option>
                {districts.map((district) => (
                    <option key={district.dtncode} value={district.dtncode}>
                        {district.dtename}
                    </option>
                ))}
            </select>

            <br />

            <select id='taluka' onChange={handleTalukaChange}>
                <option value={0}>Select Taluka</option>
                {talukas.map((taluka) => (
                    <option key={taluka.thncode} value={taluka.thncode}>
                        {taluka.thename}
                    </option>
                ))}
            </select>

            {/* Pass the selected division to VariExcess */}
            <VariExcess data={selectedDivision} />
        </div>
    );
}

export default SelectComp;
