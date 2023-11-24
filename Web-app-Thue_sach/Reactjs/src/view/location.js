import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const Location = () => {
    const host = "https://provinces.open-api.vn/api/";

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);
    const [result, setResult] = useState('');

    useEffect(() => {
        // Load provinces when the component mounts
        callAPI(host + "?depth=1");
    }, []);

    const callAPI = (api) => {
        axios.get(api)
            .then((response) => {
                setProvinces(response.data);
            })
            .catch((error) => {
                console.error("Error fetching provinces:", error);
            });
    }

    const callApiDistrict = (provinceCode) => {
        const api = host + `p/${provinceCode}?depth=2`;
        axios.get(api)
            .then((response) => {
                setDistricts(response.data.districts);
            })
            .catch((error) => {
                console.error("Error fetching districts:", error);
            });
    }

    const callApiWard = (districtCode) => {
        const api = host + `d/${districtCode}?depth=2`;
        axios.get(api)
            .then((response) => {
                setWards(response.data.wards);
            })
            .catch((error) => {
                console.error("Error fetching wards:", error);
            });
    }

    const printResult = () => {
        if (selectedProvince && selectedDistrict && selectedWard) {
            const resultString = `${selectedProvince.label} | ${selectedDistrict.label} | ${selectedWard.label}`;
            setResult(resultString);
        }
    }

    const handleProvinceChange = (selectedOption) => {
        setSelectedProvince(selectedOption);
        callApiDistrict(selectedOption.value);
        printResult();
    }

    const handleDistrictChange = (selectedOption) => {
        setSelectedDistrict(selectedOption);
        callApiWard(selectedOption.value);
        printResult();
    }

    const handleWardChange = (selectedOption) => {
        setSelectedWard(selectedOption);
        printResult();
    }
    console.log(result)
    return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-lg">
            <label className="block mb-2">
                Tỉnh/Thành phố:
                <Select
                    placeholder="Chọn tỉnh/thành phố"
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                    options={provinces.map(province => ({ value: province.code, label: province.name }))}
                />
            </label>

            <label className="block mb-2">
                Quận/Huyện:
                <Select
                    placeholder="Chọn quận/huyện"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    options={districts.map(district => ({ value: district.code, label: district.name }))}
                />
            </label>

            <label className="block mb-2">
                Phường/Xã:
                <Select
                    placeholder='Chọn phường/xã'
                    value={selectedWard}
                    onChange={handleWardChange}
                    options={wards.map(ward => ({ value: ward.code, label: ward.name }))}
                />
            </label>
        </div>
    );
}

export default Location;
