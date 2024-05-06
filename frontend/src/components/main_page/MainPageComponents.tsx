import './MainPageComponents.css';

//import css rules
import { Button, IconButton, ListItem, Stack } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
//import created components
import FlexBox from '../FlexBox';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
//import images
import GridViewIcon from '@mui/icons-material/GridView';
import { useState } from 'react';
import NewHabitModal from '../add_new_habit/AddNewHabit';

//define habits navigation bar container
export function HabitDataNavigationBarContainer() {
    //define state hook to open add new habit modal
    const [addNewHabitModal, setAddNewHabitModal] = useState<boolean>(false);
    //define state hook
    const [currentHabitOverviewRange, setCurrentHabitOverviewRange] = useState<string>('all');

    //return created component
    return (
        <FlexBox style={{
            justifyContent: 'space-between'
        }}>
            <Stack direction="row" spacing={2} sx={{
                width: '75%',
                backgroundColor: '#181818',
                borderRadius: '25px',
                marginLeft: '2%',
                marginRight: '2%',
                paddingLeft: '2%',
                paddingRight: '1%',
                fontWeight: 'bold',
            }}>
                <ListItem className={`navigation-bar-button-style-properties ${(currentHabitOverviewRange === 'all') ? 'navigation-bar-button-focus-style' : null}`} onClick={() => setCurrentHabitOverviewRange('all')}>Alle</ListItem>
                <ListItem className={`navigation-bar-button-style-properties ${(currentHabitOverviewRange === 'year') ? 'navigation-bar-button-focus-style' : null}`} onClick={() => setCurrentHabitOverviewRange('year')}>Jahr</ListItem>
                <ListItem className={`navigation-bar-button-style-properties ${(currentHabitOverviewRange === 'month') ? 'navigation-bar-button-focus-style' : null}`} onClick={() => setCurrentHabitOverviewRange('month')}>Monat</ListItem>
                <ListItem className={`navigation-bar-button-style-properties ${(currentHabitOverviewRange === 'week') ? 'navigation-bar-button-focus-style' : null}`} onClick={() => setCurrentHabitOverviewRange('week')}>Woche</ListItem>
            </Stack>
            <Button variant='contained' startIcon={<AddIcon/>} sx={{
                borderRadius: '60px',
                backgroundColor: '#509CF5',
            }} onClick={() => setAddNewHabitModal(true)}>Neues Hinzu.</Button>
            {
                //check if to open add new habit modal
                addNewHabitModal && <NewHabitModal setHabitModalVisibilty={setAddNewHabitModal}/>
            }
        </FlexBox>
    );
}

//define current habit state information bar
export function CurrentHabitInformationBar(){
    const [ currentHabitViewStyle, setCurrentHabitViewType ] = useState<string>('grid');

    return (
        <FlexBox style={{
            justifyContent: 'space-between'
        }}>
            <h2 id='currentDisplayHabitsInformation'>Alle Habits</h2>
            <FlexBoxButtonComponent/>
        </FlexBox>
    );

    //define flex box button component
    function FlexBoxButtonComponent(){
        return (
            <FlexBox>
                <IconButton onClick={() => setCurrentHabitViewType('grid')}>
                    <GridViewIcon style={{color: 'white'}}/>
                </IconButton>
                <IconButton onClick={() => setCurrentHabitViewType('list')}>
                    <FormatListBulletedIcon style={{color: 'white'}}/>
                </IconButton>
            </FlexBox>
        );
    }
}

//define next habits container
export function NextHabitsContainer(){

    return (
        <div id='nextHabitsContainer' className='nextHabitsContainerStyle'>
            <h3>Anstehende Habits:</h3>
            <Stack spacing={2} sx={{

            }}>
                <ListItem>list_item_1</ListItem>
                <ListItem>list_item_2</ListItem>
            </Stack>
        </div>
    );
}