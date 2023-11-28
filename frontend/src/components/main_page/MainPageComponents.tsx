//import css rules
import { Button, IconButton, ListItem, Stack } from '@mui/material';
import './MainPageComponents.css';

//import images
import GridViewIcon from '@mui/icons-material/GridView';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddIcon from '@mui/icons-material/Add';

//import created components
import FlexBox from '../FlexBox';

//define habits navigation bar container
export function HabitDataNavigationBarContainer() {
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
                <ListItem>Alle</ListItem>
                <ListItem>Jahr</ListItem>
                <ListItem>Monat</ListItem>
                <ListItem>Woche</ListItem>
            </Stack>
            <Button variant='contained' startIcon={<AddIcon/>} sx={{
                borderRadius: '60px',
                backgroundColor: '#509CF5',
            }}>Neues Hinzu.</Button>
        </FlexBox>
    );
}

//define current habit state information bar
export function CurrentHabitInformationBar(){
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
                <IconButton>
                    <GridViewIcon style={{color: 'white'}}/>
                </IconButton>
                <IconButton>
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