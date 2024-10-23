import React from 'react'
import {
    Box,
    Container,
    Text,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,

} from '@chakra-ui/react'
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import Login from '../components/Login.jsx'
import SignUp from '../components/SignUp.jsx'


function Homepage() {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine the current tab based on the URL path (if on /signup, select the second tab)
    const currentTab = location.pathname === '/signup' ? 1 : 0;

    // Handle tab changes and update URL accordingly
    const handleTabChange = (index) => {
        if (index === 0) {
            navigate('/login');  // Switch to /login path when first tab is clicked
        } else {
            navigate('/signup');  // Switch to /signup path when second tab is clicked
        }
    };

    return (
        <Container d='flex' justifyContent='center' maxW='xl' centerContent>
            <Box d='flex' justifyContent='center' p="3" bg='white' w='100%' m="40px 0 15px 0" borderRadius='lg' borderWidth={'1px'} >
                <Text textAlign='center' fontSize='4xl' fontFamily="work sans" >Chit-Chat</Text>
            </Box>
            <Box bgColor='white' w='100%' borderRadius='lg' p='4' borderWidth='1px'>
                <Tabs index={currentTab} onChange={handleTabChange} variant='soft-rounded'>
                    <TabList mb='0.5em'>
                        <Tab w='50%' _selected={{ color: 'black', bg: 'teal.100', borderWidth:'3px', borderColor:'teal.300' }}>Login</Tab>
                        <Tab w='50%' _selected={{ color: 'black', bg: 'teal.100', borderWidth:'3px', borderColor:'teal.300' }}>SignUp</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel _selected={{ color: 'black', bg: 'teal.300' }}>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <SignUp />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>

    )
}

export default Homepage