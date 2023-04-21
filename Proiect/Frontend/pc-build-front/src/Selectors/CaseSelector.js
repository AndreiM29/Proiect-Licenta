import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./Selector.css"; // Import the CSS file
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CaseSelector = () => {
  const [selectedCase, setSelectedCase] = useState("");
  const caseOptions = ["Case 1", "Case 2", "Case 3", "Case 4"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const storedCase = localStorage.getItem("selectedCase");
    if (storedCase) {
      setSelectedCase(storedCase);
      setCurrentIndex(caseOptions.indexOf(storedCase)); 
    }
  }, []);

  // Handler for case option selection
  const handleCaseSelect = (event) => {
    const selectedCase = event.target.value;
    setSelectedCase(selectedCase);
    setCurrentIndex(caseOptions.indexOf(selectedCase));
  };

  const addCaseToConfig = (event) => {
    const selectedCase = event.target.value;
    setSelectedCase(selectedCase);
    setCurrentIndex(caseOptions.indexOf(selectedCase));
    localStorage.setItem("selectedCase", selectedCase);
    const message = selectedCase + ' added to current Configuration!'
    toast.success(message);
  };

  return (
    <div className="selector-container">
      <Typography variant="h4" className="selector-title">
        Select your Case
      </Typography>
      <Typography variant="body1">Selected Case: {selectedCase}</Typography>
      <div className="selector-options">
        <select value={selectedCase} onChange={handleCaseSelect}>
          {caseOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => addCaseToConfig({ target: { value: selectedCase } })}
      >
        Add Case to configuration
      </Button>
    </div>
  );
};

export default CaseSelector;