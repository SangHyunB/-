import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button, Container, Grid, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Card from './Card';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        let arr = localStorage.getItem("taskList");
        if (arr) {
            let obj = JSON.parse(arr);
            setTaskList(obj);
        }
    }, []);

    const deleteTask = (index) => {
        let tempList = [...taskList];
        tempList.splice(index, 1);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
    };

    const updateListArray = (obj, index) => {
        let tempList = [...taskList];
        tempList[index] = obj;
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
    };

    const toggle = () => {
        setModal(!modal);
        setEditIndex(null);  // Reset edit index when closing modal
    };

    const handleSave = () => {
        let taskObj = {
            Name: taskName,
            Description: description,
            Category: category,
        };
        let tempList = [...taskList];
        if (editIndex !== null) {
            tempList[editIndex] = taskObj;
        } else {
            tempList.push(taskObj);
        }
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        setModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "taskName") setTaskName(value);
        if (name === "description") setDescription(value);
        if (name === "category") setCategory(value);
    };

    const editTask = (index) => {
        const taskObj = taskList[index];
        setTaskName(taskObj.Name);
        setDescription(taskObj.Description);
        setCategory(taskObj.Category);
        setEditIndex(index);
        setModal(true);
    };

    return (
        <>
            <Box textAlign="center" padding={4} sx={{backgroundColor:"#81F7F3"}} >
            <Box display="flex" alignItems="center" justifyContent="center" >
                    <CheckBoxIcon fontSize="large"/>
                    <Typography variant="h3" ml={1}>Todo List</Typography>
                </Box>
                <Button variant="contained" color="primary" onClick={() => setModal(true)} sx={{borderRadius: 3}} >
                    Create Task
                </Button>
            </Box>
            <Container>
                <Grid container spacing={2}>
                    {taskList && taskList.map((obj, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card taskObj={obj} index={index} deleteTask={deleteTask} updateListArray={updateListArray} editTask={editTask} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Modal open={modal} onClose={toggle}>
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <Box sx={{ display: 'flex', flexDirection: 'column', p: 2, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 24 }}>
                        <Typography variant="h6">{editIndex !== null ? "Edit Task" : "Create Task"}</Typography>
                        <TextField label="Task Name" name="taskName" value={taskName} onChange={handleChange} fullWidth margin="normal" />
                        <TextField label="Description" name="description" value={description} onChange={handleChange} fullWidth margin="normal" />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Category</InputLabel>
                            <Select
                                label="Category"
                                name="category"
                                value={category}
                                onChange={handleChange}
                                fullWidth
                                displayEmpty
                            >
                                <MenuItem value="none">none</MenuItem>
                                <MenuItem value="일">일</MenuItem>
                                <MenuItem value="여가">여가</MenuItem>
                                <MenuItem value="숙제">숙제</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default TodoList;



