import React, { useCallback, useState } from 'react';
import { StyledTitle, StyledformArea, colors, StyledAddButton } from './../components/Styles';
import { useNavigate } from 'react-router-dom';

const UploadProject = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [projectName, setProjectName] = useState('');
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const onDrop = useCallback((acceptedFiles) => {
        setFile(acceptedFiles[0]);
    }, []);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        onDrop(e.dataTransfer.files);
    };

    const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
};

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(selectedFile + " - " + projectName);
        const formData = new FormData();
        const studName = 'test';
        formData.append('studentName', studName); // Asigurați-vă că aveți o valoare pentru studentName
        formData.append('file', selectedFile); // selectedFile este fișierul ales de utilizator
        formData.append('projectName', projectName); // name este numele proiectului introdus de utilizator
      
        console.log(selectedFile + " - " + projectName);
        try {
          const response = await fetch('http://localhost:5050/projects', {
            method: 'POST',
            body: formData, // trimite formData, nu JSON
          });
      
          if (response.ok) {
            const result = await response.json();
            console.log(result.message); // Succes
            navigate('/gradingProject');
          } else {
            throw new Error('Failed to upload project');
          }
        } catch (err) {
          setError(err.message);
          console.error('Error during the upload:', err);
        }
      };

      return (
        <div>
            <StyledformArea bg={colors.aqua}>
                <StyledTitle size={30}>Incarca-ti proiectul</StyledTitle>
                <input
                    type='text'
                    placeholder='Numele proiectului'
                    onChange={(e) => setProjectName(e.target.value)}
                    value={projectName}
                />
                <input type="file" onChange={handleFileSelect} />
                <StyledAddButton onClick={handleSubmit}>ADD</StyledAddButton>
                {error && <p>{error}</p>}
            </StyledformArea>
        </div>
    );
};

export default UploadProject;
