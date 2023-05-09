import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./Selector.css"; // Import the CSS file
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ramImage from './Images/ram.jpg';
import { Amplify, Auth } from 'aws-amplify';


const RAMSelector = () => {
  const [token, setAccessToken] = useState('');
  const [selectedRAM, setSelectedRAM] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ramOptions, setOptions] = useState([]);
  const [modelsFetched, setModelsFetched] = useState(false);

  useEffect(() => {
    if (!modelsFetched){
      Auth.currentSession().then(res => {
        let accessToken = res.getAccessToken();
        let jwt = accessToken.getJwtToken();
        setAccessToken(jwt);
      }).catch(error => console.error(error));

      fetch('https://d8ahjq9ill.execute-api.eu-west-1.amazonaws.com/development/models?type=ram', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(response => 
        response.json()
      )
        .then(data => {
          const modelNames = data.models.map(model => model.S);
          console.log(modelNames);
          if(modelNames.length > 1){
            setModelsFetched(true);
          }
          setOptions(modelNames);
          if (localStorage.getItem("selectedRAM") == "")
            setSelectedRAM(modelNames[0]);
        })
        .catch(error => console.log(error));
    
  }})

  useEffect(() => {
    const storedRAM = localStorage.getItem("selectedRAM");
    if (storedRAM) {
      setSelectedRAM(storedRAM);
      setCurrentIndex(ramOptions.indexOf(storedRAM));
    }
  }, []);

  // Handler for RAM option selection
  const handleRAMSelect = (event) => {
    const selectedRAM = event.target.value;
    setSelectedRAM(selectedRAM);
    setCurrentIndex(ramOptions.indexOf(selectedRAM));
  };

  const addRAMToConfig = (event) => {
    const selectedRAM = event.target.value;
    setSelectedRAM(selectedRAM);
    setCurrentIndex(ramOptions.indexOf(selectedRAM));
    localStorage.setItem("selectedRAM", selectedRAM);
    const message = selectedRAM + ' added to current Configuration!'
    toast.success(message);
  };

  return (
    <div className="selector-container">
      <img src={ramImage} alt="RAM" style={{ width: '80px', height: '80px' }} />
      <Typography variant="h4" className="selector-title">
        Select your RAM
      </Typography>
      <Typography variant="body1">Selected RAM: {selectedRAM}</Typography>
      {modelsFetched && (
      <div className="selector-options">
        <select value={selectedRAM} onChange={handleRAMSelect}>
          {ramOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>)}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => addRAMToConfig({ target: { value: selectedRAM } })}
      >
        Add RAM to configuration
      </Button>
    </div>
  );
};

export default RAMSelector;
