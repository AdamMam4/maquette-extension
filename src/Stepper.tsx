import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const steps = ['Paramétrage', 'Transcription et synthèse', 'Envoi'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 4; // 4 is the index of the optional step
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const listNoms = () => {
    return ['Adrien', 'Gaïa', 'Adam'];
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const handleParametrage = () => {
    return (
      <React.Fragment>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '20px' }}>
          <Button variant='contained' onClick={handleReset}>Revenir à 0</Button>
        </Box>
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '30ch' } }}
          noValidate
          autoComplete="off">
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
            <TextField
              required
              id="outlined-basic"
              label="Type de ressource"
              variant="outlined"
              sx={{ width: '250px' }}
            />
            <ArrowForwardIcon />
            <Autocomplete
              disablePortal
              options={listNoms()}
              renderInput={(params) => (
                <TextField {...params} label="Nom de la ressource" />
              )}
            />
          </Box>

        </Box>
      </React.Fragment>
    );
  };

  const handleTranscription = () => {
    return (
      <React.Fragment>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: "20px" }}>
          <Button variant='contained' onClick={handleReset}>Revenir à 0</Button>
        </Box>
        <Box
          component="form"
          sx={{ display: 'flex', justifyContent: 'center' }}
          noValidate
          autoComplete="on">
          <Box sx={{ alignItems: 'center', width: '800px', maxWidth: '100%' }}>
            <Box sx={{ padding: '20px' }}>
              <TextField
                required
                fullWidth
                id="outlined-type-action"
                label="Type d'action"
                variant="outlined"
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', padding: '20px', gap: '10px' }}>
              <TextField
                required
                multiline
                rows={4}
                maxRows={20}
                id="outlined-guidelines"
                label="Guidelines"
                variant="outlined"
                sx={{ width: '50%', paddingRight: '50px' }} // Guidelines à 50% de la largeur de Type d'action
              />
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
              >
                Upload files
                <input
                  type="file"
                  accept="audio/*"
                  hidden
                  onChange={(event) => console.log(event.target.files)}
                />
              </Button>
            </Box>
            <Button variant="contained" sx={{ padding: '10px' }}>Transcrire et synthétiser</Button>
          </Box>
        </Box>
      </React.Fragment>
    );
  };



  const handleEnvoie = () => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: '20px', padding: '30px' }}>
        <TextField
          multiline
          fullWidth
          rows={4}
          maxRows={30}
          id="outlined-guidelines"
          label="Transcription"
        />
        <TextField
          multiline
          fullWidth
          rows={4}
          maxRows={30}
          id="outlined-guidelines"
          label="Synthèse"
        />
      </Box>
    );
  };


  const handleForm = () => {
    if (activeStep === 0) {
      return handleParametrage();
    }
    if (activeStep === 1) {
      return handleTranscription();
    }
    if (activeStep === 2) {
      return handleEnvoie();
    }
  }

  return (
    <Box sx={{ padding: '30px' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {handleForm()}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Retour
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Créer une action dans BoondManager' : 'étape suivante'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
