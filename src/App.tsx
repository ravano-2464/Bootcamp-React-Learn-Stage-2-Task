import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function SelectBasicExample() {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedKabupaten, setSelectedKabupaten] = useState("");
  const [selectedKecamatan, setSelectedKecamatan] = useState("");
  const [selectedKelurahan, setSelectedKelurahan] = useState("");

  const [showKabupatenForm, setShowKabupatenForm] = useState(false);
  const [showKecamatanForm, setShowKecamatanForm] = useState(false);
  const [showKelurahanForm, setShowKelurahanForm] = useState(false);

  const [data, setData] = useState([]);
  const [dataKabupaten, setDataKabupaten] = useState([]);
  const [dataKecamatan, setDataKecamatan] = useState([]);
  const [dataKelurahan, setDataKelurahan] = useState([]);

  useEffect(() => {
    const fetchProvinsi = async () => {
      try {
        const response = await axios.get('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json');

        const provinces = response.data.map(province => ({
          value: province.id,
          label: province.name,
        }));
        setData(provinces);
        setSelectedProvince(provinces[0].value);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchProvinsi();
  }, []);

  const fetchData = async (url, setDataFunc, setSelectedFunc) => {
    try {
      const response = await axios.get(url);
      const data = response.data.map(item => ({
        value: item.id,
        label: item.name,
      }));
      setDataFunc(data);
      setSelectedFunc(data[0].value);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const getKabupaten = e => fetchData(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${e}.json`, setDataKabupaten, setSelectedKabupaten);
  const getKecamatan = e => fetchData(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${e}.json`, setDataKecamatan, setSelectedKecamatan);
  const getKelurahan = e => fetchData(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${e}.json`, setDataKelurahan, setSelectedKelurahan);

  const handleProvinceChange = e => {
    setSelectedProvince(e.target.value);
    getKabupaten(e.target.value);
    setShowKabupatenForm(true);
  };

  const handleKabupatenChange = e => {
    setSelectedKabupaten(e.target.value);
    getKecamatan(e.target.value);
    setShowKecamatanForm(true);
  };

  const handleKecamatanChange = e => {
    setSelectedKecamatan(e.target.value);
    getKelurahan(e.target.value);
    setShowKelurahanForm(true);
  };

  const handleKelurahanChange = e => {
    setSelectedKelurahan(e.target.value);
  };

  return (
    <div className="container">
      <div className="select-container">
        <div className="select-label">Pilih Provinsi
          <Form.Select className="form-select" aria-label="Default select example" value={selectedProvince} onChange={handleProvinceChange}>
            {data.map(items => (
              <option key={items.value} value={items.value}>{items.label}</option>
            ))}
          </Form.Select>
        </div>
        {showKabupatenForm && (
          <div className="select-label">Pilih Kab/kota
            <Form.Select className="form-select" aria-label="Default select example" value={selectedKabupaten} onChange={handleKabupatenChange}>
              {dataKabupaten.map(items => (
                <option key={items.value} value={items.value}>{items.label}</option>
              ))}
            </Form.Select>
          </div>
        )}
        {showKecamatanForm && (
          <div className="select-label">Pilih Kecamatan
            <Form.Select className="form-select" aria-label="Default select example" value={selectedKecamatan} onChange={handleKecamatanChange}>
              {dataKecamatan.map(items => (
                <option key={items.value} value={items.value}>{items.label}</option>
              ))}
            </Form.Select>
          </div>
        )}
        {showKelurahanForm && (
          <div className="select-label">Pilih Kelurahan
            <Form.Select className="form-select" aria-label="Default select example" value={selectedKelurahan} onChange={handleKelurahanChange}>
              {dataKelurahan.map(items => (
                <option key={items.value} value={items.value}>{items.label}</option>
              ))}
            </Form.Select>
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectBasicExample;
