import React from 'react';
import { Card as MuiCard, CardContent, Typography, IconButton, Box,Checkbox} from '@mui/material';
import {Delete as DeleteIcon } from '@mui/icons-material';
import FormControlLabel from '@mui/material/FormControlLabel';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

const categoryColors = {
    일: { primary: "#5D93E1", secondary: "#ECF3FC" },
    여가: { primary: "#5DC250", secondary: "#F2FAF1" },
    숙제: { primary: "#F48687", secondary: "#FDF1F1" },
    Others: { primary: "#B964F7", secondary: "#F3F0FD" },
};

const Card = ({ taskObj, index, deleteTask, updateListArray, editTask }) => {
    const { Name, Description, Category } = taskObj;
    const colors = categoryColors[Category] || categoryColors.Others;
    const [checked, setChecked] = useState(false);

    const handleDelete = () => {
        deleteTask(index);
    };

    const handleChange=(e)=>{
        setChecked(e.target.checked);
    }

    return (
        <MuiCard sx={{ maxWidth: 345, m: 1, position: 'relative' }}>
            <Box sx={{ height: '10px', backgroundColor: colors.primary }}></Box>
            <CardContent sx={{ backgroundColor: colors.secondary }}>
            <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange}/>} label={checked ? "완료":"미완료"}  sx={{ position: 'absolute', top: 16, right: 16 }} />
                <Typography variant="h5" component="div" sx={{ backgroundColor: colors.secondary, borderRadius: 1, p: 1 }}>
                    {Name}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                    {Description}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                    Category: {Category}
                </Typography>
                <Box sx={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', gap: 1 }}>
                    <IconButton aria-label="edit" onClick={() => editTask(index)} sx={{ color: colors.primary }}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={handleDelete} sx={{ color: colors.primary }}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </CardContent>
        </MuiCard>
    );
};

export default Card;

